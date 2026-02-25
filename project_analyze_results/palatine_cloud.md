# Palatine Cloud — облачная платформа AI-сервисов обработки речи с биллингом, API Gateway и мониторингом

**Локальный путь:** `/mnt/c/Users/Andrew/PycharmProjects/WORKING_PROJECTS/Palatine/Cloud/`

**Подпроекты:**
| Микросервис | Путь |
|---|---|
| cloud-transcribation-and-diarization-api | `Palatine/Cloud/cloud-transcribation-and-diarization-api/` |
| payment-processing-gateway | `Palatine/Cloud/payment-processing-gateway/` |
| super-star-gate (API Gateway) | `Palatine/Cloud/super-star-gate/` |
| ui-backend | `Palatine/Cloud/ui-backend/` |
| Billing_UI | `Palatine/Cloud/Billing_UI/` |
| supabase_deploy | `Palatine/Cloud/supabase_deploy/` |
| monitoring-stack | `Palatine/Cloud/monitoring-stack/` |
| docker-fish-audio-tts-server | `Palatine/Cloud/docker-fish-audio-tts-server/` |
| fish-speech | `Palatine/Cloud/fish-speech/` |
| docs | `Palatine/Cloud/docs/` |

## Обзор проекта

Palatine Cloud — это production-ready облачная платформа, предоставляющая API-сервисы для обработки речи и текста на базе ML-моделей. Платформа включает полный цикл: от распознавания речи (ASR) и диаризации спикеров до анализа тональности, LLM-суммаризации и синтеза речи (TTS). Все сервисы объединены единым API Gateway с аутентификацией, биллингом, мониторингом и развёрнуты в микросервисной архитектуре на выделенных серверах с GPU.

Домен: `api.palatine.ru` / `speech.palatine.ru`

---

## Стек технологий

### Backend
- **Python 3.10–3.11** — основной язык для всех микросервисов
- **FastAPI** — фреймворк для REST API (все сервисы)
- **Uvicorn** — ASGI-сервер с multi-worker конфигурацией
- **Pydantic / Pydantic Settings** — валидация данных, конфигурация через переменные окружения
- **httpx** — асинхронные HTTP-клиенты для межсервисного взаимодействия
- **WebSocket** — real-time стриминговая транскрипция

### ML / AI
- **NVIDIA Triton Inference Server** — serving ML-моделей с gRPC API, sequence batching, stateful inference
- **Ray Serve** — оркестрация ML-моделей (транскрипция, диаризация, анализ тональности)
- **NVIDIA CUDA 12.6** — GPU-ускорение для inference
- **Fish Speech** — нейросетевой синтез речи (TTS) с поддержкой клонирования голоса
- **Ollama** — serving LLM-моделей с OpenAI-совместимым API
- **CTC Decoder** — декодирование акустических моделей (Conformer)
- **NumPy** — обработка аудио-сигналов, тензорные операции

### Базы данных и хранилище
- **PostgreSQL 15** — основная реляционная БД (Supabase, биллинг)
- **Supabase** — self-hosted: Auth (GoTrue), Realtime, Storage, Edge Functions, PostgREST, Kong API Gateway, Supavisor (connection pooler), Analytics (Logflare)
- **Redis** — rate limiting, кэширование
- **Alembic** — миграции БД для биллинг-сервиса

### Инфраструктура и DevOps
- **Docker / Docker Compose** — контейнеризация всех сервисов
- **GitLab CI/CD** — автоматизированные пайплайны (lint, test, deploy) для dev/staging/prod
- **Traefik** — reverse proxy с TLS (Let's Encrypt), HSTS, XSS-защита
- **Grafana** — дашборды и визуализация метрик
- **Prometheus** — сбор и хранение метрик (Node Exporter, Ray metrics)
- **Loki** — централизованное хранилище логов
- **Grafana Alloy** — агент сбора Docker-логов
- **flake8 / black** — линтинг и форматирование кода

### Интеграции
- **YooKassa** — платёжный шлюз (приём платежей, webhook-обработка, 54-ФЗ)
- **Supabase Auth (GoTrue)** — аутентификация пользователей (JWT)
- **OpenAI-совместимый API** — совместимость с OpenAI SDK для транскрипции и chat completions
- **Mintlify** — документация API с OpenAPI-спецификациями

### Пакетные менеджеры
- **uv** — современный Python-менеджер зависимостей (pyproject.toml + uv.lock)

---

## Архитектура и микросервисы

### 1. Super Star Gate (API Gateway)
**Путь:** `super-star-gate/`
**Стек:** FastAPI, httpx, PyYAML, Supabase SDK, Traefik

Центральный API Gateway платформы — единая точка входа для всех клиентских запросов. Основные особенности:
- **Декларативная маршрутизация** — все маршруты описаны в `routes.yaml`, загружаются динамически при старте. Поддержка proxy, path-параметров, composition (цепочка запросов)
- **Многоуровневая аутентификация** — 4 типа: `token` (API-токен через Supabase), `user` (JWT пользователя), `dev_token`, `dev_user` — для prod и dev окружений
- **Reverse proxy** — проксирование запросов ко всем внутренним сервисам с фильтрацией заголовков, таймаутами и обработкой ошибок
- **Request composition** — возможность создания составных запросов из нескольких шагов с подстановкой результатов через плейсхолдеры `{{step_name.key}}`
- **Traefik интеграция** — TLS-терминация, HSTS, XSS-фильтрация, перенаправление HTTP→HTTPS
- **Multi-worker** — `cpu_count() * 2 + 1` Uvicorn workers
- **CI/CD** — GitLab CI: cleanup → deploy → Traefik config copy

### 2. Cloud Transcription and Diarization API
**Путь:** `cloud-transcribation-and-diarization-api/`
**Стек:** FastAPI, Ray Serve, Triton gRPC, httpx, NumPy, tritonclient, WebSocket

Основной ML-сервис платформы с богатым набором эндпоинтов:

- **Транскрипция (Speech-to-Text)** — polling API и OpenAI-совместимый синхронный API. Модели: `palatine_small`, `palatine_large_highspeed`. Поддержка множества форматов: SRT, VTT, TXT, CSV, XLSX
- **Стриминговая транскрипция** — real-time ASR через WebSocket + Triton gRPC. Conformer модель для русского языка (`palatine_stream`). Поддержка 15+ аудиокодеков (linear16, opus, flac, mp3, aac, alaw, mulaw, amr-nb/wb, speex, g729 и др.), sample rates 8–48 kHz
- **Диаризация спикеров** — разделение аудио на сегменты по спикерам с временными метками, слияние смежных сегментов
- **Анализ тональности** — определение эмоциональной окраски речи (sentiment analysis)
- **AI-суммаризация** — LLM-суммаризация через Ollama с библиотекой промптов, поддержка thinking mode
- **Chat Completions** — OpenAI-совместимый эндпоинт для LLM (chat/completions, models)
- **Биллинг-интеграция** — автоматическое списание средств по тарифам (transcription_per_minute, input/output_llm_per_unit)
- **Архитектура** — двухуровневая: Backend (FastAPI — оркестрация, аутентификация, биллинг) + ML-API (Ray Serve — GPU inference). Triton Inference Server для стриминговых моделей с sequence batching и stateful inference

**CI/CD:** GitLab CI с 4 стадиями — cleanup → deploy → unit/integration tests (с coverage) → E2E tests. Покрытие кода, JUnit-отчёты, артефакты

### 3. Payment Processing Gateway (Биллинг)
**Путь:** `payment-processing-gateway/`
**Стек:** FastAPI, SQLAlchemy, Alembic, YooKassa SDK, Pydantic, PostgreSQL

Production-grade платёжный шлюз с **Clean Architecture**:

- **Clean Architecture** — разделение на слои: `core/entities`, `core/protocols` (интерфейсы), `core/use_cases` (бизнес-логика), `core/factories`, `infrastructure/` (реализации), `api/` (endpoints)
- **Мультимерчант-поддержка** — маршрутизация платежей по нескольким аккаунтам провайдера с учётом тарифа пользователя, валюты и правил роутинга
- **YooKassa интеграция** — создание платежей, webhook-обработка с верификацией IP-адресов и подписей, формирование чеков по 54-ФЗ
- **Промокоды** — валидация, применение бонусов (percentage_on_deposit), ограничения по использованию
- **Тарифы и балансы** — управление тарифами, реальными и бонусными балансами, транзакциями
- **Идемпотентность** — защита от повторной обработки webhook-событий
- **Secret Store** — абстракция для хранения секретов (Environment, GitLab CI Variables)
- **Webhook notifications** — уведомления внешних систем о событиях
- **CI/CD:** GitLab CI с lint (flake8 + black), тестами на отдельной PostgreSQL, manual deploy на dev/prod

### 4. UI Backend
**Путь:** `ui-backend/`
**Стек:** FastAPI, Supabase SDK, Redis, SlowAPI, pytest

Backend для веб-интерфейса личного кабинета Palatine Speech:

- **Управление задачами** — CRUD для карточек и задач пользователя с позиционированием (drag-n-drop)
- **Лицензионные соглашения** — принятие пользовательских соглашений с фиксацией IP
- **Утилиты паролей** — валидация (проверка по базе 10M утёкших паролей), генерация безопасных паролей
- **Управление API-токенами** — CRUD для пользовательских API-токенов
- **Rate Limiting** — Redis-backed ограничение запросов через SlowAPI
- **Тестирование** — 37+ тестов с моком Supabase (FakeSupabaseClient), conftest fixtures
- **CI/CD:** GitLab CI — cleanup → test (pytest) → deploy, отдельные окружения dev (8282) и prod (8181)

### 5. Billing UI (Административная панель)
**Путь:** `Billing_UI/`
**Стек:** FastAPI, Jinja2, httpx, HTML/CSS

Административный веб-интерфейс для управления биллингом:

- **Управление тарифами** — просмотр, создание тарифов с JSON pricing_rules
- **Управление промокодами** — создание с типами, лимитами, датами действия
- **Brandbook** — полная дизайн-система (палитра GreenSpace, типографика Manrope/Inter/JetBrains Mono, 8pt grid, WCAG AA, дизайн-токены)
- **SSR-рендеринг** — серверные HTML-шаблоны через Jinja2

### 6. Docker Fish Audio TTS Server
**Путь:** `docker-fish-audio-tts-server/`
**Стек:** FastAPI, Fish Speech, CUDA 12.6, Docker (nvidia runtime)

Контейнеризированный сервис синтеза речи:

- **OpenAI-совместимый API** — эндпоинт `/audio/speech` (JSON и multipart/form-data)
- **Клонирование голоса** — поддержка reference audio (WAV) для voice cloning
- **Параметризация** — top_p, temperature, repetition_penalty, chunk_length, max_new_tokens, seed
- **GPU inference** — NVIDIA CUDA 12.6, multi-model support
- **CI/CD:** GitLab CI для автосборки Docker-образа

### 7. Fish Speech (форк)
**Путь:** `fish-speech/`
**Стек:** PyTorch, ONNX, Docker, GitHub Actions

Форк open-source проекта Fish Speech — нейросетевая модель для синтеза речи с fine-tuning возможностями. Используется как submodule в docker-fish-audio-tts-server.

### 8. Supabase Deploy (Self-Hosted)
**Путь:** `supabase_deploy/`
**Стек:** PostgreSQL 15, Kong, GoTrue, PostgREST, Realtime, Storage, Edge Functions, Logflare, Supavisor, imgproxy

Self-hosted деплой всего стека Supabase с кастомизацией:

- **12+ контейнеров** — Studio, Kong, Auth, REST, Realtime, Storage, imgproxy, Meta, Functions, Analytics, DB, Supavisor
- **SQL-миграции** — профили пользователей, rate limits, API-токены, RLS-политики
- **Edge Functions** — Deno runtime для серверлесс-функций
- **Connection pooling** — Supavisor (Elixir) в transaction mode
- **Backup/Reset скрипты** — автоматизация обслуживания
- **CI/CD:** GitLab CI для деплоя

### 9. Monitoring Stack
**Путь:** `monitoring-stack/`
**Стек:** Grafana 12.3, Prometheus, Loki, Grafana Alloy, Node Exporter

Полный стек мониторинга и наблюдаемости:

- **Grafana** — визуализация метрик и логов, дашборды
- **Prometheus** — сбор метрик с нескольких серверов (P4, P5, P7), включая Ray Serve metrics
- **Loki** — централизованное хранилище логов от всех Docker-контейнеров
- **Grafana Alloy** — агент для сбора Docker-логов и доставки в Loki
- **Node Exporter** — метрики хостов (CPU, память, диск, сеть)
- **Мультинодная архитектура** — централизованный Loki с агентами на удалённых хостах

### 10. Docs (API-документация)
**Путь:** `docs/`
**Стек:** Mintlify, OpenAPI/Swagger, MDX

Публичная документация API на базе Mintlify:

- **OpenAPI-спецификации** — автогенерация из FastAPI (5 сервисов)
- **Quick Start** — гайды по транскрипции, стримингу, sentiment analysis, суммаризации
- **Техническая информация** — поддерживаемые языки, форматы файлов, принципы polling
- **API Playground** — интерактивное тестирование эндпоинтов

---

## Ключевые достижения и фишки

- **Production-ready облачная ML-платформа** — полный цикл от ML-inference до оплаты, развёрнутый на выделенных GPU-серверах с Triton Inference Server и Ray Serve
- **Real-time стриминговая транскрипция** — WebSocket → Triton gRPC pipeline с поддержкой 15+ аудиокодеков и sample rates 8–48 kHz, stateful inference с sequence batching
- **OpenAI-совместимый API** — drop-in замена OpenAI для транскрипции (`/audio/transcriptions`) и chat completions (`/v1/chat/completions`), полная совместимость с OpenAI SDK
- **Clean Architecture в биллинг-сервисе** — Protocols (интерфейсы), Use Cases, Entities, Factories, Repository Pattern, Adapter Pattern (YooKassa) с мультимерчант-маршрутизацией платежей
- **Динамический API Gateway** — декларативные маршруты из YAML с 4 типами аутентификации, request composition, проксированием и Traefik TLS-терминацией
- **Self-hosted Supabase** — полный стек из 12+ сервисов с кастомными SQL-миграциями, RLS-политиками и Edge Functions
- **Интеграция с YooKassa и 54-ФЗ** — автоматическое формирование чеков, верификация webhook IP/подписей, идемпотентная обработка событий, поддержка промокодов
- **Полный стек мониторинга** — Grafana + Prometheus + Loki + Alloy с мультинодной архитектурой и сбором метрик Ray Serve
- **Многоуровневое CI/CD** — GitLab CI пайплайны с lint (flake8/black), unit/integration/E2E тестами, coverage-отчётами и отдельными окружениями dev/staging/prod
- **Нейросетевой TTS** — контейнеризированный Fish Speech с GPU inference, voice cloning и OpenAI-совместимым API
- **Микросервисная архитектура** — 10 независимых сервисов на нескольких серверах, общающихся через HTTP/gRPC, с единым API Gateway и централизованным мониторингом

---

## Роль и вклад

На основе анализа кодовой базы, разработчик занимался:

- **Проектирование архитектуры** — разработка микросервисной архитектуры облачной платформы: определение границ сервисов, протоколов взаимодействия, стратегии деплоя на несколько серверов
- **Backend-разработка** — создание всех FastAPI-сервисов: API Gateway с динамической маршрутизацией, ML Backend с оркестрацией inference, UI Backend с rate limiting и тестами
- **ML Engineering** — интеграция ML-моделей через Ray Serve и Triton Inference Server, реализация стримингового ASR pipeline (WebSocket → decode → resample → Triton gRPC → CTC decode), поддержка множества аудиокодеков
- **Payment Engineering** — проектирование и разработка биллинг-сервиса по Clean Architecture: мультимерчант-маршрутизация, интеграция YooKassa с webhook-обработкой и 54-ФЗ, промокоды, тарифы
- **DevOps / Infrastructure** — настройка Docker Compose для всех сервисов, self-hosted Supabase из 12+ контейнеров, GitLab CI/CD пайплайны с multi-stage (lint → test → deploy), Traefik с TLS
- **Мониторинг и наблюдаемость** — развёртывание стека Grafana + Prometheus + Loki + Alloy, мультинодный сбор метрик и логов, настройка целей Prometheus для Ray Serve
- **API Design** — проектирование OpenAI-совместимых API, polling-based асинхронных эндпоинтов, документация через Mintlify с OpenAPI-спецификациями
- **Тестирование** — unit/integration/E2E тесты с coverage, моки Supabase, отдельные тестовые PostgreSQL через Docker
- **Безопасность** — JWT-аутентификация через Supabase, API-токены с отслеживанием использования, верификация webhook по IP/подписи, HSTS/XSS-защита через Traefik, Redis rate limiting
