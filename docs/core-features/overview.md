# Overview

## Gripping an app

A *gripped* application is the term we use to refer to a Vue instance application that has been instantiated by using
the `gripVueJsApp` method.

### Basic example

This is the most basic configuration to *grip* an application in which you need two things to get your application
working: a **root Vue component** and a **configuration object**:

```js
import Root from './Root.vue'
import { gripVueJsApp } from '@stakeordie/griptape-vue.js'

const conf = {
  restUrl: 'https://api.stakeordie.com'
}

gripVueJsApp(conf, Root)
```

The `conf` object defines the REST URL of the node you want to connect to.

### Access vue instance

You can access and configure the created Vue instance by adding a callback fuction as last parameter of
`gripVueJsApp`:

```js
import Root from './Root.vue'
import { gripVueJsApp } from '@stakeordie/griptape-vue.js'

// Import `vue-router`
import router from './router'

// Import a custom component
import MyCustomComponent from './MyCustomComponent.vue'

const conf = {
  restUrl: 'https://api.stakeordie.com'
}

gripVueJsApp(conf, Root, (app) => {

  // Add global components
  app.component('MyCustomComponent', MyCustomComponent)

  // Install plugins
  app.use(router)

  // Define some global properties
  app.config.globalProperties.myKey = 'myKey'

})
```

### Access pinia instance

As with the Vue instance, you can access Pinia by setting a second parameter to the callback function:

```js
import Root from './Root.vue'
import { gripVueJsApp } from '@stakeordie/griptape-vue.js'

// Import `vue-router`
import router from './router'

// Import a custom component
import MyCustomComponent from './MyCustomComponent.vue'

const conf = {
  restUrl: 'https://api.stakeordie.com'
}

gripVueJsApp(conf, Root, (app, pinia) => {

  // Add a pinia plugin
  let subs = null
  pinia.use(({ store }) => {
    subs = store.subscribe(() => { ... })
  })

})
```

### Connecting to Secret Network testnet

When conecting to a testnet node, you are able to tell Griptape to suggest a chain to Keplr in order integrate a
non-native testnet chain the the Keplr extension.

To do this, simply add to the configuration  a RPC url and set the `isExperimental` property to true, to enable this
feature.

```js
const conf = {
  restUrl: 'https://api.holodeck.stakeordie.com',
  rpcUrl: 'https://rpc.holodeck.stakeordie.com',
  isExperimental: true
}
```

This is implemented using the [Keplr suggest chain](https://docs.keplr.app/api/suggest-chain.html) feature of Keplr.
