---
description: >-
  In this landing section, we walk you step by step through a basic
  implementation using Griptapejs and its main APIs.
---

# Hello, Griptape

## Overview

When you finish this Hello Griptape you will have a web app connected to `pulsar-2` with the ability to get the user's balance and address, as well as a button to connect in case the user hasn't connected yet.

{% hint style="info" %}
Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/vue/hello-griptape)
{% endhint %}

## Requirements

In order to go through this tutorial you'll need to have a Vue app created. You can find how to do it [here](https://cli.vuejs.org/guide/creating-a-project.html). Also, install your dependencies and install Griptape.

```shell
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

## Getting started

This tutorial consist of these steps.

1. Grip an application.
2. Bootstrap the application.
3. Import neccesary APIs.
4. Get and render the user's address and balance.

## Grip an application

**`Grip`** an application means involved our app into **Griptape**. This helps **Griptape** to control the different states an application can go through, trigger events, get balances and wallet address properly. In order to **grip** the application go to `src/main.js` and import `gripApp` and `getKeplrAccountProvider` from `@stakeordie/griptape.js` as the follow.

```javascript
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';
```

{% hint style="info" %}
We assumed you are using **Keplr** as wallet. Griptape has only support with Keplr at this point. The Griptape team is working looking froward to support as many wallets as the Cosmos Ecosystem requires
{% endhint %}

Now, as you may know we need a REST URL to connect to, let's add it.

```javascript
const  restUrl = 'https://api.pulsar.griptapejs.com';
```

Ok, we good. now let's get Keplr provider.

```javascript
const  provider = getKeplrAccountProvider();
```

We are almost get it, now we going to move our Vue app into a function, as the example below.

```javascript
function  runApp() {
	createApp(App)
		.mount('#app');
}
```

Now we just need to execute `gripApp` from **Griptape** as the following code.

```javascript
gripApp(restUrl, provider, runApp);
```

## Bootstrap your application

Now that we have your gripped our application we need to **bootstrap** it. Bootstrap creates a `signing client` able to encrypt and decrypt transactions. If you don't **bootstrap** the app we won't be able to get the wallet address and execute messages.

Now on, let's move to start working in `src/App.vue`. As our first step we need to import `bootstrap` api from `@stakeordie/griptape.js`. Copy the example below.

```javascript
import { bootstrap } from '@stakeordie/griptape.js';
```

Then we are going to create a util function called `connect` and paste into `methods` object.

```javascript
export default {
	methods:{
		async  connect() {
			await  bootstrap();
		},
	}
}
```

Right next to it just create a button and add the function.

```html
return (
	<>
		<h1>Hello, Griptape!</h1>
		<button @click="connect">Connect</button>
	<>
)
```

## Import neccesary APIs from Griptape

Now as we want to get our `SCRT` balance we need to import **`getNativeCoinBalance`** from Griptape. **`getAddress`** for getting the wallet address. **`onAccountAvailable`** is part of our events API triggers a function when **bootstrap** API is executed (more info in `hello-events` ). And we also need a util function called **`coinConvert`** is used to parsed any balance to human decimals readable. Our Griptape final imports should look like the following.

```javascript
import {
	bootstrap,
	getAddress,
	onAccountAvailable,
	getNativeCoinBalance,
	coinConvert
} from  '@stakeordie/griptape.js';
```

## Get and render the user's address and balance

Let's get our hands dirty a bit! It's time to actually show something interesting for example the balance and address of the wallet. First let's set our data structure.

```javascript
//all griptape.js imports here...

export  default {
  data() {
    return {
      address: '',
      balance: '',
      isConnected: false,
      removeOnAccountAvailable: null, 
    }
  }
  // ...methods
},
```

Next, let's create a re-usable function to get the native balance, this function should be in the `methods` object.

```javascript
export default{
	//...data
	methods:{
		async  setBalance() {
			const  balance = await  getNativeCoinBalance();
			this.balance = coinConvert(balance, 6, 'human');
		},
		//more methods
	}
}
```

Now, we are going to add one of our events API `onAccountAvailable` to get the balance and address when the user connects its wallet.

```javascript
export default{
	//... data
        mounted() {
          this.removeOnAccountAvailable = onAccountAvailable(() => {
            this.isConnected=true;
            this.address = getAddress();
            this.setBalance();
          });
        },
      
        unmounted(){
          this.removeOnAccountAvailable();
        },
	//... methods
}
```

Finally just show the information.

```html
<template>
  <div>
    <h1>Hello, Griptape!</h1>
    <p>Is connected? {{isConnected ? "Yes" : "No"}}</p>
    <button @click="connect">Connect</button>
    <p>Your address is: {{ address }}</p>
    <p>You balance is: {{ balance }}</p>
  </div>
</template>
```

{% hint style="info" %}
Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/vue/hello-griptape)
{% endhint %}
