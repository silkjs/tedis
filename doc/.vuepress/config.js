module.exports = {
  base: "/",
  locales: {
    "/": {
      lang: "en-US",
      title: "Tedis"
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Tedis"
    }
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/images/favicon.png"
      }
    ],
    [
      "link",
      {
        rel: "manifest",
        href: "/manifest.json"
      }
    ],
    [
      "meta",
      {
        name: "theme-color",
        content: "#3eaf7c"
      }
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-capable",
        content: "yes"
      }
    ],
    [
      "meta",
      {
        name: "apple-mobile-web-app-status-bar-style",
        content: "black"
      }
    ],
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: "/icons/apple-touch-icon-152x152.png"
      }
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png"
      }
    ],
    [
      "meta",
      {
        name: "msapplication-TileColor",
        content: "#000000"
      }
    ]
  ],
  serviceWorker: true,
  evergreen: true,
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    repo: "silkjs/tedis",
    docsDir: "doc",
    docsBranch: "master",
    editLinks: true,
    // displayAllHeaders: true,
    serviceWorker: {
      updatePopup: true,
      updatePopup: {
        message: "文档有更新，现在即可浏览",
        buttonText: "更新"
      }
    },
    locales: {
      "/zh/": {
        label: "简体中文",
        selectText: "多语言",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        nav: [
          {
            text: "文档",
            link: "/zh/guide/"
          },
          {
            text: "API",
            link: "/zh/api/"
          }
          // {
          //   text: "团队",
          //   link: "/team/"
          // },
          // {
          //   text: "支持Tedis",
          //   link: "/support-tedis/"
          // },
          // {
          //   text: "记要",
          //   link: "/log/"
          // }
        ],
        sidebar: {
          "/zh/api/": [
            "",
            "base",
            "pool",
            "key",
            "string",
            "hash",
            "list",
            "set",
            "zset"
          ]
        }
      },
      "/": {
        label: "English",
        selectText: "Translations",
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Last Updated",
        nav: [
          {
            text: "Guide",
            link: "/guide/"
          },
          {
            text: "API",
            link: "/api/"
          }
        ],
        sidebar: {
          "/api/": [
            "",
            "base",
            "pool",
            "key",
            "string",
            "hash",
            "list",
            "set",
            "zset"
          ]
        }
      }
    }
  }
};
