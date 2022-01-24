# Hello, Griptape

## Overview

In this landing section, we walk you step by step through a basic implementation using Griptapejs and its main APIs.

**What is going to be built?** When you finish this Hello Griptape you will have a web app connected to `pulsar-1` with the ability to get the user's balance and address, as well as a button to connect in case the user hasn't connected yet.

**Wha are the high levels steps to do it?**

1. Grip an application.
2. Boostrap the application.
3. Import neccesary APIs.
4. Get and render the user's address and balance.

**Full example:** [**https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-griptape**](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-griptape)

## Grip an application

**`Grip`** an application means involved our app into **Griptape**. This helps **Griptape** to control the different states an application can go throught, trigger events, get balances and wallet address properly. In order to **grip** the application go to `src/main.js` and import `gripApp` and `getKeplrAccountProvider` from `@stakeordie/griptape.js` as the follow :

```javascript
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';
```

> :memo: **Note:** We assumed you are using **Keplr** as wallet. Griptape has only support with Keplr, looking forward to support as many wallets as the Cosmos Ecosystem requires.

Now, as you may know we need a rest url to connect to, let's add it :

```javascript
const  restUrl = 'https://api.pulsar.griptapejs.com';
```

Ok, we good. now let's get Keplr provider :

```javascript
const  provider = getKeplrAccountProvider();
```

We are almost get it, now we going to move our React app into a callbackable function,

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

> :memo: **Note:** In case you have any other depency that needs to wrap your app such as React Router, Redux or similar should be wrapping your app here. **Griptape** won't affect any state manager or third party library.

Now we just need to execute `gripApp` from **Griptape** as the following code:

```javascript
gripApp(restUrl, provider, runApp);
```

## Boostrap your application

Now that we have your gripped our application we need to **boostrap** it. Boostrap creates a `signing client` able to encrypt and decrypt transaccions. If don't **boostrap** the app we won't be available to get the wallet address and do transactions.

Now on, let's move to start working in `src/App.js`. As our first step we need to import `boostrap` api from `@stakeordie/griptape.js`. Copy the example below:

```javascript
import { bootstrap } from '@stakeordie/griptape.js';
```

Then we are going to create a util funtion called `connect`:

```javascript
const  connect = async () => {
	await  bootstrap();
}
```

Right next to it just create a button and add the function :

```html
return (
	<>
		<h1>Hello, Griptape!</h1>
		<button  onClick={connect}>Connect</button>
	<>
)
```

## Import neccesary APIs from Griptape

Now as we want to get our `SCRT` balance we need to import **`getNativeCoinBalance`** from Griptape. **`getAddress`** for getting the wallet address. **`onAccountAvailable`** is part of our events API triggers a function when the app is you execute the **boostrap** API (more info in `hello-events` ). And we also need a util funtion called **`coinConvert`** is used to parsed any balance to human decimals readable. Our Griptape final imports should look like the following:

```javascript
import {
	bootstrap,
	getAddress,
	onAccountAvailable,
	getNativeCoinBalance,
	coinConvertjava
} from  '@stakeordie/griptape.js';
```

## Get and render the user's address and balance

Let's get our hand dirty a bit, it's time to actually show something insteresting should as the balance and address of the wallet. First some hooks to store the data.

```javascript
import  React, { useState, useEffect } from  "react";
//all griptape.js imports here...

function  App() {
	var [address, setAddress] = useState('');
	var [coins, setCoins] = useState(undefined);
	// more code here
}
```

> :memo: **Note:** we are going to assume you created the hooks from this section in futures examples.

Next, let's create a re-usable function to get the native balance :

```javascript
const  getBalance = async () => {
	var  balance = await  getNativeCoinBalance();
	balance = coinConvert(balance, 6, 'human');
	setCoins(balance);
}
```

Now, we are going to add one of our events `onAccountAvailable` to get the balance and address when the user connects its wallet:

```javascript
useEffect(() => {
	onAccountAvailable(() => {
		setAddress(getAddress());
		getBalance();
	})
}, []);
```

Finally just show the information:

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

**Checkout the full example in our repo:** [**https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-griptape**](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-griptape)
