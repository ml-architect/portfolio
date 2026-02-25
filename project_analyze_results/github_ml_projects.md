# GitHub ML/DS проекты

Подборка open-source проектов, демонстрирующих компетенции в Machine Learning, Data Science, Computer Vision и MLOps.

---

## ABTest_Lab

**Репозиторий:** https://github.com/versus666jzx/ABTest_Lab

### Обзор
Интерактивное веб-приложение для проведения и анализа A/B-тестов. Развёрнуто как Streamlit-приложение (совместимо с Hugging Face Spaces).

### Стек
- **Python 3.9**, Streamlit 1.10
- **Статистика**: scipy 1.8, statsmodels 0.13
- **Данные**: pandas 1.4, numpy 1.23
- **Визуализация**: plotly 5.9, altair 4.2, matplotlib
- **Веб-парсинг**: beautifulsoup4 4.11
- **Деплой**: Hugging Face Spaces (SDK: Streamlit)

### Функционал
- Расчёт размера выборки, статистической мощности, p-value
- Визуализация результатов A/B-тестов с интерактивными графиками
- Поддержка различных статистических критериев

### Ключевые фишки
- Готовое веб-приложение для Data Science команд — не ноутбук, а полноценный инструмент
- Демонстрирует понимание статистики: проверка гипотез, доверительные интервалы, мощность теста
- Streamlit + Plotly — современный стек для DS-инструментов

---

## codes_detection

**Репозиторий:** https://github.com/versus666jzx/codes_detection

### Обзор
REST API-сервис для детекции и декодирования QR-кодов на изображениях. Контейнеризированный production-ready сервис.

### Стек
- **Python 3.10**, Ubuntu 20.04
- **CV**: OpenCV 4.5, pyzbar 0.1.9 (декодирование штрих/QR-кодов)
- **API**: FastAPI 0.78, uvicorn 0.17
- **Контейнеризация**: Docker

### Функционал
- POST `/decode_qr` — приём base64-encoded изображений
- Детекция и декодирование QR-кодов
- Структурированные JSON-ответы с обработкой ошибок (base64 decode error, no QR detected)

### Ключевые фишки
- Не просто скрипт, а готовый микросервис с API и Docker — production-подход к CV-задаче
- Работа с бинарными данными (base64 encoding/decoding)
- Чёткая обработка граничных случаев

---

## consumer_activity

**Репозиторий:** https://github.com/versus666jzx/consumer_activity

### Обзор
Аналитическое веб-приложение для анализа потребительской активности с ML-моделями и геопространственной аналитикой. Полностью контейнеризировано.

### Стек
- **Python**, Streamlit 1.15
- **ML**: scikit-learn 1.2, CatBoost 1.1
- **Данные**: pandas 1.5, numpy 1.23
- **Визуализация**: plotly 5.11
- **Гео**: geopy 2.3 (геокодирование, расстояния)
- **Контейнеризация**: Docker Compose

### Функционал
- Анализ и прогнозирование потребительской активности
- ML-модели (CatBoost, scikit-learn) для классификации/регрессии
- Геопространственная аналитика — привязка активности к локациям
- Интерактивные дашборды

### Ключевые фишки
- Полноценный ML-пайплайн: от данных до интерактивного дашборда
- CatBoost + геоданные — нетривиальная комбинация
- Docker Compose — готовый к деплою

---

## digital_breakthrough

**Репозиторий:** https://github.com/versus666jzx/digital_breakthrough

### Обзор
Коллекция решений хакатонов «Цифровой прорыв» — всероссийского конкурса по цифровизации. **5 проектов** для разных регионов России.

### Проекты

| Проект | Регион | Задача |
|--------|--------|--------|
| Выявление незаконных построек по спутниковым снимкам | Удмуртская Республика | Computer Vision, Satellite imagery |
| Классификация обращений граждан | Курская область | NLP, Text classification |
| Оптимизация работы коммунальных служб | Республика Башкортостан | Optimization, Operations Research |
| Поиск музейных экспонатов | Липецк | Information Retrieval, CV |
| Рекомендательная система для библиотеки | Тюмень | RecSys |

### Ключевые фишки
- **Хакатонный опыт** — 5 реальных кейсов для госсектора
- Широта компетенций: CV, NLP, RecSys, Optimization — в одном репозитории
- Работа со спутниковыми снимками — редкий и впечатляющий навык
- Социально значимые задачи — цифровизация регионов

---

## face_rec

**Репозиторий:** https://github.com/versus666jzx/face_rec

### Обзор
Веб-приложение для распознавания лиц в реальном времени через браузер с WebRTC-стримингом.

### Стек
- **Python**, Streamlit 1.23
- **WebRTC**: streamlit-webrtc 0.45, aiortc 1.5
- **Данные**: pandas 2.0, numpy 1.24
- **Криптография**: cryptography 41.0, pyOpenSSL 23.2
- **Визуализация**: Pillow 9.5, altair 5.0

### Функционал
- Real-time распознавание лиц через веб-камеру браузера
- WebRTC peer-to-peer стриминг видео
- Обработка видеопотока на сервере

### Ключевые фишки
- **WebRTC + ML** — технически сложная комбинация, real-time inference в браузере
- Работа с видеопотоком, а не статичными изображениями
- Полноценное веб-приложение, а не jupyter-ноутбук

---

## Historical-docs-OCR

**Репозиторий:** https://github.com/versus666jzx/Historical-docs-OCR

### Обзор
Проект по распознаванию текста на исторических документах XVIII—XIX веков (губернаторские отчёты, уставные грамоты). Работа с рукописными и печатными текстами дореволюционной России.

### Стек
- **Python**, PyTorch 2.2 (CUDA 11.8)
- **CV/OCR**: Ultralytics (YOLOv8), OpenCV, Roboflow, Supervision
- **NLP/Transformers**: Hugging Face Transformers 4.37, Datasets
- **ML**: scikit-learn
- **MLOps**: ClearML (трекинг экспериментов)
- **Notebooks**: JupyterLab 4.1

### Функционал
- Детекция текстовых блоков на сканах исторических документов (YOLOv8)
- OCR рукописных и печатных текстов XVIII-XIX веков
- Пайплайн: детекция → сегментация → распознавание

### Ключевые фишки
- **Уникальная задача** — OCR дореволюционных рукописных документов, нетривиальный домен
- **YOLOv8 + Transformers** — комбинация object detection и seq2seq для OCR
- **ClearML** — демонстрация MLOps-практик (трекинг экспериментов)
- **Roboflow** — профессиональный подход к разметке данных
- Работа с реальным историческим архивом из 29+ регионов

---

## ClearML-test

**Репозиторий:** https://github.com/versus666jzx/ClearML-test

### Обзор
Демо-проект по настройке и использованию ClearML — платформы для трекинга ML-экспериментов.

### Стек
- **Python**, ClearML
- **ML-пайплайны**: ClearML Pipelines

### Ключевые фишки
- Демонстрация навыков MLOps — версионирование экспериментов, артефактов, моделей
- Инфраструктурное мышление — не только модели, но и процессы вокруг них

---

## DVC_test

**Репозиторий:** https://github.com/versus666jzx/DVC_test

### Обзор
Демо-проект по использованию DVC (Data Version Control) для версионирования данных и моделей.

### Стек
- **DVC** (Data Version Control)
- **Jupyter Notebooks**

### Ключевые фишки
- Версионирование датасетов и моделей — ключевая MLOps-практика
- Воспроизводимость экспериментов
- Дополняет ClearML — полный набор MLOps-инструментов

---

## Общий профиль ML-компетенций

### Области экспертизы

| Область | Проекты | Уровень |
|---------|---------|---------|
| **Computer Vision** | codes_detection, face_rec, Historical-docs-OCR, digital_breakthrough | Продвинутый |
| **NLP / OCR** | Historical-docs-OCR, digital_breakthrough | Продвинутый |
| **Классический ML** | consumer_activity, ABTest_Lab, digital_breakthrough | Продвинутый |
| **Статистика / A/B-тесты** | ABTest_Lab | Средний+ |
| **RecSys** | digital_breakthrough | Средний |
| **MLOps** | ClearML-test, DVC_test, Historical-docs-OCR | Средний+ |

### Технологическая карта

- **Фреймворки ML**: PyTorch, scikit-learn, CatBoost, YOLOv8, Hugging Face Transformers
- **CV**: OpenCV, pyzbar, Roboflow, Ultralytics, Supervision
- **Данные**: pandas, numpy, scipy
- **Визуализация**: plotly, altair, matplotlib, Streamlit
- **MLOps**: ClearML, DVC, Docker, Docker Compose
- **API**: FastAPI, uvicorn
- **Статистика**: scipy, statsmodels

### Что выделяет среди кандидатов
1. **Разнообразие задач** — от A/B-тестов до OCR исторических документов и спутниковых снимков
2. **Production-подход** — не ноутбуки, а Docker-контейнеры, API, веб-приложения
3. **Хакатонный опыт** — 5 задач «Цифрового прорыва» для госсектора
4. **MLOps-культура** — ClearML + DVC для воспроизводимости
5. **Real-time ML** — face_rec с WebRTC, codes_detection с FastAPI
