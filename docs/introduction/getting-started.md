# Getting Started

## Installation

Install griptape.js with your preferred package manager:

```bash
yarn add @stakeordie/griptape-vue.js

// or with npm

npm install @stakeordie/griptape-vue.js
```

Or use our starter project:

```bash
degit https://github.com/stakeordie/griptape-vue-starter
```

## Setup your app

Griptape is written using [vite](https://vitejs.dev/). All examples shown in
this docs are using vite.

Griptape takes care of managing your application for you, by gripping it.
Usually this done in the `main.*` file:

```js
// Root app component
import App from './App.vue'

// Default styling
import '~/@stakeordie/griptape-vue.js/dist/style.css';

// Import `gripVueJsApp`
import { gripVueJsApp } from '@stakeordie/griptape-vue.js'

const conf = {
  restUrl: 'https://api.holodeck.stakeordie.com'
}

// Grip your app, you are now ready to develop your application
gripVueJsApp(conf, App)
```

That's it! You are now ready to go!
