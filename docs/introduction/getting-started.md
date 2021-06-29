# Getting Started

## Installation

Install griptape.js with your preferred package manager:

```bash
yarn add @stakeordie/griptape-vue.js

// or with npm

npm install @stakeordie/griptape-vue.js
```

Or use our starter project by scaffolding with [degit](https://github.com/Rich-Harris/degit):

```bash
degit https://github.com/stakeordie/griptape-vue-starter my-griptape-starter
```
## Set up your app

*Grip* your app by adding this to your `main.js` file:

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
gripVueJsApp(conf, App, (app, pinia) => {})
```

That's it! You are now ready to go!
