---
description: >-
  In this tutorial we show you how to create Permits for authenticating a
  SNIP-20 contract.
---

# Hello, Permits

## Overview

When you finish this Hello Permit tutorial you will have a web app connected to `pulsar-2` with the ability to query the `sSCRT` balance using permits. Creating permits and connecting the app to `Keplr`.

{% hint style="info" %}
Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-permits)
{% endhint %}

## Requirements

In order to go through this tutorial you'll need to have a React app created. You can find how to do it [here](https://reactjs.org/docs/create-a-new-react-app.html). Also, install your dependencies and install Griptape.

```shell
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

We highly recommend have done `Hello, Griptape` before starting this tutorial for higher understanding of Griptape.

{% content-ref url="hello-griptape.md" %}
[hello-griptape.md](hello-griptape.md)
{% endcontent-ref %}

## Getting started

This tutorial consist of these steps.

1. Grip an application.
2. Creating contract definition.
3. Import neccesary Griptape APIs and Contract Definition.
4. Bootstrap app.
5. Creating Permit .
6. Get Balance.

## Grip an application

As you may know the first thing that we need to do is **Grip** our application, in this case our app is in `src/main.js`. This is how our `main.js` should look like.

```javascript
import  React  from  'react';
import  ReactDOM  from  'react-dom';
import  App  from  './App';
import {
	gripApp,
	getKeplrAccountProvider
} from  '@stakeordie/griptape.js';

const  restUrl = 'https://api.pulsar.griptapejs.com';
const  provider = getKeplrAccountProvider();

function  runApp() {
	ReactDOM.render(
		<React.StrictMode>
			<App  />
		</React.StrictMode>,
		document.getElementById('root')
	);
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

```javascript
import {
createContract,
snip20Def,
extendContract
} from  '@stakeordie/griptape.js';
```

Brief explanation of Griptape APIs imported.

* **createContract :** Help us create an object based on a definition passed in as a parameter.
* **snip20Def :** Is a pre-defined contract definition following Secret Network [reference](https://github.com/SecretFoundation/SNIPs/blob/master/SNIP-20.md).
* **extendContract :** API created to create a single contract definition binding two definition, similarly to inheritance in POO.

### Defining custom contract definition

Defining a custom contract definition, in this case we have a definition with queries where we defined that we want to query the balance for sSCRT using permits.

```javascript
const  sscrt_permit = {
	queries: {
		// Getting permit from context 
		getBalance({ permit }) {
			const  query = { balance: { } }
			//Every time we want to use permits we MUST send a query with this structure
			return { with_permit: { query, permit } }
		}
	}
}
```

{% hint style="info" %}
In a contract definition there are `queries` and `messages`. Both are objects with functions, all these functions are binding internally and always receive its first parameter what we called in Griptape as `Context`. In case you don't need any data from context to do the following. `getBalance( _ , anyParameter,secondaryParameter)`.
{% endhint %}

### Creating contract

Finally we just need to create our contract and export it.

```javascript
export  const  sscrt = createContract({
	id:  'sscrt',
	at:  'secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg',
	definition:  extendContract(snip20Def, sscrt_permit)
});
```

Brief explanation of `createContract` API. This function receives a obj with three values.

* **id :** Custom id you want to called the contract, is up to you but shouldn't be two or more contracts with same ids, this will cause conflicts.
* **at :** Contract address to use.
* **definition :** Contract definition to use, in this case we create one based on Secret Network reference and our custom definition created a step before.

### Final view of sSCRT Contract Definition .

This is what your `src/contracts/sscrt.js` should look like.

```javascript
import {
	createContract,
	snip20Def,
	extendContract
} from  '@stakeordie/griptape.js';  

const  sscrt_permit = {
	queries: {
		getBalance({ permit }) {
			const  query = { balance: {} }
			return {
				with_permit: { query, permit }
			}
		}
	}
}

export  const  sscrt = createContract({
	id:  'sscrt',
	at:  'secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg',
	definition:  extendContract(snip20Def, sscrt_permit)
});
```

## Import Griptape APIs and Contract Definition.

Okay, now that we have **Grip** our app and created our contract definition, let's import some APIs in `src/App.js`.

```javascript
import  React, { useState, useEffect } from  "react";
import {
	bootstrap,
	onAccountAvailable,
	coinConvert,
	enablePermit,
	hasPermit
} from  '@stakeordie/griptape.js';
import { sscrt } from  './contracts/sscrt';
```

**`enablePermit`** help us create a permit very easily and **`hasPermit`** returns a boolean indicating if a contract already has permit or not. All others APIs have already been explain in Hello tutorials before.

We also import our contract `sscrt` we just created in a section before.

## Bootstrap app

Before boostrapping our app, we are going to create some stores using useState hook from React and use one of our events APIs, `onAccountAvailable` explained in tutorials before (more info in `Hello, Events`).

```javascript
	var [loading, setLoading] = useState(false);
	var [loadingBalance, setLoadingBalance] = useState(false);
	var [isPermit, setIsPermit] = useState(false);
	var [coins, setCoins] = useState('');

	useEffect(() => {
		onAccountAvailable(() => {
			setIsPermit(hasPermit(sscrt));
		})
	}, []);
```

As you see we used `hasPermit` Griptape API, this api returns Boolean and receives a contract as parameter which we imported before.

Now, let's create a simple function to connect the app.

```javascript
	const connect = async () => {
		await  bootstrap();
	}
```

## Creating Permit

With Griptape creating a permit is very easy, `enablePermit` is an API that receives two parameters, the first is a contract, in this case the one we imported before (`sscrt`), and a array of permissions to approve, in this case we want to see the `balance`.

{% hint style="info" %}
Possible permissions for a `SNIP-20` contract `"balance"` , `"history"`, `"allowance"`.&#x20;

Possible permissions for a `SNIP-721` contract `"owner"`
{% endhint %}

We are going to create a simple util function to create a permit. like the following.

```javascript
	const  createPermit = async () => {
		setLoading(true);
		try {
			await  enablePermit(sscrt, ["balance"]);
		} catch (e) {
			// ignore for now
		} finally {
			setLoading(false);
		}
	}
```

## Get Balance

To get the balance as easy as create a simple function like this.

```javascript
	const  getBalance = async () => {
		setLoadingBalance(true)
		if (!hasPermit(sscrt)) return;
		
		const  amount = await  sscrt.getBalance();
		const  balance = coinConvert(amount.balance.amount, 6, 'human');
		setCoins(balance);
		setLoadingBalance(false);
	}
```

Finally just show the information:

```html
return (
	<>
		<h1>Hello, Griptape!</h1>
		<p>You have permit?: {isPermit ? 'Yes' : 'No'}</p>
		<p>Your balance is: {coins}</p>
		<button  onClick={connect}>Connect</button>
		<button  onClick={createPermit}  >{loading ? 'Loading...' : 'Create Permit'}</button>
		<button  onClick={getBalance}  >{loadingBalance ? 'Loading...' : 'Get Balance'}		</button>
	</>
);
```

### Final view of `src/App.js`

```javascript
import React, { useState, useEffect } from "react";
import {
  bootstrap,
  onAccountAvailable,
  coinConvert,
  enablePermit,
  hasPermit
} from '@stakeordie/griptape.js';
import { sscrt } from './contracts/sscrt';

function App() {

  var [loading, setLoading] = useState(false);
  var [loadingBalance, setLoadingBalance] = useState(false);
  var [isPermit, setIsPermit] = useState(false);
  var [coins, setCoins] = useState('');

  useEffect(() => {
    onAccountAvailable(() => {
      setIsPermit(hasPermit(sscrt));
    })
  }, []);

  const connect = async () => {
    await bootstrap();
  }

  const getBalance = async () => {

    setLoadingBalance(true)
    if (!hasPermit(sscrt)) return;

    const amount = await sscrt.getBalance();
    const balance = coinConvert(amount.balance.amount, 6, 'human');
    setCoins(balance);
    setLoadingBalance(false);
  }

  const createPermit = async () => {

    setLoading(true);
    try {
      await enablePermit(sscrt, ["balance"]);

    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Hello, Griptape!</h1>
      <p>You have permit?: {isPermit ? 'Yes' : 'No'}</p>
      <p>Your balance is: {coins}</p>
      <button onClick={connect}>Connect</button>
      <button onClick={createPermit} >{loading ? 'Loading...' : 'Create Permit'}</button>
      <button onClick={getBalance} >{loadingBalance ? 'Loading...' : 'Get Balance'}</button>
    </>
  );
}

export default App;
```

{% hint style="info" %}
Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-permits)
{% endhint %}
