# Palatine TDZZ -- AI-система анализа рисков в контрактах на морские грузоперевозки зерна

**Локальный путь:** `/mnt/c/Users/Andrew/PycharmProjects/WORKING_PROJECTS/Palatine/TDZZ/`

**Подпроекты:**
| Подпроект | Путь |
|---|---|
| contract-risk-analyze-api | `contract-risk-analyze-api/` |
| contract-risk-analyze-bot | `contract-risk-analyze-bot/` |
| research-and-model-train | `research-and-model-train/` |

## Обзор проекта

**Contract Risk Analyzer** -- production-ready AI-система для автоматизированного анализа рисков в международных контрактах на морские грузоперевозки зерна, разработанная для **группы компаний "Торговый Дом Зерно Заволжья" (ТДЗЗ)** -- одного из крупнейших зерновых трейдеров России.

Продукт решает критическую бизнес-задачу: ежедневно трейдеры ТДЗЗ обрабатывают десятки контрактов на купле-продажу и перевозку зерновых грузов (пшеница, подсолнечное масло, шрот и др.) по маршрутам из российских портов (Ростов, Азов) в страны назначения (Турция и др.). Каждый контракт содержит десятки юридических формулировок, влияющих на финансовые риски: условия оплаты, демерредж, лайтайм, качество груза, фрахт, страхование, арбитражные оговорки (GAFTA/FOSFA) и др.

До внедрения системы анализ рисков проводился вручную юристами и трейдерами, что занимало часы и было подвержено человеческим ошибкам. Система автоматизирует этот процесс: пользователь загружает DOCX-контракт через Telegram-бота, AI-модель анализирует текст по 111 рисковым и обязательным фразам, учитывая контекст (продукт, страну назначения, базис поставки Incoterms, порт отгрузки), и выдает структурированный отчёт с уровнями риска (1-5), рекомендациями и точными цитатами из договора.

Проект включает полный ML-цикл: от R&D и бенчмаркинга моделей через обучение (fine-tuning) собственной LLM до production-деплоя с двухступенчатой верификацией ответов.

## Стек технологий

### Backend / API
- **Python 3.12** -- основной язык разработки
- **FastAPI** -- асинхронный REST API с BackgroundTasks для неблокирующей обработки контрактов
- **Pydantic v2 + pydantic-settings** -- валидация данных, Pydantic-модели для структурированных ответов LLM (ContractChainResult, VerifiedAnswer, RiskPhrase)
- **LangChain** (langchain-openai, langchain-community, langchain-core) -- оркестрация LLM-цепочек: `@chain`-декоратор, `JsonOutputParser`, `RunnablePassthrough`, мультимодальные `HumanMessage`
- **OpenAI GPT-4o** -- production LLM-модель для анализа контрактов и верификации
- **Pandas** -- обработка табличных данных рисковых фраз и словаря сокращений
- **python-docx / docx2txt** -- извлечение текста из DOCX-контрактов
- **HTTP Basic Auth** -- аутентификация API-запросов

### Telegram Bot
- **aiogram 3** -- асинхронный фреймворк Telegram-бота с FSM (Finite State Machine)
- **aiohttp** -- асинхронный HTTP-клиент для взаимодействия с API
- **openpyxl** -- генерация Excel-отчётов (XLSX) с результатами анализа
- **Pydantic v2** -- валидация настроек бота и конфигурации
- **python-dotenv** -- управление секретами через `.env`

### ML / AI (Research & Training)
- **Unsloth** -- высокопроизводительный fine-tuning LLM с 2x ускорением, поддержка RoPE Scaling для длинных контекстов (до 18000 токенов)
- **Transformers (HuggingFace)** -- обучение моделей серии Qwen2.5 (0.5B, 1.5B, 3B, 14B, 32B), AutoModelForSequenceClassification
- **TRL (Transformer Reinforcement Learning)** -- SFTTrainer для Supervised Fine-Tuning, `train_on_responses_only` для обучения только на ответах
- **PEFT (LoRA/QLoRA)** -- Parameter-Efficient Fine-Tuning: LoRA с rank 32-256, target_modules для q/k/v/o/gate/up/down проекций, 4bit квантизация через BitsAndBytesConfig
- **SetFit** -- few-shot классификация для экспериментов с малым количеством размеченных данных
- **Distilabel** -- генерация синтетических обучающих данных через LLM-пайплайны
- **LightRAG (HKU)** -- Graph-based Retrieval-Augmented Generation с гибридным поиском (naive + local + global + hybrid)
- **Ollama** -- локальный инференс LLM (Llama 3.3, Qwen2.5 32B, RuadaptQwen2.5 32B)
- **LM Studio** -- альтернативный локальный инференс для экспериментов с LightRAG
- **Quepasa** -- SaaS RAG-платформа (бенчмарк против собственного решения)
- **intfloat/multilingual-e5-large-instruct** -- мультиязычная модель эмбеддингов (1024-dim) для RAG-индексации
- **scikit-learn** -- метрики качества (balanced_accuracy_score, classification_report, f1_score)
- **PyTorch 2.2-2.5 + CUDA 12.1** -- GPU-ускорение обучения и инференса, поддержка bf16/fp16, xformers, Flash Attention 2
- **markitdown** -- конвертация DOCX в Markdown для подачи в LLM

### Данные и хранение
- **Git LFS** -- хранение больших датасетов разметки (labels CSV) и обучающих наборов
- **HuggingFace Hub** -- публикация обученных моделей в GGUF-формате (`versus666/ContractRiskAnalyzer`)
- **nano-vectordb** -- легковесная векторная БД для LightRAG-индексов
- **aioboto3 / S3** -- облачное хранение (эксперименты)

### Инфраструктура и DevOps
- **Docker / Docker Compose** -- контейнеризация API и бота (отдельные Dockerfile), общая сеть `palatine_network`
- **GitLab CI/CD** -- автоматический деплой бота (`deploy` stage, SSH + docker-compose up)
- **Makefile** -- автоматизация рутинных операций (build, up, down, logs, bash, rebuild)
- **Pre-commit hooks** -- автоматическое форматирование и линтинг (ruff, ruff-format)
- **Ruff** -- линтер и форматер (line-length=120, Python 3.12 target)
- **Pylint** -- статический анализ кода бота

## Архитектура и компоненты

### 1. Contract Risk Analyze API
**Путь:** `contract-risk-analyze-api/`
**Стек:** Python 3.12, FastAPI, LangChain, OpenAI GPT-4o, Pydantic v2, Pandas

REST API сервис, реализующий ядро AI-анализа контрактов с двухступенчатой LLM-верификацией:

- **Двухступенчатый LLM-пайплайн анализа**: первая LLM (GPT-4o) анализирует контракт по каждой из 111 рисковых/обязательных фраз, вторая LLM верифицирует ответ первой и может перевернуть решение (паттерн "LLM-as-a-Judge"). Результат включает: наличие фразы, chain-of-thought, рекомендации, цитату из договора, подтверждение верификации
- **Контекстно-зависимый анализ**: каждая рисковая фраза проверяется не изолированно, а с учётом 4 параметров контекста -- продукт (wheat, sunflower oil и др.), страна назначения, базис поставки (CIF, CFR, FOB, CIFFO), порт отгрузки (Rostov, Azov). Значение ALL обозначает универсальную применимость
- **Разделение на рисковые и обязательные фразы**: для рисковых фраз наличие в договоре = риск, для обязательных -- наоборот, отсутствие = риск. Каждому типу соответствует отдельный системный промпт и логика верификации
- **Словарь отраслевых сокращений**: 200+ терминов международной торговли зерном (GAFTA, FOSFA, B/L, LAYCAN, Demurrage, FOB, CIF, NOR, Charter Party и др.), передаваемый в контекст LLM для корректной интерпретации
- **Асинхронная фоновая обработка**: FastAPI BackgroundTasks для неблокирующего анализа с polling статуса через `/task_status/{user_id}` и прогрессом ("Проанализировано фраз: N из M")
- **LimitedSizeState**: кастомный in-memory store с ограничением размера для управления задачами и сообщениями
- **Персистентное сохранение**: исходный DOCX-контракт и JSON-результат анализа сохраняются в пользовательскую директорию `user_data/{contract_name}/`
- **HTTP Basic Auth**: аутентификация всех эндпоинтов API через HTTPBasicCredentials

### 2. Contract Risk Analyze Bot
**Путь:** `contract-risk-analyze-bot/`
**Стек:** Python 3.12, aiogram 3, aiohttp, openpyxl, Pydantic v2

Telegram-бот -- пользовательский интерфейс для сотрудников ТДЗЗ:

- **Асинхронное взаимодействие с API**: бот отправляет DOCX-файл на API через `aiohttp.FormData`, затем периодически опрашивает статус задачи (polling с интервалом 2 сек) до получения результата
- **Генерация Excel-отчётов**: формирование структурированной XLSX-таблицы с результатами анализа через `openpyxl` -- раздел, формулировка, уровень риска, наличие фразы, рекомендации, цитата из договора, chain-of-thought, подтверждение верификации
- **Inline-клавиатуры**: интерактивные кнопки для навигации и подтверждения действий
- **Управление состояниями**: обработка документов через handlers с группировкой по типам (documents, start, message_helpers)
- **Production-деплой**: Dockerfile на Python 3.12, docker-compose с зависимостью от API (`depends_on`), GitLab CI/CD с SSH-деплоем на продакшн-сервер
- **Автоматизация через Makefile**: команды build, up, down, logs, bash, rebuild для управления контейнерами

### 3. Research & Model Training
**Путь:** `research-and-model-train/`
**Стек:** Python 3.10-3.11, Unsloth, Transformers, TRL, PEFT, LightRAG, Ollama, LM Studio, Distilabel, SetFit, scikit-learn, PyTorch + CUDA 12.1

Полный R&D-цикл: от baseline-экспериментов до fine-tuning production-модели:

- **Baseline-бенчмарки на коммерческих LLM**: тестирование GPT-4o (через LangChain), GPT-4o-2024-08-06 с двухступенчатой верификацией, Quepasa SaaS RAG -- замеры balanced_accuracy_score, classification_report по 4 реальным контрактам ТДЗЗ
- **Baseline-бенчмарки на open-source LLM**: Llama 3.3 (через Ollama и LangChain), Qwen2.5 32B (через Ollama) -- сравнение с GPT-4o для обоснования выбора архитектуры
- **RAG-эксперименты с LightRAG**: Graph-based RAG с Ollama (RuadaptQwen2.5 32B Q4_K_M) и мультиязычными эмбеддингами (multilingual-e5-large-instruct, 1024 dim). Индексация контрактов с кастомными chunk_overlap и entity_summary параметрами, гибридный поиск (naive + local + global)
- **RAG-эксперименты с LM Studio**: альтернативный бэкенд для LightRAG через LlamaIndex + LM Studio
- **Генерация обучающих данных (Distilabel)**: пайплайн синтетической генерации датасетов через RuadaptQwen2.5 32B на Ollama. Обработка 59 реальных контрактов x 111 фраз = 5883 обучающих примера. Формат Alpaca (Instruction / Input / Response) с EOS-токеном
- **Разметка данных**: работа с CSV-разметкой от экспертов ТДЗЗ (labels-19-01-2025, labels-27-01-2025) -- 111 рисковых/обязательных фраз x 59 контрактов. Автоматическое выявление пропусков и удаление неразмеченных данных
- **Fine-tuning серии моделей Qwen2.5**: обучение от 0.5B до 32B параметров с QLoRA (4bit NF4, LoRA rank 32-256, target_modules: q/k/v/o/gate/up/down). Unsloth для 2x ускорения, RoPE Scaling для контекста 18000 токенов, `train_on_responses_only` для обучения исключительно на ответной части, adamw_8bit оптимизатор с cosine_with_restarts LR scheduler
- **Sequence Classification**: параллельное экспериментирование с AutoModelForSequenceClassification + LoRA (task_type=SEQ_CLASSIFICATION) для бинарной классификации наличия рисковой фразы
- **Публикация моделей**: экспорт в GGUF (f16, q8_0), публикация на HuggingFace Hub (`versus666/ContractRiskAnalyzer`), сохранение merged 16bit моделей
- **Облачное обучение**: отдельные скрипты для запуска обучения на облачных GPU (train_models_cloud.py, transformers_train_cloud.py) с обработкой ошибок и сохранением чекпоинтов

## Ключевые достижения и фишки

- **Двухступенчатая LLM-верификация (LLM-as-a-Judge)**: уникальная архитектура, где первая LLM анализирует контракт и определяет наличие риска с chain-of-thought рассуждениями, а вторая LLM верифицирует решение первой и может перевернуть результат. Это значительно повышает точность анализа -- верификатор исправляет ложноположительные и ложноотрицательные срабатывания, что подтверждено метриками balanced_accuracy
- **Полный ML-цикл от R&D до production**: проект покрывает весь жизненный цикл ML-продукта -- baseline на коммерческих API (GPT-4o), бенчмаркинг open-source моделей (Llama 3.3, Qwen2.5), RAG-эксперименты (LightRAG с graph-based retrieval), генерация синтетических данных (Distilabel), fine-tuning собственной LLM (Unsloth + QLoRA на серии Qwen2.5 от 0.5B до 32B), и production-деплой через FastAPI + Docker
- **Domain-specific NLP для зерновой торговли**: система работает со специфичной терминологией международной морской торговли зерном -- GAFTA/FOSFA контракты, Incoterms (CIF, CFR, FOB, CIFFO), 200+ отраслевых сокращений (Demurrage, Laytime, LAYCAN, B/L, NOR, Charter Party), билингвальные контракты (English/Russian). Глубокое погружение в предметную область, недоступное универсальным AI-решениям
- **Контекстно-зависимый анализ с 4 параметрами**: каждая рисковая фраза проверяется не изолированно, а с учётом контекста -- продукт, страна назначения, базис поставки, порт отгрузки. Это критически важно: например, формулировка "Russian vessels are not to be chartered" является риском только при базисе CFR/CIF и портах Rostov/Azov, но не при FOB
- **Fine-tuning LLM для замены коммерческого API**: обучение собственной модели на базе Qwen2.5 32B позволяет перейти с дорогостоящего GPT-4o API на self-hosted решение, обеспечивая конфиденциальность контрактных данных заказчика и контроль над стоимостью инференса. Модель опубликована на HuggingFace в GGUF-формате для эффективного деплоя через Ollama
- **Промышленная генерация обучающих данных**: пайплайн на Distilabel + RuadaptQwen2.5 32B для создания 5883 обучающих примеров из 59 реальных контрактов. Каждый пример включает системный промпт, информацию о риске, словарь сокращений, текст контракта и структурированный JSON-ответ. Формат Alpaca с автоматическим добавлением EOS-токена
- **Мультимодельный бенчмаркинг**: систематическое сравнение 6+ моделей и подходов -- GPT-4o, GPT-4o с верификацией, Llama 3.3 (Ollama), Llama 3.3 (LangChain), Qwen2.5 32B, Quepasa SaaS RAG, LightRAG + Ollama -- с метриками balanced_accuracy и classification_report для обоснованного выбора production-решения
- **Оптимизация длинного контекста**: контракты ТДЗЗ содержат до 18000 токенов. Реализована поддержка через RoPE Scaling в Unsloth, настройка num_ctx в Ollama, chunking с overlap для RAG-индексации, и use_gradient_checkpointing="unsloth" для обучения на длинных последовательностях без OOM
- **Структурированный вывод LLM**: все модели возвращают Pydantic-валидированные JSON-ответы (ContractChainResult: phrase_exist, confidence, llm_recommendation, phrase_sentence, chain_of_thought) через JsonOutputParser и Ollama format schema. Это обеспечивает надежную интеграцию с downstream-системами
- **Production-ready инфраструктура**: Docker-контейнеризация с docker-compose оркестрацией, GitLab CI/CD с SSH-деплоем, pre-commit hooks (ruff), Makefile-автоматизация, HTTP Basic Auth, асинхронная обработка с прогрессом, персистентное сохранение результатов

## Роль и вклад

**ML-инженер / Backend-разработчик** -- проектирование и реализация полного цикла от R&D до production-деплоя.

- Спроектировал и реализовал архитектуру двухступенчатого LLM-пайплайна анализа контрактов с паттерном LLM-as-a-Judge (первая модель анализирует, вторая верифицирует и может перевернуть решение)
- Разработал REST API на FastAPI с асинхронной фоновой обработкой контрактов (BackgroundTasks), polling-механизмом статуса задач и HTTP Basic Auth аутентификацией
- Провел масштабное R&D-исследование: бенчмаркинг GPT-4o, Llama 3.3, Qwen2.5 32B, Quepasa SaaS, LightRAG -- с метриками balanced_accuracy на 4 реальных контрактах ТДЗЗ (по 66-111 фраз каждый)
- Реализовал RAG-пайплайн на LightRAG (Graph-based RAG) с мультиязычными эмбеддингами (multilingual-e5-large-instruct), гибридным поиском и интеграцией с Ollama и LM Studio
- Построил пайплайн генерации обучающих данных на Distilabel + RuadaptQwen2.5 32B: обработка 59 контрактов x 111 фраз = 5883 примера с автоматической разметкой и валидацией через Pydantic-схемы
- Провел fine-tuning серии моделей Qwen2.5 (0.5B-32B) с QLoRA через Unsloth: настройка LoRA rank, target_modules, train_on_responses_only, cosine_with_restarts scheduler, EarlyStoppingCallback
- Опубликовал обученную модель ContractRiskAnalyzer на HuggingFace Hub в GGUF-формате (f16, q8_0) для эффективного self-hosted деплоя через Ollama
- Разработал Telegram-бота на aiogram 3 с загрузкой DOCX-контрактов, асинхронным взаимодействием с API, генерацией Excel-отчётов (openpyxl) и inline-клавиатурами
- Создал доменный словарь из 200+ отраслевых сокращений международной торговли зерном (GAFTA, FOSFA, Incoterms и др.) и систему контекстно-зависимой проверки фраз (продукт, страна, базис поставки, порт)
- Настроил production-инфраструктуру: Docker-контейнеризация, docker-compose оркестрация, GitLab CI/CD с SSH-деплоем, pre-commit hooks, Makefile-автоматизация
