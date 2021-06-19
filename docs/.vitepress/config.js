module.exports = {
  title: 'griptape.js',
  description: 'griptape.js is a library for developing Secret Apps on Secret Network',
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]
  ],
  themeConfig: {
    logo: '/favicon.png',
    nav: [
      { text: 'Getting Started', link: '/introduction/getting-started' },
      { text: 'Github', link: 'https://github.com/stakeordie/griptape.js' },
      { text: 'Secret Network', link: 'https://scrt.network/' },
    ],
    editLinks: true,
    editLinkText: 'Suggest changes to this page',
    sidebar: {
      '/': [
        {
          text: 'Introduction',
          children: [
            {
              text: 'What is griptape.js?',
              link: '/introduction/what-is-griptape.html'
            },
            {
              text: 'Getting Started',
              link: '/introduction/getting-started.html',
            },
            {
              text: 'Step by step tutorial',
              link: '/introduction/tutorial.html',
            }
          ],
        },
        {
          text: 'Core Features',
          children: [
            {
              text: 'Overview',
              link: '/core-features/overview.html'
            },
            {
              text: 'Components',
              link: '/core-features/components.html'
            },
            {
              text: 'Stores',
              link: '/core-features/stores.html',
            },
            {
              text: 'Contracts',
              link: '/core-features/contracts.html',
            },
            {
              text: 'Utilities',
              link: '/core-features/utilities.html',
            }
          ],
        }
      ]
    }
  }
}
