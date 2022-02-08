---
description: >-
  Hello, Transactions is a tutorial that teaches you how send messages using
  Griptape.
---

# Hello, Transactions

{% hint style="info" %}
read the code for this tutorial [here](https://github.com/stakeordie/griptape-tutorials/tree/main/vue/hello-transactions)
{% endhint %}

## Overview

This tutorial walks you through creating an application that sends a SNIP-20 tokens from the selected wallet to another one. You will learn how to use the SNIP-20 built-in definition and how to set up a simple architecture for your contracts in general.

## Requirements

In order to go through this tutorial you'll need to have a Vue created. You can find how to do it [here](https://cli.vuejs.org/guide/creating-a-project.html). Also, install your dependencies and install Griptape:

```shell
# With npm
npm  install  &&  npm  install @stakeordie/griptape.js

# With yarn
yarn  &&  yarn  add @stakeordie/griptape.js
```

## Getting Started

This tutorial consist of these steps:

1. Grip your application
2. Bootstrap the application
3. Create a SNIP-20 client contract
4. Create a viewing key for the SNIP-20 token
5. Display current token balance
6. Create form to execute a message that sends tokens

## Grip your application

Go to the `src/main.js` and import gripApp and getKeplrAccountProvider from `@stakeordie/griptape.js` package.

```javascript
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

## Bootstrap the application

Open up `src/App.js` and add a button to bootstrap the application.

```html
<template>
  <div>
    <h1>Hello, Transactions!</h1>
    <button @click="connect" :disabled="isConnected">Connect</button>
  </div>
</template>

<script>
import {
  bootstrap,
  onAccountAvailable,
  onViewingKeyCreated,
  viewingKeyManager,
  coinConvert,
} from "@stakeordie/griptape.js";
export default {
  data: () => ({
    isConnected: false,
    removeOnAccountAvailable: null,
    removeOnViewingKeyCreated: null,
  }),
  mounted() {
    this.removeOnAccountAvailable = onAccountAvailable(() => {
      this.isConnected = true;
    });
  },
  unmounted() {
    this.removeOnAccountAvailable();
  },
  methods: {
    async connect() {
      await bootstrap();
    },
}
</script>
```

## Create a SNIP-20 client contract

Create a new directory in the `src` directory called `contracts` and add a new file called `sscrt.js`. This will the contract we will be interacting with.

```javascript
import {
  createContractClient,
  snip20Def
} from "@stakeordie/griptape.js";

export const sscrt = createContractClient({
  id: "sscrt",
  at: "secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg",
  definition: snip20Def
});
```

## Create a viewing key for the SNIP-20 token

Create a button that create and sets a new viewing key for the SNIP-20 token. Set the viewing key using the `viewingKeyManager` object by importing it.

```html
<template>
  <div>
    <h1>Hello, Transactions!</h1>
    <p>Is connected? {{ isConnected ? "Yes" : "No" }}</p>
    <p>Has viewing key? {{ hasViewingKey() ? "Yes" : "No" }}</p>
    <button @click="connect" :disabled="isConnected">Connect</button>
    <button
      @click="createViewingKey"
      :disabled="isMessageLoading || hasViewingKey() || !isConnected"
    >
      Create Viewing Key
    </button>
  </div>
</template>

<script>
import {
  bootstrap,
  onAccountAvailable,
  onViewingKeyCreated,
  viewingKeyManager,
  coinConvert,
} from "@stakeordie/griptape.js";
import { sscrt } from "../contracts/sscrt";

export default {
  data: () => ({
    isConnected: false,
    isMessageLoading: false,
    isQueryLoading: false,
    balance: "",
    address: "",
    amount: "",
    removeOnAccountAvailable: null,
    removeOnViewingKeyCreated: null,
  }),

  mounted() {
    this.removeOnAccountAvailable = onAccountAvailable(() => {
      this.isConnected = true;
      this.hasViewingKey();
    });

    this.removeOnViewingKeyCreated = onViewingKeyCreated(() => {
      this.hasViewingKey();
    });
  },

  unmounted() {
    this.removeOnAccountAvailable();
    this.removeOnViewingKeyCreated();
  },

  methods: {
    async connect() {
      await bootstrap();
    },
    hasViewingKey() {
      const key = viewingKeyManager.get(sscrt.at);
      return typeof key !== "undefined";
    },
    async createViewingKey() {
      this.isMessageLoading = true;

      try {
        const result = await sscrt.createViewingKey();
        if (result.isEmpty()) return;
        const {
          create_viewing_key: { key },
        } = result.parse();
        viewingKeyManager.add(sscrt, key);
      } finally {
        this.isMessageLoading = false;
      }
    },
  },
};
</script>
```

## Display current account token balance

Create a button and bind a click event to a function that queries the token balance of the `sscrt` client contract.

```html
<template>
  <div>
    <h1>Hello, Transactions!</h1>
    <p>Is connected? {{ isConnected ? "Yes" : "No" }}</p>
    <p>Has viewing key? {{ hasViewingKey() ? "Yes" : "No" }}</p>
    <p>SNIP-20 Token Balance: {{ balance }}</p>
    <button @click="connect" :disabled="isConnected">Connect</button>
    <button
      @click="createViewingKey"
      :disabled="isMessageLoading || hasViewingKey() || !isConnected"
    >
      Create Viewing Key
    </button>
    <button @click="getBalance" @disabled="isQueryLoading">Get Balance</button>
  </div>
</template>

<script>
import {
  bootstrap,
  onAccountAvailable,
  onViewingKeyCreated,
  viewingKeyManager,
  coinConvert,
} from "@stakeordie/griptape.js";
import { sscrt } from "../contracts/sscrt";

export default {
  data: () => ({
    isConnected: false,
    isMessageLoading: false,
    isQueryLoading: false,
    balance: "",
    address: "",
    amount: "",
    removeOnAccountAvailable: null,
    removeOnViewingKeyCreated: null,
  }),

  mounted() {
    this.removeOnAccountAvailable = onAccountAvailable(() => {
      this.isConnected = true;
      this.hasViewingKey();
    });

    this.removeOnViewingKeyCreated = onViewingKeyCreated(() => {
      this.hasViewingKey();
    });
  },

  unmounted() {
    this.removeOnAccountAvailable();
    this.removeOnViewingKeyCreated();
  },

  methods: {
    async connect() {
      await bootstrap();
    },
    hasViewingKey() {
      const key = viewingKeyManager.get(sscrt.at);
      return typeof key !== "undefined";
    },
    async createViewingKey() {
      this.isMessageLoading = true;

      try {
        const result = await sscrt.createViewingKey();
        if (result.isEmpty()) return;
        const {
          create_viewing_key: { key },
        } = result.parse();
        viewingKeyManager.add(sscrt, key);
      } finally {
        this.isMessageLoading = false;
      }
    },
    async getBalance() {
      if (!this.hasViewingKey()) return;

      this.isQueryLoading = true;
      try {
        const {
          balance: { amount: result },
        } = await sscrt.getBalance();
        const amount = coinConvert(result, 6, "human");
        this.balance = amount;
      } finally {
        this.isQueryLoading = false;
      }
    }
  },
};
</script>
```

## Create form to execute a message that sends tokens

Create a form to input an address and an amount and execute the `send` message on the `sscrt` contract.

```html
<template>
  <div>
    <h1>Hello, Transactions!</h1>
    <p>Is connected? {{ isConnected ? "Yes" : "No" }}</p>
    <p>Has viewing key? {{ hasViewingKey() ? "Yes" : "No" }}</p>
    <p>SNIP-20 Token Balance: {{ balance }}</p>
    <button @click="connect" :disabled="isConnected">Connect</button>
    <button
      @click="createViewingKey"
      :disabled="isMessageLoading || hasViewingKey() || !isConnected"
    >
      Create Viewing Key
    </button>
    <button @click="getBalance" @disabled="isQueryLoading">Get Balance</button>
    <form @submit="sendTokens">
      <input
        type="text"
        placeholder="Address to send to"
        @change="(e) => (this.address = e.target.value)"
        :value="address"
      />
      <input
        type="number"
        placeholder="Amount to send"
        @change="(e) => (this.amount = e.target.value)"
        :value="amount"
      />
      <button :disabled="isMessageLoading">Send tokens</button>
    </form>
  </div>
</template>

<script>
import {
  bootstrap,
  onAccountAvailable,
  onViewingKeyCreated,
  viewingKeyManager,
  coinConvert,
} from "@stakeordie/griptape.js";
import { sscrt } from "../contracts/sscrt";

export default {
  data: () => ({
    isConnected: false,
    isMessageLoading: false,
    isQueryLoading: false,
    balance: "",
    address: "",
    amount: "",
    removeOnAccountAvailable: null,
    removeOnViewingKeyCreated: null,
  }),

  mounted() {
    this.removeOnAccountAvailable = onAccountAvailable(() => {
      this.isConnected = true;
      this.hasViewingKey();
    });

    this.removeOnViewingKeyCreated = onViewingKeyCreated(() => {
      this.hasViewingKey();
    });
  },

  unmounted() {
    this.removeOnAccountAvailable();
    this.removeOnViewingKeyCreated();
  },

  methods: {
    async connect() {
      await bootstrap();
    },
    hasViewingKey() {
      const key = viewingKeyManager.get(sscrt.at);
      return typeof key !== "undefined";
    },
    async createViewingKey() {
      this.isMessageLoading = true;

      try {
        const result = await sscrt.createViewingKey();
        if (result.isEmpty()) return;
        const {
          create_viewing_key: { key },
        } = result.parse();
        viewingKeyManager.add(sscrt, key);
      } finally {
        this.isMessageLoading = false;
      }
    },
    async getBalance() {
      if (!this.hasViewingKey()) return;

      this.isQueryLoading = true;
      try {
        const {
          balance: { amount: result },
        } = await sscrt.getBalance();
        const amount = coinConvert(result, 6, "human");
        this.balance = amount;
      } finally {
        this.isQueryLoading = false;
      }
    },
    async sendTokens(e) {
      e.preventDefault();

      if (!this.address || !this.amount) return;

      this.isMessageLoading = true;

      try {
        const theAmount = coinConvert(this.amount, 6, "machine");
        await sscrt.send(this.address, theAmount);
        this.address = "";
        this.amount = "";
      } finally {
        this.isMessageLoading = false;
      }
    },
  },
};
</script>
```
