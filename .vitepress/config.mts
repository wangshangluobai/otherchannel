import { defineConfig, type DefaultTheme } from "vitepress"
import { otherChannel } from "./otherChannel"

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
      "/src/FrontEnd/": { base: "/src/FrontEnd/", items: sidebarFrontEnd() },
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
  // srcDir: "src",
  // outDir: "public",
  // assetsDir: "static",
  // // cacheDir: './cache'
})
function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: "前端",
      link: "/src/FrontEnd/index",
      activeMatch: "/src/FrontEnd/",
    },
  ]
}

function sidebarFrontEnd(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "JavaScript",
      collapsed: false,
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
        { text: "Vue", link: "/JavaScript/Vue/" },
        { text: "Angular", link: "/JavaScript/Angular/" },
      ],
    },
    // ...
  ]
}
