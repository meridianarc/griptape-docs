# Getting Started

This is the first section of a step-by-step guide to start using Griptape.js in your application.

## Installation and setup

Griptape.js is able to work along any front-end UI library out there. Therefore, the first step is to set
up an application in which then you can install Griptape.js. Example of libraries are:

* [Vue.js 3](https://v3.vuejs.org/guide/installation.html)
* [React.js](https://reactjs.org/docs/getting-started.html)

Once you have a front-end application ready, install Griptape.js by running one of the following:

```bash
# Using yarn
yarn add @stakeordie/griptape.js

# or npm
npm install @stakeordie/griptape.js
```

## Gripping an app

A *gripped* application is a term we used to describe an application which bootstrap process is handled by Griptape.
*Grip* your app by adding this to your `main.js` or `index.js` file:

```js
import { gripApp, getKeplrAccountProvider } from '@stakeordie/griptape.js';

const restUrl = 'https://api.stakeordie.com';
const provider = getKeplrAccountProvider();
function runApp() {
  // Bootstrap your app here!
}

gripApp(restUrl, provider, runApp);
```

`runApp` is a function able to bootstrap your front-end application, e.g. for [Vue.js](https://vuejs.org/) the
implementation looks like this:

```js
function runApp() {
  new Vue({
    render: function (h) { return h(App) },
  }).$mount('#app')
}
```

Or in [React](https://reactjs.org/), like this:

```js
function runApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
```

Now you are ready! You can start developing your Dapp.
