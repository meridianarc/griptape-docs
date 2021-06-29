# Overview

As you might notice, Griptape takes control over how your application gets bootstraped. This is important, due to the
fact that many of the core features of Griptape are built upon the *convention over configuration* principle. It
provides with all you need to connect to the Secret Network blockchain.

## Gripping an app

A *gripped application* is the term we use to refer to a Vue instance application that has been instantiated by using
the `gripVueJsApp` method.

### Basic example

This is the most basic configuration to grip an application in which you need two things to get your application
working: A **root Vue component** and a **configuration object**:

```js
import Root from './Root.vue'
import { gripVueJsApp } from '@stakeordie/griptape-vue.js'

const conf = {
  restUrl: 'https://api.stakeordie.com'
}

gripVueJsApp(conf, Root)
```

The `conf` object defines the REST URL of the node you want to connect to.

### Access Vue instance

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
