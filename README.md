# AI Systems Architecture

ML-инженер и архитектор AI-систем. Строю production-ready платформы, где модели работают под нагрузкой, а не в Jupyter-ноутбуке.

Проектирую и запускаю системы с локальным GPU-инференсом — без облачных зависимостей. End-to-end: от R&D и fine-tuning до деплоя, мониторинга и SLA.

## Экспертиза

**LLM & Local Inference** — Triton Inference Server, vLLM, TensorRT, Ray Serve, Ollama. QLoRA fine-tuning моделей от 0.5B до 32B параметров (Qwen, DeepSeek). Бенчмарки на NVIDIA DGX Spark.

**Computer Vision** — YOLOv8 (mAP50 93%), OCR исторических документов, анализ спутниковых снимков, speaker diarization. GPU-кластер 6× RTX A6000, латентность <50 мс.

**Backend & Архитектура** — FastAPI, микросервисы (до 10 сервисов), Clean Architecture, WebSocket-стриминг, gRPC, кастомные SDK для клиентов.

**MLOps & Инфраструктура** — Docker, GitLab CI/CD, Grafana + Prometheus + Loki, Traefik. 4 дата-центра, 99.98% uptime, 35+ сервисов в продакшене.

## Ключевые проекты

- **Облачная ASR-платформа** — 10 микросервисов, Triton + Ray Serve, 100+ языков, 50 000+ аудиоминут/день
- **Fine-tuning LLM** — QLoRA, модели 0.5B–32B параметров для анализа контрактов, замена коммерческих API
- **SOC-платформа** — ML-детекция атак + локальная LLM, 8 инстансов по всей России, x3 к обнаружению инцидентов
- **CV-платформа реального времени** — 300+ камер, TensorRT-оптимизация, ensemble из 6 моделей на Triton

## Технологии

| Область | Стек |
|---------|------|
| Backend | Python, FastAPI, asyncio, WebSocket, gRPC, Pydantic |
| ML/AI | PyTorch, Transformers, QLoRA, CatBoost, YOLOv8, OpenCV, LangChain |
| Inference | Triton, TensorRT, vLLM, Ray Serve, Ollama, CUDA |
| Data | PostgreSQL, Redis, Elasticsearch, pgvector, FAISS |
| Infra | Docker, GitLab CI/CD, GitHub Actions, Grafana, Prometheus, Traefik |
| Frontend | Vue 3, TypeScript, Nuxt, Tailwind CSS |

