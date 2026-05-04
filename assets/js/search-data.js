// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-investigación",
          title: "Investigación",
          description: "Artículos de trabajo y proyectos en progreso de Adam D. Roberts sobre rendición de cuentas electoral, gobernanza local y política espacial.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/es/research/";
          },
        },{id: "nav-research",
          title: "Research",
          description: "Working papers and works in progress by Adam D. Roberts on electoral accountability, local governance, and spatial politics.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-docencia",
          title: "Docencia",
          description: "Experiencia docente de Adam D. Roberts en la University of Rochester y Brigham Young University.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/es/teaching/";
          },
        },{id: "nav-teaching",
          title: "Teaching",
          description: "Teaching assistant experience of Adam D. Roberts at the University of Rochester and Brigham Young University.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/teaching/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/assets/pdf/CV_AdamRoberts.pdf";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/assets/pdf/CV_AdamRoberts.pdf";
          },
        },{id: "post-everything-i-read-in-april-2026",
        
          title: "Everything I read in April 2026",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2026/05/03/test.html";
          
        },
      },{id: "post-a-post-with-plotly-js",
        
          title: "a post with plotly.js",
        
        description: "this is what included plotly.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2025/03/26/plotly.html";
          
        },
      },{id: "post-a-post-with-image-galleries",
        
          title: "a post with image galleries",
        
        description: "this is what included image galleries could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/12/04/photo-gallery.html";
          
        },
      },{id: "post-a-post-with-tabs",
        
          title: "a post with tabs",
        
        description: "this is what included tabs in a post could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/05/01/tabs.html";
          
        },
      },{id: "post-a-post-with-typograms",
        
          title: "a post with typograms",
        
        description: "this is what included typograms code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/04/29/typograms.html";
          
        },
      },{id: "post-a-post-that-can-be-cited",
        
          title: "a post that can be cited",
        
        description: "this is what a post that can be cited looks like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/04/28/post-citation.html";
          
        },
      },{id: "post-a-post-with-pseudo-code",
        
          title: "a post with pseudo code",
        
        description: "this is what included pseudo code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/04/15/pseudocode.html";
          
        },
      },{id: "post-a-post-with-code-diff",
        
          title: "a post with code diff",
        
        description: "this is how you can display code diffs",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/01/27/code-diff.html";
          
        },
      },{id: "post-a-post-with-advanced-image-components",
        
          title: "a post with advanced image components",
        
        description: "this is what advanced image components could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/01/27/advanced-images.html";
          
        },
      },{id: "post-a-post-with-vega-lite",
        
          title: "a post with vega lite",
        
        description: "this is what included vega lite code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/01/27/vega-lite.html";
          
        },
      },{id: "post-a-post-with-geojson",
        
          title: "a post with geojson",
        
        description: "this is what included geojson code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/01/26/geojson-map.html";
          
        },
      },{id: "post-a-post-with-echarts",
        
          title: "a post with echarts",
        
        description: "this is what included echarts code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/01/26/echarts.html";
          
        },
      },{id: "post-a-post-with-chart-js",
        
          title: "a post with chart.js",
        
        description: "this is what included chart.js code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2024/01/26/chartjs.html";
          
        },
      },{id: "post-a-post-with-tikzjax",
        
          title: "a post with TikZJax",
        
        description: "this is what included TikZ code could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2023/12/12/tikzjax.html";
          
        },
      },{id: "post-a-post-with-bibliography",
        
          title: "a post with bibliography",
        
        description: "an example of a blog post with bibliography",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2023/07/12/post-bibliography.html";
          
        },
      },{id: "post-a-post-with-jupyter-notebook",
        
          title: "a post with jupyter notebook",
        
        description: "an example of a blog post with jupyter notebook",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2023/07/04/jupyter-notebook.html";
          
        },
      },{id: "post-a-post-with-custom-blockquotes",
        
          title: "a post with custom blockquotes",
        
        description: "an example of a blog post with custom blockquotes",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2023/05/12/custom-blockquotes.html";
          
        },
      },{id: "post-a-post-with-table-of-contents-on-a-sidebar",
        
          title: "a post with table of contents on a sidebar",
        
        description: "an example of a blog post with table of contents on a sidebar",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2023/04/25/sidebar-table-of-contents.html";
          
        },
      },{id: "post-a-post-with-audios",
        
          title: "a post with audios",
        
        description: "this is what included audios could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2023/04/25/audios.html";
          
        },
      },{id: "post-a-post-with-videos",
        
          title: "a post with videos",
        
        description: "this is what included videos could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2023/04/24/videos.html";
          
        },
      },{id: "post-displaying-beautiful-tables-with-bootstrap-tables",
        
          title: "displaying beautiful tables with Bootstrap Tables",
        
        description: "an example of how to use Bootstrap Tables",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2023/03/20/tables.html";
          
        },
      },{id: "post-a-post-with-table-of-contents",
        
          title: "a post with table of contents",
        
        description: "an example of a blog post with table of contents",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2023/03/20/table-of-contents.html";
          
        },
      },{id: "post-a-post-with-giscus-comments",
        
          title: "a post with giscus comments",
        
        description: "an example of a blog post with giscus comments",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/external-services/2022/12/10/giscus-comments.html";
          
        },
      },{id: "post-a-post-with-redirect",
        
          title: "a post with redirect",
        
        description: "you can also redirect to assets like pdf",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/assets/pdf/example_pdf.pdf";
          
        },
      },{id: "post-a-post-with-diagrams",
        
          title: "a post with diagrams",
        
        description: "an example of a blog post with diagrams",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2021/07/04/diagrams.html";
          
        },
      },{id: "post-a-distill-style-blog-post",
        
          title: "a distill-style blog post",
        
        description: "an example of a distill-style blog post and main elements",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/2021/05/22/distill.html";
          
        },
      },{id: "post-a-post-with-twitter",
        
          title: "a post with twitter",
        
        description: "an example of a blog post with twitter",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/external-services/2020/09/28/twitter.html";
          
        },
      },{id: "post-a-post-with-disqus-comments",
        
          title: "a post with disqus comments",
        
        description: "an example of a blog post with disqus comments",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/external-services/2015/10/20/disqus-comments.html";
          
        },
      },{id: "post-a-post-with-math",
        
          title: "a post with math",
        
        description: "an example of a blog post with some math",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2015/10/20/math.html";
          
        },
      },{id: "post-a-post-with-code",
        
          title: "a post with code",
        
        description: "an example of a blog post with some code",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2015/07/15/code.html";
          
        },
      },{id: "post-a-post-with-images",
        
          title: "a post with images",
        
        description: "this is what included images could look like",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2015/05/15/images.html";
          
        },
      },{id: "post-a-post-with-formatting-and-links",
        
          title: "a post with formatting and links",
        
        description: "march &amp; april, looking forward to summer",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/sample-posts/2015/03/15/formatting-and-links.html";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather.html";
            },},{id: "courses-elections-and-accountability-in-democracies",
          title: 'Elections and Accountability in Democracies',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/";
            },},{id: "courses-week-1-introduction-to-electoral-accountability",
          title: 'Week 1: Introduction to Electoral Accountability',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week01/";
            },},{id: "courses-week-2-defining-electoral-accountability",
          title: 'Week 2: Defining Electoral Accountability',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week02/";
            },},{id: "courses-week-3-accountability-and-good-governance",
          title: 'Week 3: Accountability and Good Governance',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week03/";
            },},{id: "courses-week-4-empirical-analysis-of-electoral-accountability",
          title: 'Week 4: Empirical Analysis of Electoral Accountability',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week04/";
            },},{id: "courses-week-5-media-monitoring-and-information-environments",
          title: 'Week 5: Media, Monitoring, and Information Environments',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week05/";
            },},{id: "courses-week-6-corruption",
          title: 'Week 6: Corruption',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week06/";
            },},{id: "courses-week-7-politician-performance",
          title: 'Week 7: Politician Performance',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week07/";
            },},{id: "courses-week-8-public-goods",
          title: 'Week 8: Public Goods',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week08/";
            },},{id: "courses-week-9-electoral-incentives",
          title: 'Week 9: Electoral Incentives',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week09/";
            },},{id: "courses-week-10-monitoring-effects",
          title: 'Week 10: Monitoring Effects',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week10/";
            },},{id: "courses-week-11-news-monitoring-and-strategic-behavior",
          title: 'Week 11: News, Monitoring, and Strategic Behavior',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week11/";
            },},{id: "courses-week-12-final-research-proposal-presentations",
          title: 'Week 12: Final Research Proposal Presentations',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/elections-accountability/week12/";
            },},{id: "courses-psci-101-intr-101-introduction-to-comparative-politics",
          title: 'PSCI 101/INTR 101 — Introduction to Comparative Politics',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/intro-comparative-politics/";
            },},{id: "courses-intro-to-r-basic-functions",
          title: 'Intro to R: Basic Functions',
          description: "R as a calculator, variables, and vectors.",
          section: "Courses",handler: () => {
              window.location.href = "/courses/intro-quant-analysis/basic-functions/";
            },},{id: "courses-workshop-hypothesis-tests",
          title: 'Workshop: Hypothesis Tests',
          description: "Practice problems on classical hypothesis testing using the Dogtopia survey dataset.",
          section: "Courses",handler: () => {
              window.location.href = "/courses/intro-quant-analysis/hypothesis-testing/";
            },},{id: "courses-quantitative-analysis-for-political-science",
          title: 'Quantitative Analysis for Political Science',
          description: "",
          section: "Courses",handler: () => {
              window.location.href = "/courses/intro-quant-analysis/";
            },},{id: "courses-intro-to-r-working-with-data",
          title: 'Intro to R: Working with Data',
          description: "Working directories, loading datasets, and data frame basics.",
          section: "Courses",handler: () => {
              window.location.href = "/courses/intro-quant-analysis/working-with-data/";
            },},{
        id: 'social-bluesky',
        title: 'Bluesky',
        section: 'Socials',
        handler: () => {
          window.open("https://bsky.app/profile/adrober.bsky.social", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%61%72%6F%62%65%72%34%38@%75%72.%72%6F%63%68%65%73%74%65%72.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/adamdnroberts", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=dcDP4LwAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
