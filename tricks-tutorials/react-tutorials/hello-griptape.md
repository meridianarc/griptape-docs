---
description: >-
  In this landing section, we walk you step by step through a basic
  implementation using Griptape.js and its main APIs
---

# Hello, Griptape

## Overview

When you finish this Hello Griptape tutorial you will have a web app connected to `pulsar-2` with the ability to get the user's balance and address, as well as a button to connect in case the user hasn't connected yet.

{% hint style="info" %}
Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-griptape)
{% endhint %}

## Requirements

In order to go through this tutorial you'll need to have a React app created. You can find how to do it [here](https://reactjs.org/docs/create-a-new-react-app.html). Also, install your dependencies and install Griptape.

```shell
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

## Getting started

This tutorial consists of these steps:

1. Grip an application.
2. Bootstrap the application.
3. Import neccesary APIs from Griptape.
4. Get and render the user's address and balance.

## Grip an application

**`Grip`** an application means involving our app into **Griptape**. This helps **Griptape** to control the different states an application can go through, trigger events, get balances and get wallet address properly. In order to **grip** the application go to `src/main.js` and import `gripApp` and `getKeplrAccountProvider` from `@stakeordie/griptape.js` as the follow.

```javascript
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';
```

{% hint style="warning" %}
We assumed you are using **Keplr** as wallet. Griptape has only support with Keplr at this point. The Griptape team is working looking froward to support as many wallets as the Cosmos Ecosystem requires.
{% endhint %}

Now, as you may know, we need a REST URL to connect to `pulsar-2`, let's add it.

```javascript
const  restUrl = 'https://api.pulsar.griptapejs.com';
```

Ok, we're good. Now let's get the Keplr provider.

```javascript
const  provider = getKeplrAccountProvider();
```

We are almost getting it. Now we going to move our React app into a function, as the example below.

```javascript
function  runApp() {
	//React app here
	ReactDOM.render(
		<React.StrictMode>
			<App  />
		</React.StrictMode>,
		document.getElementById('root')
	);
}
```

> In case you have any other dependencies that need to wrap your app such as React Router, Redux or similar should be wrapping your app here. **Griptape** won't affect any state manager or third party library.

Now we just need to execute `gripApp` from **Griptape** as the following code.

```typescript
gripApp(restUrl, provider, runApp);
```

## Bootstrap your application

Now that we have your gripped our application we need to **bootstrap** it. Bootstrapping creates a `signing client` able to encrypt and decrypt transactions. If you don't **bootstrap** the app we won't be able to get the wallet address and execute messages.

Now on, let's move to start working in `src/App.js`. As our first step we need to import `bootstrap` api from `@stakeordie/griptape.js`. Copy the example below.

```javascript
import { bootstrap } from '@stakeordie/griptape.js';
```

Then we are going to create a util function called `connect`.

```javascript
const  connect = async () => {
	await  bootstrap();
}
```

Right next to it just create a button and add the function.

```html
return (
	<>
		<h1>Hello, Griptape!</h1>
		<button  onClick={connect}>Connect</button>
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

Let's get our hands dirty a bit! It's time to actually show something interesting for example the balance and address of the wallet. First some hooks to store the data.

```javascript
import  React, { useState, useEffect } from  "react";
//all griptape.js imports here...

function  App() {
	var [address, setAddress] = useState('');
	var [coins, setCoins] = useState(undefined);
	// more code here
}
```

> We are going to assume you created the stores from this section in next code example.

Next, let's create a re-usable function to get the native balance .

```javascript
const  getBalance = async () => {
	var  balance = await  getNativeCoinBalance();
	balance = coinConvert(balance, 6, 'human');
	setCoins(balance);
}
```

Now, we are going to add one of our events API `onAccountAvailable` to get the balance and address when the user connects its wallet.

```javascript
useEffect(() => {
	onAccountAvailable(() => {
		setAddress(getAddress());
		getBalance();
	})
}, []);
```

Finally just show the information.

```html
return (
	<>
		<h1>Hello, Griptape!</h1>
		<button  onClick={connect}>Connect</button>
		<p>Your address is: {address}</p>
		<p>Your balance is: {coins}</p>
	</>
);
```

{% hint style="info" %}
Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-griptape)
{% endhint %}
