# Редактирование и сборка резюме (PDF)

Резюме хранится в виде LaTeX-исходников и компилируется в PDF через Docker.

## Структура файлов

```
resume/
├── deedy-resume-reversed.cls   # Класс документа (стили, команды)
├── fonts/
│   ├── lato/                   # Lato TTF (для EN-резюме)
│   └── raleway/                # Raleway OTF (для EN-резюме)
├── resume-ru.tex               # Исходник русского резюме (Montserrat)
├── resume-en.tex               # Исходник английского резюме (Lato/Raleway)
├── resume-ru.pdf               # Скомпилированный PDF
└── resume-en.pdf               # Скомпилированный PDF
```

Финальные PDF также копируются в `app/public/` для скачивания с сайта.

## Требования

- **Docker** — для компиляции через образ `texlive/texlive:latest`
- XeLaTeX локально **не нужен**

## Pipeline: редактирование и сборка

### 1. Редактирование

Открыть нужный `.tex` файл и внести изменения:

- `resume/resume-ru.tex` — русское резюме
- `resume/resume-en.tex` — английское резюме
- `resume/deedy-resume-reversed.cls` — общие стили (отступы, шрифты, цвета, команды)

### 2. Компиляция через Docker

```bash
cd resume

# Компиляция обоих резюме (два прохода для корректных ссылок)
docker run --rm -v "$(pwd):/data" -w /data texlive/texlive:latest bash -c \
  "xelatex -interaction=nonstopmode resume-ru.tex && \
   xelatex -interaction=nonstopmode resume-en.tex && \
   xelatex -interaction=nonstopmode resume-ru.tex && \
   xelatex -interaction=nonstopmode resume-en.tex"
```

Два прохода XeLaTeX нужны для корректного отображения номеров страниц (`Стр. X из Y`).

Для компиляции только одного языка:

```bash
# Только русское
docker run --rm -v "$(pwd):/data" -w /data texlive/texlive:latest \
  xelatex -interaction=nonstopmode resume-ru.tex

# Только английское
docker run --rm -v "$(pwd):/data" -w /data texlive/texlive:latest \
  xelatex -interaction=nonstopmode resume-en.tex
```

### 3. Копирование в public

```bash
cp resume/resume-ru.pdf resume/resume-en.pdf app/public/
```

После этого PDF доступны на сайте по адресам:
- `/portfolio/resume-ru.pdf`
- `/portfolio/resume-en.pdf`

### Однострочная команда (полный цикл)

```bash
cd resume && \
docker run --rm -v "$(pwd):/data" -w /data texlive/texlive:latest bash -c \
  "xelatex -interaction=nonstopmode resume-ru.tex && \
   xelatex -interaction=nonstopmode resume-en.tex && \
   xelatex -interaction=nonstopmode resume-ru.tex && \
   xelatex -interaction=nonstopmode resume-en.tex" && \
cp resume-ru.pdf resume-en.pdf ../app/public/ && \
cd ..
```

## Архитектура шаблона

### Класс `deedy-resume-reversed.cls`

Основан на [Deedy-Resume-Reversed](https://github.com/ZDTaylor/Deedy-Resume-Reversed), переделан под:

- **Одноколоночный формат** (вместо оригинального двухколоночного)
- **2 страницы** A4
- **Кириллица** через `polyglossia`
- **Иконки** через `fontawesome5`
- **Нумерация страниц** через `fancyhdr` + `lastpage`

Ключевые команды:

| Команда | Назначение |
|---------|-----------|
| `\namesection{имя}{должность}{контакты}` | Шапка резюме |
| `\section{ЗАГОЛОВОК}` | Раздел с цветной линией |
| `\runsubsection{Название}` | Заголовок проекта/компании |
| `\descript{--- описание \hfill роль}` | Описание и роль |
| `\location{дата \| компания}` | Дата и локация |
| `\sectionsep` | Отступ между записями |
| `tightemize` (environment) | Компактный маркированный список |

### Шрифты

| Резюме | Шрифт | Источник |
|--------|-------|----------|
| Русское (`resume-ru.tex`) | Montserrat | Системный в texlive Docker-образе |
| Английское (`resume-en.tex`) | Lato + Raleway | Локальные файлы в `fonts/` |

Montserrat используется для русского, потому что Lato/Raleway не содержат кириллических глифов.

### Цветовая схема

| Цвет | HEX | Применение |
|------|-----|-----------|
| `headings` | `#333333` | Заголовки, имя |
| `subheadings` | `#444444` | Описания ролей |
| `accent` | `#4A56E2` | Линии-разделители, должность |
| `light` | `#888888` | Даты, локации, футер |
| `primary` | `#2b2b2b` | Основной текст |

## Проверка результата

Извлечение текста из PDF для быстрой проверки (без открытия файла):

```bash
docker run --rm -v "$(pwd):/data" -w /data texlive/texlive:latest bash -c \
  "apt-get update -qq && apt-get install -y -qq poppler-utils > /dev/null 2>&1 && \
   pdftotext resume-ru.pdf -"
```

## Чек-лист перед деплоем

- [ ] Оба PDF — ровно 2 страницы
- [ ] Нет `Missing character` предупреждений в `.log`
- [ ] Футер показывает `Стр. 1 из 2` / `Page 1 of 2`
- [ ] Все гиперссылки кликабельны (email, Telegram, GitHub, Habr)
- [ ] PDF скопированы в `app/public/`
- [ ] Кнопки скачивания на главной работают (HeroSection.vue)
