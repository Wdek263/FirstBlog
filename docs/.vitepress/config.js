// .vitepress/config.js
import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';

import CreatePages from './utils/create-pages';

const getConfig = async () => {
  return withMermaid(
    defineConfig({
      title: 'Dong',
      base: '/',
      lang: 'zh-CN',
      description: 'Dong’log',
      outDir: '../dist',
      titleTemplate: 'blog',
      head: [
        ['link', {rel:'icon', type: 'image/svg+xml', href:'/logo.svg'}],
        ['link', {rel:'stylesheet', href:'/index.css'}]
      ],
      themeConfig: {
        outlineTitle: '目录',
        pages: await CreatePages(),
        nav: [
        { text: '标签', link: '/tags' },
        ],
      },
      // your existing vitepress config...
      // optionally, you can pass MermaidConfig
      mermaid: {
        // refer https://mermaid-js.github.io/mermaid/#/Setup for options
      },
    })
  );
}

export default getConfig()
