# Hello, Events

{% hint style="info" %}
Read the code for this tutorial [here](https://github.com/stakeordie/griptape-tutorials/tree/main/vue/hello-events)
{% endhint %}

### Overview

In this tutorial we are going to build a simple application that will allow you to connect to Keplr, you will also have to create a viewing key to be able to see your balance, just as we have done in other examples. But now we will use events to detect if you switch accounts, which is very important to know.

### Requirements

For this tutorial you will need to have a Vue app created. You can find how to do it [here](https://cli.vuejs.org/guide/creating-a-project.html). Also, install your dependencies and install Griptape:

```bash
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

### Getting Started

This tutorial consist of these steps:

1. Grip your application
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
You can check how to grip your app [here](hello-griptape.md#grip-an-application)
{% endhint %}

### Bootstrap the application

Open up `App.vue` and add a button to bootstrap the application.

{% hint style="info" %}
You can check how to grip your app [here](hello-griptape.md#bootstrap-your-application)
{% endhint %}

### Create a contract definition

In order to interact with a contract, you first need to create its definition. First we need to import `createContract` and `snip20Def` APIs from `@stakeordie/griptape.js`to our file `src/contracts/sscrt.js` Once that is done, we create the definition `sscrt` to which we are going to assign an id that can be the name you want, we are also going to assign an address of instantiated contract on the blockchain.

Finally, Griptape has SNIP-20 compliant contract definitions, so you don't need to write it yourself.

{% code title="src/contracts/sscrt.js" %}
```jsx
import {
  createContract,
  snip20Def
} from '@stakeordie/griptape.js';

export const sscrt = createContract({
  id: 'sscrt',
  at: 'secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg',
  definition: snip20Def
});
```
{% endcode %}

{% hint style="info" %}
Learn more about contract definitions [here](https://docs.griptapejs.com/guide/interacting-with-contracts.html#contract-definitions)
{% endhint %}

### Build the application

To build this application we must import `boostrap`, `viewingKeyManager`, `onAccountAvailable`, `onAccountChange` and `coinConvert` APIs from `@stakeordie/griptape.js`, in addition to importing the definition of the contract `sscrt` that we have just created.

{% code title="src/App.vue" %}
```jsx
import {
  viewingKeyManager,
  coinConvert,
  bootstrap,
  onAccountAvailable,
  onAccountChange
} from '@stakeordie/griptape.js';
import { sscrt } from './contracts/sscrt';
```
{% endcode %}

Now, you may notice that we are using the event `onAccountAvailable`, where you can call the `viewingKeyManager` from our contract `sscrt` to know if we already have a viewing key. If that's the case, the key is assigned to `this.viewingKey` variable.&#x20;

{% code title="src/App.vue" %}
```jsx
onAccountAvailable(async () => {
      this.isConnected = true;
      const key = viewingKeyManager.get(sscrt.at);
      if (key) {
        this.viewingKey = key;
        await this.getBalance();
      }
    });
```
{% endcode %}

Now, in order to detect when changing the account, we have the event `onAccountChange`, then we show an alert that says it has changed the account, and we will assign it the false value to the `this.isAccountChanged` variable.

{% code title="src/App.vue" %}
```jsx
onAccountChange(() => {
    alert("You have changed your account, please refresh this page.");
    this.isAccountChanged = false;
});
```
{% endcode %}

### Viewing Keys

To create a viewing key, we're going to make an asynchronous request to `sscrt.createViewingKey()`, if this doesn't return a response, the function ends. If it is the case and if it returns a response then, we parse the result.&#x20;

Now we send our contract `sscrt` and our  `key`. We also need to check if a viewing key already exists so we can add it by `viewingKeyManager.add()` or replace it by `viewingKeyManager.set()`with the new key.

{% code title="src/App.vue" %}
```jsx
 async createViewingKey() {
      this.loading = true;
      try {
        const result = await sscrt.createViewingKey();
        if (result.isEmpty()) return;
        const { create_viewing_key: { key } } = result.parse();
        const currentKey = viewingKeyManager.get(sscrt.at);
        if (currentKey) {
          viewingKeyManager.set(sscrt, key);
        } else {
          viewingKeyManager.add(sscrt, key);
        }
        this.viewingKey = key;
      } catch (e) {
        // ignore for now
      } finally {
        this.loading = false;
      }
    }
```
{% endcode %}

{% hint style="info" %}
Learn more about viewing keys [here](hello-viewing-keys.md)
{% endhint %}

After having our viewing key, we want to see our balance. For that reason, we create the function `getBalance`, within the function, we can see that we make an asynchronous request to obtain the value of our viewing key.

If we do not have a viewing key the function ends, but if this is the case, where we have a viewing key, then we went to consult our amount In `sscrt.getBalance()`, then we convert our `amount` with the function `coinConvert` where ... and finally we assign the value of `balance` to the variable `this.balance`.

{% code title="src/App.vue" %}
```jsx
async getBalance() {
      const key = viewingKeyManager.get(sscrt.at);
      if (!key) return
      const { balance: { amount } } = await sscrt.getBalance();
      const balance = coinConvert(amount, '6', 'human');
      this.balance = balance;
    }
```
{% endcode %}

Finally, joining all our code we have the full application.

```jsx
<template>
  <div>
     <h1>Hello, Events!</h1>
      <p>Is connected? {{isConnected ? "Yes" : "No"}}</p>
      <button
        @click="connect"
        :disabled="isConnected">
        Bootstrap
      </button>
      <p>Your balance is: {{balance}}</p>
      <button @click="createViewingKey">{{loading ? 'Loading...' : 'Create Viewing Key'}}</button>
      <button :hidden="isAccountChanged" @click="reload">Refresh</button>
  </div>
</template>

<script>
import {
  viewingKeyManager,
  coinConvert,
  bootstrap,
  onAccountAvailable,
  onAccountChange
} from '@stakeordie/griptape.js';
import { sscrt } from './contracts/sscrt';

export default {
  data() {
    return {
      viewingKey: '',
      balance: '',
      loading: false,
      isAccountChanged:true,
      isConnected:false
    }
  },

  mounted() {
    onAccountAvailable(async () => {
      this.isConnected = true;
      const key = viewingKeyManager.get(sscrt.at);
      if (key) {
        this.viewingKey = key;
        await this.getBalance();
      }
    });
    onAccountChange(() => {
      alert("You have changed your account, please refresh this page.");
      this.isAccountChanged = false;
    });
  },

  methods: {
    reload(){
      window.location.reload()
    },
    async createViewingKey() {
      this.loading = true;

      try {
        const result = await sscrt.createViewingKey();

        if (result.isEmpty()) return;

        const { create_viewing_key: { key } } = result.parse();
        const currentKey = viewingKeyManager.get(sscrt.at);
        
        if (currentKey) {
          viewingKeyManager.set(sscrt, key);
        } else {
          viewingKeyManager.add(sscrt, key);
        }
        this.viewingKey = key;
      } catch (e) {
        // ignore for now
      } finally {
        this.loading = false;
      }
    },
    async connect() {
      await bootstrap();
    },

    async getBalance() {
      const key = viewingKeyManager.get(sscrt.at);
      
      if (!key) return;

      const { balance: { amount } } = await sscrt.getBalance();
      const balance = coinConvert(amount, '6', 'human');
      this.balance = balance;
    }
  }
}
</script>
```
