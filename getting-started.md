---
description: Getting started with Griptape
---

# 🛹 Getting Started

This is the first section of a step-by-step guide so you can start using Griptape in your application.

### Introduction

Griptape is a framework for developing decentralized web applications in Secret Network. Griptape will take care mostly of what all of the application has in common, in an opinionated and structured way. Here is a summary of some of the main features of Griptape:

* Connect a regular web application to the blockchain
* Interact with deployed contracts on Secret Network
* Define architecture for your application
* Handle Viewing Keys and Permits to access private state on a contract
* Rapidly interact with SNIP-20 and SNIP-721 compliant contracts

Now that you understand the domain of Griptape, then let's start learning about how to use it.

### Installation and Setup

Griptape.js can work along any front-end UI library out there. Therefore, the first step is to set up an application in which you can then install Griptape.js. Examples of libraries are:

* [Vue.js](https://v3.vuejs.org/guide/installation.html)
* [React.js](https://reactjs.org/docs/getting-started.html)

Once you have a front-end application ready, install Griptape.js by running one of the following:

```bash
# Using yarn
yarn add @stakeordie/griptape.js

# or npm
npm install @stakeordie/griptape.js
```

### Gripping an App

A [_gripped_ ](broken-reference)application is a term we use to describe an application whose bootstrap process is handled by Griptape. _Grip_ your app by adding this to your `main.js` or `index.js` file:

```typescript
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';

const restUrl = 'https://api.stakeordie.com';
const provider = getKeplrAccountProvider();
function runApp() {
  // Bootstrap your app here!
}

gripApp(restUrl, provider, runApp);
```

`runApp` is a function able to bootstrap your front-end application, e.g. for [Vue.js](https://vuejs.org) the implementation looks like this:

```typescript
function runApp() {
  createApp(App).mount('#app');
}
```

Or in [React](https://reactjs.org), like this:

```typescript
function runApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
```

Now you are ready! You can start developing your dApp.
