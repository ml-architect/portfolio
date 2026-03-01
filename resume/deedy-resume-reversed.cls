% CV class — 2-column layout, HR-optimized
\ProvidesClass{deedy-resume-reversed}[2024/01/01 CV class]
\NeedsTeXFormat{LaTeX2e}
\DeclareOption{print}{\def\@cv@print{}}
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{article}
}
\ProcessOptions\relax
\LoadClass{article}

% Page geometry — tight margins
\usepackage[a4paper, hmargin=1.2cm, vmargin=0.8cm]{geometry}
\usepackage[hidelinks]{hyperref}

% Color definitions
\usepackage[usenames,dvipsnames]{xcolor}
\definecolor{date}{HTML}{555555}
\definecolor{primary}{HTML}{1a1a1a}
\definecolor{headings}{HTML}{1a1a1a}
\definecolor{subheadings}{HTML}{2b2b2b}
\definecolor{accent}{HTML}{4A56E2}
\definecolor{light}{HTML}{555555}

% Fonts
\usepackage{fontspec}

% Multilingual support
\usepackage{polyglossia}

% Icons/symbols
\usepackage{fontawesome5}

% Tables
\usepackage{tabularx}
\usepackage{enumitem}

% Header/footer
\usepackage{fancyhdr}
\usepackage{lastpage}

% Two-column layout (page-breaking support)
\usepackage{paracol}
\setcolumnwidth{0.62\textwidth, 0.35\textwidth}
\setlength{\columnsep}{12pt}

% Section separators
\usepackage{titlesec}
\titlespacing{\section}{0pt}{6pt}{3pt}
\titlespacing{\subsection}{0pt}{4pt}{1pt}

% Section line separator
\newcommand{\sectionsep}{\vspace{6pt}}
\newcommand{\sectionlinesep}{\vspace{2pt}\noindent\makebox[\linewidth]{\color{accent}\rule{\linewidth}{0.6pt}}\vspace{4pt}}

% Section heading — bold with colored underline
\titleformat{\section}{\color{headings}
\fontsize{12pt}{14pt}\selectfont\bfseries\raggedright}{}{0em}{}[\vspace{-6pt}\textcolor{accent}{\rule{\linewidth}{0.6pt}}]

% Subsection heading
\titleformat{\subsection}{
\color{subheadings}\fontsize{11pt}{13pt}\selectfont\bfseries}{}{0em}{}

% Name command — centered header block
\newcommand{\namesection}[3]{
\begin{center}
{\fontsize{24pt}{28pt}\selectfont\bfseries\color{headings} #1}\\[3pt]
{\fontsize{11pt}{13pt}\selectfont\color{accent} #2}\\[4pt]
{\fontsize{9pt}{11pt}\selectfont\color{light} #3}
\end{center}
\vspace{-4pt}
\noindent\makebox[\linewidth]{\color{accent}\rule{\linewidth}{0.8pt}}
\vspace{2pt}
}

% Summary section — no underline
\newcommand{\summarysection}[1]{
\vspace{-2pt}
{\color{headings}\fontsize{12pt}{14pt}\selectfont\bfseries\raggedright #1\par}
\vspace{3pt}
}

% Run subsection — project/company title inline
\newcommand{\runsubsection}[1]{
\color{headings}\fontsize{10pt}{12pt}\selectfont\bfseries {#1}\normalfont}

% Descriptors — role/position
\newcommand{\descript}[1]{
\color{subheadings}\raggedright\fontsize{9pt}{11pt}\selectfont {\textcolor{light}{\enspace|\enspace}#1}\normalfont}

% Location/date — lighter color
\newcommand{\location}[1]{
\color{light}\raggedright\fontsize{8.5pt}{10pt}\selectfont {#1}\normalfont}

% Compact bullet list
\newenvironment{tightemize}{
\vspace{1pt}\begin{itemize}[leftmargin=12pt, itemsep=1pt, parsep=0pt, topsep=0pt]
\fontsize{9pt}{11pt}\selectfont
}{\end{itemize}\vspace{0pt}}

% Skill tag inline
\newcommand{\skilltag}[1]{{\fontsize{9pt}{10pt}\selectfont\color{primary} #1}}
