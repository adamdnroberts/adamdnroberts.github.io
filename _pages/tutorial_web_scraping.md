---
layout: page
permalink: /teaching/web-scraping-tutorial/
title: Web Scraping with BeautifulSoup and Selenium
description: A SICSS tutorial by Adam D. Roberts on web scraping for the social sciences using BeautifulSoup and Selenium.
nav: false
lang: en
---

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/adamdnroberts/adamdnroberts.github.io/blob/main/assets/jupyter/web-scraping-tutorial.ipynb)

[Download the notebook]({{ '/assets/jupyter/web-scraping-tutorial.ipynb' | relative_url }})

{::nomarkdown}
{% assign jupyter_path = "assets/jupyter/web-scraping-tutorial.ipynb" | relative_url %}
{% capture notebook_exists %}{% file_exists assets/jupyter/web-scraping-tutorial.ipynb %}{% endcapture %}
{% if notebook_exists == "true" %}
{% jupyter_notebook jupyter_path %}
{% else %}

<p>Sorry, the notebook you are looking for does not exist.</p>
{% endif %}
{:/nomarkdown}
