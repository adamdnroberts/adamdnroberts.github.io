---
layout: page
permalink: /teaching/transcription-tutorial/
title: Audio to Text Transcription Tutorial
description: A SICSS tutorial by Adam D. Roberts on transcribing audio with OpenAI Whisper and identifying speakers with pyannote.audio.
nav: false
lang: en
---

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/adamdnroberts/adamdnroberts.github.io/blob/main/assets/jupyter/transcription-tutorial.ipynb)

[Download the notebook]({{ '/assets/jupyter/transcription-tutorial.ipynb' | relative_url }})

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/transcription-tutorial.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/transcription-tutorial.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
{% jupyter_notebook jupyter_path %}
{% else %}

<p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
