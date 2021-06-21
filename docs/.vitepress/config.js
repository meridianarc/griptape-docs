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
              text: 'Welcome to Griptape',
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
              text: 'Some Styles',
              link: '/tutorial/styling-to-make-pretty'
            },
            {
              text: 'Add Wallet & Test Reactivity',
              link: '/tutorial/wallet-support'
            },
            {
              text: 'The Contract',
              link: '/tutorial/the-contract'
            },
          ]
        },
        {
          text:'Tutorial (Coming Soon)',
          children: [
            {
              text: 'Viewing Key Support',

            },
            {
              text: 'Private State',

            },
            {
              text: 'wSecretJS & the scrtClient',
              
            },
            {
              text: 'Messages'

            },
            {
              text: 'Condutor: Reactivity & Orchestration'
            }
          ]
        }
      ]
    }
  }
}
