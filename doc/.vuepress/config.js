module.exports = {
  base: "/",
  locales: {
    "/": {
      lang: "zh-CN",
      title: "Tedis",
      description: "tedis 文档"
    },
    "/en/": {
      lang: "en-US",
      title: "Tedis",
      description: "tedis guide"
    }
  },
  head: [
    ["link", {
      rel: "icon",
      href: "/favicon.png"
    }],
    ["link", {
      rel: "manifest",
      href: "/manifest.json"
    }],
    ["meta", {
      name: "theme-color",
      content: "#3eaf7c"
    }],
    ["meta", {
      name: "apple-mobile-web-app-capable",
      content: "yes"
    }],
    ["meta", {
      name: "apple-mobile-web-app-status-bar-style",
      content: "black"
    }],
    ["link", {
      rel: "apple-touch-icon",
      href: "/icons/apple-touch-icon-152x152.png"
    }],
    ["meta", {
      name: "msapplication-TileImage",
      content: "/icons/msapplication-icon-144x144.png"
    }],
    ["meta", {
      name: "msapplication-TileColor",
      content: "#000000"
    }]
  ],
  serviceWorker: true,
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    repo: "dasoncheng/redis-typescript",
    docsDir: "doc",
    docsBranch: "dev",
    editLinks: true,
    displayAllHeaders: true,
    locales: {
      "/": {
        label: "简体中文",
        selectText: "多语言",
        editLinkText: "在 GitHub 上编辑此页",
        lastUpdated: "上次更新",
        nav: [{
          text: "指南",
          link: "/guide/"
        },
        {
          text: "API",
          link: "/api/"
        }
        ],
        sidebar: {
          "/guide/": [
            "",
            "getting-started",
          ],
          "/api/": [],
          "/": [],
        }
      },
      "/en/": {
        label: "English",
        selectText: "Translations",
        editLinkText: "Edit this page on GitHub",
        lastUpdated: "Last Updated",
      }
    }
  }
};
