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
      { text: 'Discord', link: 'https://discord.gg/Z8wRUuyrPr' },
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
              text: 'Bootstraping Your App',
              link: '/guide/bootstraping-your-app',
            },
            {
              text: 'Interacting with Contracts',
              link: '/guide/interacting-with-contracts',
            },
            {
              text: 'Managing Viewing Keys',
              link: '/guide/managing-viewing-keys',
            },
            {
              text: 'Handling Events',
              link: '/guide/events',
            },
            {
              text: 'Using Utilities',
              link: '/guide/utilities',
            },
          ],
        },
        {
          text: 'Development Updates',
          children: [
            {
              text: 'Office Hours',
              link: '/updates/index'
            }
          ]
        }
      ]
    }
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(require('markdown-it-codetabs'))
    }
  }
}
