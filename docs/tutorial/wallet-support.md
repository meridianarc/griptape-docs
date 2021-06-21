# Adding Wallet Support

Griptape comes with some prewired components that you can include in your app with pretty much no configuration. Currently those two components are:

- `<wallet-info>`
- `<viewing-key-info>`

We will add the `wallet-info` component to the header.

First a we will make one change to add some styling to the site so it looks pretty.

add `import "~/@stakeordie/griptape-vue.js/dist/style.css"` to the `/scr/main.js` file

```javascript {7}
import App from './App.vue'

import '@/assets/styles/index.scss'

import { gripVueJsApp } from '@stakeordie/griptape-vue.js'

import "~/@stakeordie/griptape-vue.js/dist/style.css"

// Griptape config
const conf = {
  restUrl: 'https://api.holodeck.stakeordie.com'
}

// Grip the vue app
gripVueJsApp(conf, App, (app, pinia) => {})
```

And add some markup to `/src/App.vue`

```{html, path=web/src/pages/AboutPage/AboutPage.js}
<template>
  <div>

    <header>

      <div class="logo">Secret Auctions</div>

    </header>

    <main>

    </main>

  </div>
</template>

<script>

</script>

<style>

</style>
```

 Eventually griptape will come with a modular UI system to help rapidly build moderately no ugly sites, but for now just include the `style.css` :)

 With that out of the way all you need to do is add `<wallet-info/>` to `/src/App.vue` like this:

 ```html{5}
 <template>
  <div>
    <header>
      <div class="logo">Secret Auctions</div>
      <wallet-info></wallet-info>
    </header>
  </div>
<template>
```