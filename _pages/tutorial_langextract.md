---
layout: page
permalink: /teaching/langextract-tutorial/
title: LangExtract Tutorial
description: A SICSS tutorial by Adam D. Roberts on extracting structured information from unstructured text with Google's LangExtract library.
nav: false
lang: en
---

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/adamdnroberts/adamdnroberts.github.io/blob/main/assets/jupyter/langextract-tutorial.ipynb)

[Download the notebook]({{ '/assets/jupyter/langextract-tutorial.ipynb' | relative_url }})

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/langextract-tutorial.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/langextract-tutorial.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
{% jupyter_notebook jupyter_path %}
{% else %}

<p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
