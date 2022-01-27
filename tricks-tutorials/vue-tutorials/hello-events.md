# Hello, Events

### Overview



### Requirements

For this tutorial you will need to have a Vue app created. You can find how to do it <mark style="color:red;">here</mark>. Also, install your dependencies and install Griptape:

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
<mark style="color:red;">You can check how to grip your app, Here</mark>
{% endhint %}

### Bootstrap the application

Open up `App.vue` and add a button to bootstrap the application.

{% hint style="info" %}
<mark style="color:red;">You can check how to grip your app, Here</mark>
{% endhint %}

### Create a contract definition

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

### Build the application

To build this application, we must import `bootstrap`, `viewingKeyManager`, `onAccountAvailable`, `onAccountChange` and `coinConvert` APIs from `@stakeordie/griptape.js`, in addition to importing the definition of the contract `sscrt` that we have just created.

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

Now, you may notice that we are using the event `onAccountAvailable` <mark style="color:red;">it is...</mark>, where you can call the `viewingKeyManager` from our contract `sscrt` to know if we already have a viewing key. If that's the case, the key is assigned to `setViewingKey` state and the function `getBalance` is called, <mark style="color:red;">of which we will talk later.</mark>

{% code title="src/App.vue" %}
```jsx
onAccountAvailable(() => {
      const key = viewingKeyManager.get(sscrt.at);
      if (key) {
        this.viewingKey = key;
      }
    });
```
{% endcode %}

Now, in order to detect when changing the account, we have the event `onAccountChange`, <mark style="color:red;">which serves ...</mark> Then we show an alert that says it has changed the account, and we will assign it the false value to the `setIsAccountChanged` state.

{% code title="src/App.js" %}
```jsx
nAccountChange(() => {
    alert("You have changed your account, please refresh this page.");
    this.isAccountChanged = false;
});
```
{% endcode %}

viewing keys...

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
to see viewing keys here
{% endhint %}

After having our viewing key, we want to see our balance. For that reason, we create the function `getBalance`, within the function, we can see that we make an asynchronous request to obtain the value of our viewing key.

If we do not have a viewing key the function ends, but if this is the case, where we have a viewing key, then we went to consult our amount In `sscrt.getBalance()`, then we convert our `amount` with the function `coinConvert` where ... and finally we assign the value of `balance` the state `setCoins`.

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
    <h1>Hello, Griptape!</h1>
    <p>Your viewing key is: {{ viewingKey }}</p>
    <p>Your balance is: {{ balance }}</p>
    <button @click="connect">Connect</button>
    <button @click="createViewingKey">
      <span v-if="loading">Loading...</span>
      <span v-else>Create Viewing Key</span>
    </button>
    <button @click="getBalance">Get balance</button>
    <br>
    <br>
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
    }
  },

  mounted() {
    onAccountAvailable(() => {
      const key = viewingKeyManager.get(sscrt.at);
      if (key) {
        this.viewingKey = key;
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
