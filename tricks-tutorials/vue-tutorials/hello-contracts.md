# Hello, Contracts

{% hint style="info" %}
Read the code for this tutorial [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-contracts)
{% endhint %}

### Overview

In this tutorial we are going to build an application, in which you will be able to connect to \[], learn to define a contract on \[], also interact with it in a simple way to increment a counter and finally get the value of the counter.

### Requirements

For this tutorial you will need to have a Vue created. You can find how to do it <mark style="color:red;">here</mark>. Also, install your dependencies and install Griptape:

```bash
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

### Getting Started

This tutorial consist of these steps:

1. Grip you application
2. Bootstrap the application
3. Create a contract definition
4. Build the application

### Grip your application

Go to the `main.js` and import `gripApp` and `getKeplrAccountProvider` from `@stakeordie/griptape.js` package.

{% code title="main.js" %}
```jsx
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';
```
{% endcode %}

{% hint style="info" %}
<mark style="color:red;">You can check how to grip your app, Here</mark>
{% endhint %}

### Bootstrap the application

Open up `App.vue` and add a button to bootstrap the application.

{% hint style="info" %}
<mark style="color:red;">You can check how to grip your app, Here</mark>
{% endhint %}

### Create a contract definition

If we go to the `contracts/counter.js` file, you can see that the first thing we need to do is import `createContract` from `@stakeordie/griptape.js`. Thus begins the definition of our contract.

{% code title="contracts/counter.js" %}
```javascript
import {
  createContract
} from '@stakeordie/griptape.js';
```
{% endcode %}

After that, we need to create the contract definition called `counterDef` the contract definition includes the `messages` part, which is everything we are going to write in the blockchain and the `queries` part, basically everything we are going to read from the blockchain.

{% code title="src/contracts/counter.js" %}
```js
const counterDef = {
  messages: {
    incrementCount() {
      const handleMsg = {
        increment: {}
      };
      return { handleMsg };
    }
  },

  queries: {
    getCount() {
      return { get_count: {} };
    }
  }
};
```
{% endcode %}

Finally, we are going to create and export your `counter Contract` using the `createContact` API, which we are going to send...

{% code title="src/contracts/counter.js" %}
```js
export const counterContract = createContract({
  id: 'counter',
  at: 'secret1vk6j69amm37zkhgqgtvjkymjeee4yhxvmmyxja',
  definition: counterDef
});
```
{% endcode %}

Once we have performed the steps above, the code should be seen as follows:

{% code title="src/contracts/counter.js" %}
```jsx
import { createContract } from '@stakeordie/griptape.js';

const counterDef = {
  messages: {
    incrementCount() {
      const handleMsg = {
        increment: {}
      };
      return { handleMsg };
    }
  },
  queries: {
    getCount() {
      return { get_count: {} };
    }
  }
};

export const counterContract = createContract({
  id: 'counter',
  at: 'secret1vk6j69amm37zkhgqgtvjkymjeee4yhxvmmyxja',
  definition: counterDef
});

```
{% endcode %}

### Build the application

To start building our application, first we need to import the contract that we created a few steps before `countercontract` from `'./contracts/counter'`. Then we need to import `Bootstrap` and `onaccountavailable` from `"@ stakeordie / griptape.js"`.

{% code title="src/App.vue" %}
```jsx
import { counterContract } from './contracts/counter';
import { bootstrap } from '@stakeordie/griptape.js'
```
{% endcode %}

Now we are going to build the `getCount` function, which contains an asynchronous request to the contract `counterContract` in which it specifically requests the `getCount` query, once we have the response of this request, we can assign the value to `setCount` state.

{% code title="App.vue" %}
```jsx
async getCount() {
      const response = await counterContract.getCount();
      this.count = response.count;
    }
```
{% endcode %}

Now we are going to create the `incrementCount` function that asynchronously makes the `incrementCount` request to the `counterContract` contract and returns the result of it.

{% code title="App.vue" %}
```jsx
async incrementCount() {
      this.loading = true;
      await counterContract.incrementCount();
      this.loading = false;
    }
```
{% endcode %}

And adding \[] to our application we can see the full `src/App.js` code:

{% code title="App.js" %}
```jsx
<template>
  <div>
    <h1>Hello, Griptape!</h1>
    <p>Your count is: {{ count }}</p>
    <button @click="connect">Connect</button>
    <button @click="getCount">Get count</button>
    <button @click="incrementCount">
      <span v-if="loading">Loading...</span>
      <span v-else>Increment by 1</span>
    </button>
  </div>
</template>

<script>
import { counterContract } from './contracts/counter';
import { bootstrap } from '@stakeordie/griptape.js';

export default {
  data: () => ({
    count: '',
    loading: false
  }),

  methods: {
    async getCount() {
      const response = await counterContract.getCount();
      this.count = response.count;
    },
    async connect() {
      await bootstrap();
    },

    async incrementCount() {
      this.loading = true;
      await counterContract.incrementCount();
      this.loading = false;
    }
  }
}
</script>
```
{% endcode %}

