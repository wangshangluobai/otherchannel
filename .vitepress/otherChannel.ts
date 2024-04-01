import { defineConfig, type DefaultTheme } from "vitepress"

export const otherChannel = defineConfig({
  title: "knowledge-base",
  description: "my learning records",
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/FrontEnd/": {
        base: "/FrontEnd/",
        items: sidebarFrontEnd(),
      },
    },
  },
  srcDir: "src",
})
function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "FrontEnd", link: "/src/FrontEnd/", activeMatch: "/FrontEnd/" },
    { text: "FrontEnd", link: "/FrontEnd/", activeMatch: "/FrontEnd/" },
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
