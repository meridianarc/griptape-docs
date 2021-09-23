module.exports = {
  title: 'Griptape.js',
  description: 'Griptape.js is an opinionated, web application front-end framework for developing Dapps in Secret Network.',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  ],
  themeConfig: {
    logo: '/favicon.png',
    repo: 'https://github.com/stakeordie/griptape-docs',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Want to contribute to this page? Click here!',
    nav: [
      { text: 'Getting Started', link: '/introduction/getting-started' },
      { text: 'Secret Network', link: 'https://scrt.network' },
    ],
    sidebar: {
      '/': [
        {
          text: 'Introduction',
          children: [
            {
              text: 'What is Griptape.js?',
              link: '/'
            },
          ],
        },
        {
          text: 'Guide',
          children: [
            {
              text: 'Getting Started',
              link: '/introduction/getting-started',
            },
            {
              text: 'Interacting with Contracts',
              link: '/guide/interacting-with-contracts',
            },
          ],
        },
        {
          text: 'API Reference',
          children: [
            {
              text: 'Cheatsheet',
              link: '/api/cheatsheet'
            },
          ]
        },
        {
          text: 'Development Updates',
          children: [
            {
              text: 'Index',
              link: '/updates/index'
            },
            {
              text: '2021-08-06',
              link: '/updates/2021-08-06'
            },
            {
              text: '2021-08-13',
              link: '/updates/2021-08-13'
            },
            {
              text: '2021-08-20',
              link: '/updates/2021-08-20'
            },
            {
              text: '2021-08-26',
              link: '/updates/2021-08-26'
            },
            {
              text: '2021-09-02',
              link: '/updates/2021-09-02'
            },
            {
              text: '2021-09-09',
              link: '/updates/2021-09-09'
            },
            {
              text: 'Updates 2021-09-17',
              link: '/updates/2021-09-17'
            },
            {
              text: 'Updates 2021-09-23',
              link: '/updates/2021-09-23'
            },
          ]
        }
      ]
    }
  },
  markdown: {
    config: (md) => {
      md.use(require('markdown-it-codetabs'))
    }
  }
}
