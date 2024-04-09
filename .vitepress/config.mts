import { defineConfig, type DefaultTheme } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  // locales: {
  //   root: { label: "oc", ...otherChannel },
  // },
  title: "Knowledge-base",
  description: "my learning records",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),
    // 最多嵌套六级
    sidebar: {
      "/FrontEnd/": { base: "/FrontEnd/", items: sidebarFrontEnd() },
      "/BackEnd/": { base: "/BackEnd/", items: sidebarBackEnd() },
      "/Tools/": { base: "/Tools/", items: sidebarTools() },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/wangshangluobai" },
    ],
  },
  // markdown: {
  //   container: {
  //     tipLabel: "提示",
  //     warningLabel: "警告",
  //     dangerLabel: "危险",
  //     infoLabel: "信息",
  //     detailsLabel: "详细信息",
  //   },
  //   image: {
  //     // 默认禁用图片懒加载
  //     lazyLoading: true,
  //   },
  //   // markdown-it-anchor 的选项
  //   // https://github.com/valeriangalliat/markdown-it-anchor#usage
  //   anchor: {
  //     // permalink: markdownItAnchor.permalink.headerLink()
  //   },
  //   // @mdit-vue/plugin-toc 的选项
  //   // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
  //   toc: { level: [1, 2] },
  //   config: (md) => {
  //     // 使用更多的 Markdown-it 插件！
  //     // md.use(markdownItFoo)
  //   },
  // },
  srcDir: "src",
  // outDir: "public",
  // assetsDir: "static",
  // // cacheDir: './cache'
})
function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "前端",
      link: "/FrontEnd/index",
      activeMatch: "/FrontEnd/",
    },
    {
      text: "后端",
      link: "/BackEnd/index",
      activeMatch: "/BackEnd/",
    },
    {
      text: "工具",
      link: "/Tools/index",
      activeMatch: "/Tools/",
    },
  ]
}

function sidebarFrontEnd(): DefaultTheme.SidebarItem[] {
  // const res = await import.meta
  // console.log(111, res)
  return [
    {
      text: "JavaScript",
      collapsed: false,
      link: "/JavaScript/",
      items: [
        {
          text: "常用语法集",
          link: "/JavaScript/CommonSyntax/index",
        },
        {
          text: "高级语法集",
          link: "/JavaScript/AdvancedSyntax/",
        },
        { text: "React", link: "/JavaScript/React/" },
        {
          text: "Vue",
          link: "/JavaScript/Vue/",
          items: [
            {
              text: "性能优化",
              link: "/JavaScript/Vue/VueApplicationPerformanceOptimization",
            },
          ],
        },
        { text: "Angular", link: "/JavaScript/Angular/" },
      ],
    },
    {
      text: "NPM",
      collapsed: false,
      link: "/NodePackageManager/",
      items: [
        {
          text: "NVM",
          link: "/NodePackageManager/NodejsVersionManagement/",
        },
        {
          text: "pnpm",
          link: "/NodePackageManager/pnpm/",
        },
        {
          text: "yarn",
          link: "/NodePackageManager/yarn/",
          items: [
            {
              text: "安装依赖网路报错",
              link: "/NodePackageManager/yarn/installThrowError",
            },
          ],
        },
      ],
    },
    {
      text: "Prettier",
      link: "/Prettier/",
    },
    // ...
  ]
}

function sidebarBackEnd(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Java",
      collapsed: false,
      items: [],
    },
    {
      text: "NodeJS",
      collapsed: false,
      items: [],
    },
    {
      text: "My Batis-Plus",
      collapsed: false,
      link: "/MyBatis-Plus/",
      items: [],
    },
    {
      text: "SQL",
      collapsed: false,
      link: "/StructuredQueryLanguage/",
      items: [
        {
          text: "不同数据库语法差异",
          link: "/StructuredQueryLanguage/DiffDatabases",
        },
      ],
    },
  ]
}

function sidebarTools(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Git",
      collapsed: false,
      items: [
        {
          text: "SSH链接本地与远程仓库",
          link: "/Git/localLinkRemotesBySSH",
        },
      ],
    },
    {
      text: "网站书签",
      collapsed: false,
      items: [
        {
          text: "技术文档",
          link: "/Bookmark/Docs",
        },
      ],
    },
  ]
}
