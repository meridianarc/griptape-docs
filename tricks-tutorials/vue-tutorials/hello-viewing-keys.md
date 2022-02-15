# Hello, Viewing Keys

## Overview

In this tutorial we show you how to create [viewing keys](https://scrt.network/about/secret-tokens-bridges#what-are-viewing-keys) for authenticating a SNIP-20 contract. When you finish this Hello Viewing Keys tutorial you will have a web app connected to `pulsar-2` with the ability to query the `sSCRT` balance using viewing keys, creating viewing keys and connecting the app to `Keplr`.

> Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/vue/hello-viewing-keys)

## Requirements

In order to go through this tutorial you'll need to have a Vue app created. You can find how to do it [here](https://cli.vuejs.org/guide/creating-a-project.html). Also, install your dependencies and install Griptape.

```typescript
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

We highly recommend have done `Hello, Contracts` and `Hello, Griptape` before starting this tutorial for higher understanding of Griptape.

## Getting started

This tutorial consist of these steps.

1. Grip an application.
2. Creating contract definition.
3. Import necessary Griptape APIs and Contract Definition.
4. Bootstrap app.
5. Creating Permit.
6. Get Balance.

> Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/vue/hello-viewing-keys)

### Grip an application

As you may know the first thing that we need to do is _grip_ our application, in this case our app is in `src/main.js`. This is how our `main.js` should look like.

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';

const restUrl = 'https://api.pulsar.griptapejs.com';
const provider = getKeplrAccountProvider();
function runApp() {
  createApp(App)
    .mount('#app')
}

gripApp(restUrl, provider, runApp);
```

## Creating contract definition

Let's create a folder named **`contracts`** inside contracts, let's create a file called `sscrt.js`. You can copy and paste the next command.

```shell
mkdir contracts && touch ./contracts/sscrt.js
```

### Importing APIs in `src/contracts/sscrt.js`

Now let's move and start working in `src/contracts/sscrt.js`, we need to import some APIs from Griptape.

```typescript
import {
  createContractClient,
  snip20Def
} from '@stakeordie/griptape.js';
```

Brief explanation of Griptape APIs imported.

* **createContractClient :** Help us create an object based on a definition passed in as a parameter.
* **snip20Def :** Is a pre-defined contract definition following Secret Network [reference](https://github.com/SecretFoundation/SNIPs/blob/master/SNIP-20.md).

### Creating contract

Finally we just need to create our contract and export it.

```typescript
export const sscrt = createContractClient({
  id: 'sscrt',
  at: 'secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg',
  definition: snip20Def
});
```

Brief explanation of `createContractClient` API. This function receives a obj with three values.

* **id :** Custom id you want to called the contract, is up to you but shouldn't be two or more contracts with same ids, this will cause conflicts.
* **at :** Contract address to use.
* **definition :** Contract definition to use, in this case we use a pre-defined from Griptape.

### Final view of sSCRT Contract Definition .

This is what your `src/contracts/sscrt.js` should look like.

```typescript
import {
  createContractClient,
  snip20Def
} from '@stakeordie/griptape.js';

export const sscrt = createContractClient({
  id: 'sscrt',
  at: 'secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg',
  definition: snip20Def
});
```

## Import Griptape APIs and Contract Definition.

Okay, now that we have **Grip** our app and created our contract definition, let's import some APIs in `src/App.vue`.

```typescript
import {
	viewingKeyManager,
	coinConvert,
	bootstrap,
	onAccountAvailable
} from  '@stakeordie/griptape.js';
import { sscrt } from  './contracts/sscrt';
```

**`viewingKeyManager`** help us create and get viewing key in a very easy way. We also import our contract `sscrt` we just created in a section before.

## Bootstrap app

Before bootstrapping our app, we are going to define what our data object should look like and use one of our events APIs, `onAccountAvailable` explained in tutorials before (more info in `Hello, Events`).

```javascript
export default {
  data() {
    return {
      viewingKey: '',
      balance: '',
      loading: false,
      isConnected: false,
      removeOnAccountAvailable:null
    }
  },

  mounted() {
    this.removeOnAccountAvailable = onAccountAvailable(() => {
      this.isConnected = true;
      const key = viewingKeyManager.get(sscrt.at);
      if (key) {
        this.viewingKey = key;
      }
    });
  },

  unmounted(){
    this.removeOnAccountAvailable();
  }
}
```

`viewingKeyManager` is one of the APIs created for viewing key management, this has many internal functions such as `get`,`add` and `set`. `get` receives one parameter the identifier of the contract we want to get the viewing key, could be the contract address like in this case or the contract id. `add` and `set` receive two parameters a contract in this case `sscrt` and a viewing key, we will see a example later.

Now, let's create a simple function to connect the app.

```typescript
export default {
	// ...data
	//...mounted
	methods:{
		async  connect() {
			await  bootstrap();
		},
	}
}
```

## Creating Viewing Key

With Griptape creating a permit is very easy, `viewingKeyManager` is an API that has many functions such as `add` which receives two parameters, the first is a contract, in this case the one we imported before (`sscrt`), and the second parameter is a string (viewing key).

We are going to create a simple util function to create a viewing key. like the following.

```typescript
export default {
	// ...data
	//...mounted
	methods:{
		// ... more methods
		async createViewingKey() {
	      this.loading = true;
	      try {
	        // Execute `create_viewing_key` message on sscrt contract.
	        const result = await sscrt.createViewingKey();
	        // Validate if response is empty.
	        if (result.isEmpty()) return;
	        // In case is not empty, parse the result.
	        const { create_viewing_key: { key } } = result.parse();
	        // Check if there's already a viewing key.
	        const currentKey = viewingKeyManager.get(sscrt.at);
	        // If there is, update the viewing key using the `set`
	        // function. Otherwise, add it.
	        if (currentKey) {
	          viewingKeyManager.set(sscrt, key);
	        } else {
	          viewingKeyManager.add(sscrt, key);
	        }
	        // Update UI.
	        this.viewingKey = key;
	      } catch (e) {
	        // ignore for now
	      } finally {
	        this.loading = false;
	      }
	    },
	}
}
```

## Get Balance

In order to get the balance of a SNIP-20 you must provide a viewing key and as you see in the example below we don't pass in any viewing key, Griptape already does it internally, like magic!

```typescript
export default {
	// ...data
	//...mounted
	methods:{
		// ... more methods
		async getBalance() {
	      // Get the viewing key from the manager.
	      const key = viewingKeyManager.get(sscrt.at);

	      // Do nothing if we don't have a viewing key.
	      if (!key) return;

	      // In case we have a viewing key, fetch the balance.
	      const { balance: { amount } } = await sscrt.getBalance();
	      const balance = coinConvert(amount, '6', 'human');
	      this.balance = balance;
	    }
	}
}
```

Finally just show the information.

```html
<template>
  <div>
    <h1>Hello, Viewing Keys!</h1>
    <p>Is connected? {{isConnected ? "Yes" : "No"}}</p>
    <button @click="connect">Bootstrap</button>
    <p>Your viewing key is: {{ viewingKey }}</p>
    <p>Your balance is: {{ balance }}</p>
    <button :disabled="!isConnected"  @click="createViewingKey">
      <span v-if="loading">Loading...</span>
      <span  v-else>Create Viewing Key</span>
    </button>
    <button :disabled="!viewingKey" @click="getBalance">Get balance</button>
  </div>
</template>
```

### Final view of `src/App.vue`

```javascript
<template>
  <div>
    <h1>Hello, Viewing Keys!</h1>
    <p>Is connected? {{isConnected ? "Yes" : "No"}}</p>
    <button @click="connect">Bootstrap</button>
    <p>Your viewing key is: {{ viewingKey }}</p>
    <p>Your balance is: {{ balance }}</p>
    <button :disabled="!isConnected"  @click="createViewingKey">
      <span v-if="loading">Loading...</span>
      <span  v-else>Create Viewing Key</span>
    </button>
    <button :disabled="!viewingKey" @click="getBalance">Get balance</button>
  </div>
</template>

<script>
import {
  viewingKeyManager,
  coinConvert,
  bootstrap,
  onAccountAvailable
} from '@stakeordie/griptape.js';
import { sscrt } from './contracts/sscrt';

export default {
  data() {
    return {
      viewingKey: '',
      balance: '',
      loading: false,
      isConnected: false,
      removeOnAccountAvailable:null
    }
  },

 mounted() {
    this.removeOnAccountAvailable = onAccountAvailable(() => {
      this.isConnected = true;
      const key = viewingKeyManager.get(sscrt.at);
      if (key) {
        this.viewingKey = key;
      }
    });
  },
  unmounted(){
    this.removeOnAccountAvailable();
  },

  methods: {
    async createViewingKey() {
      this.loading = true;

      try {
        // Execute `create_viewing_key` message on sscrt contract.
        const result = await sscrt.createViewingKey();

        // Validate if response is empty.
        if (result.isEmpty()) return;

        // In case is not empty, parse the result.
        const { create_viewing_key: { key } } = result.parse();

        // Check if there's already a viewing key.
        const currentKey = viewingKeyManager.get(sscrt.at);

        // If there is, update the viewing key using the `set`
        // function. Otherwise, add it.
        if (currentKey) {
          viewingKeyManager.set(sscrt, key);
        } else {
          viewingKeyManager.add(sscrt, key);
        }

        // Update UI.
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
      // Get the viewing key from the manager.
      const key = viewingKeyManager.get(sscrt.at);

      // Do nothing if we don't have a viewing key.
      if (!key) return;

      // In case we have a viewing key, fetch the balance.
      const { balance: { amount } } = await sscrt.getBalance();
      const balance = coinConvert(amount, '6', 'human');
      this.balance = balance;
    }
  }
}
</script>
```

> Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/vue/hello-viewing-keys)
