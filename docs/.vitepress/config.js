module.exports = {
  title: 'griptape.js',
  description: 'griptape.js is a library for developing Secret Apps on Secret Network',
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
              text: 'What is griptape.js?',
              link: '/'
            },
            {
              text: 'Getting Started',
              link: '/introduction/getting-started',
            }
          ],
        },
        {
          text: 'Core Features',
          children: [
            {
              text: 'Overview',
              link: '/core-features/overview'
            },
            {
              text: 'Components',
              link: '/core-features/components'
            },
            {
              text: 'State',
              link: '/core-features/state',
            },
            {
              text: 'Contracts',
              link: '/core-features/contracts',
            },
            {
              text: 'Utilities',
              link: '/core-features/utilities',
            }
          ],
        },
        {
          text: 'Tutorial',
          children: [
            {
              text: 'Welcome to Griptape.js',
              link: '/tutorial/welcome-to-griptape'
            },
            {
              text: 'Prerequisites',
              link: '/tutorial/prerequisites'
            },
            {
              text: 'Installation & Setup',
              link: '/tutorial/installation-and-setup'
            },
            {
              text: 'Styling',
              link: '/tutorial/styling-to-make-pretty'
            },
            {
              text: 'Part 1',
              children: [
                {
                  text: 'Wallet Support',
                  link: '/tutorial/wallet-support'
                },
                {
                  text: 'wSecretJS',
                  link: '/tutorial/wsecretjs'
                },
                {
                  text: 'Griptape Contract',
                  link: '/tutorial/griptape-contract'
                },
                {
                  text: 'My First Contract Store',
                  link: '/tutorial/first-contract-store'
                }
              ]
            },
            {
              text:'Part 2',
              children: [
                {
                  text: 'Part 2 Introduction',
                  link: '/tutorial/part-two-introduction'
                }
              ]
            }
          ]
        },
        {
          text: 'Current Development Updates',
          children: [
            {
              text: 'Index',
              link: '/updates/index'
            },
            {
              text: 'Updates 2021-08-06',
              link: '/updates/2021-08-06'
            },
            {
              text: 'Updates 2021-08-13',
              link: '/updates/2021-08-13'
            },
            {
              text: 'Updates 2021-08-20',
              link: '/updates/2021-08-20'
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
