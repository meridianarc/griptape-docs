# Hello, Viewing Keys

{% hint style="info" %}
Read the code for this tutorial [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-viewing-keys)
{% endhint %}

### Overview

In this tutorial we are going to learn how to build an application that allows you to connect to Keplr, once connected you can create your viewing key and finally get your account balance.

### Requirements

In order to go through this tutorial you'll need to have a React app created. You can find how to do it [here](https://reactjs.org/docs/create-a-new-react-app.html). Also, install your dependencies and install Griptape.

```bash
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

### Getting started

This tutorial consist of these steps:

1. Grip you application
2. Bootstrap the application
3. Create a contract definition
4. Build the app

### Grip your application

Go to the `src/index.js` and import `gripApp` and `getKeplrAccountProvider` from `@stakeordie/griptape.js` package.

{% code title="src/index.js" %}
```jsx
import {
  gripApp,
  getKeplrAccountProvider
} from "@stakeordie/griptape.js";
```
{% endcode %}

{% hint style="info" %}
You can check how to grip your app [here](../vue-tutorials/hello-griptape.md#grip-an-application)
{% endhint %}

### Bootstrap the application

Open up `src/App.js` and add a button to bootstrap the application.

{% code title="src/App.js" %}
```jsx
<>
    <h1>Hello, Viewing Keys!</h1>
    <p>Is connected? { isConnected ? "Yes": "No" }</p>
    <button
      onClick={() => bootstrap()}
      disabled={isConnected}>Bootstrap
    </button>
</>
```
{% endcode %}

{% hint style="info" %}
You can check how to boostrap your app [here](../vue-tutorials/hello-griptape.md#bootstrap-your-application)
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

To start building our application, we need to import `bootstrap`, `viewingKeyManager`, `onAccountAvailable`and `coinConvert` APIs from `@stakeordie/griptape.js` and also import the contract definition we just made `sscrt` from `"./contracts/sscrt"`.

{% code title="src/App.js" %}
```jsx
import {
  bootstrap,
  viewingKeyManager,
  onAccountAvailable,
  coinConvert
} from '@stakeordie/griptape.js';
import { sscrt } from './contracts/sscrt';
```
{% endcode %}

We now see that we are using the `onAccountAvailable` event which you can read more about [here](broken-reference). Inside our event we query the `viewingKeyManager` with our address contract `sscrt.at`, after that if a key already exists we assign it to state `setViewingKey`.

{% code title="src/App.js" %}
```jsx
    onAccountAvailable(() => {
      const key = viewingKeyManager.get(sscrt.at);
      if (key) {
        setViewingKey(key);
      }
    })
```
{% endcode %}

To create a viewing key, we're going to make an asynchronous request to `sscrt.createViewingKey()`, if this doesn't return a response, the function ends. If it is the case and if it returns a response then, we parse the result. Now we send our contract `sscrt` and our  `key`. We also need to check if a viewing key already exists so we can add it by `viewingKeyManager.add()` or replace it by `viewingKeyManager.set()`with the new key.

{% code title="src/App.js" %}
```jsx
const createViewingKey = async () => {

    setLoading(true);
    try {
      const result = await sscrt.createViewingKey();

      if (result.isEmpty()) return;

      const { create_viewing_key: { key } } = result.parse();
      viewingKeyManager.add(sscrt, key);
      setViewingKey(key);
      const currentKey = viewingKeyManager.get(sscrt.at);
     
      if (currentKey) {
        viewingKeyManager.set(sscrt, key);
      } else {
        viewingKeyManager.add(sscrt, key);
      }
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false);
    }

  }
```
{% endcode %}

After having our viewing key, we want to see our balance. For that reason, we create the function `getBalance`, within the function, we can see that we make an asynchronous request to obtain the value of our viewing key.

If we do not have a viewing key the function ends, but if this is the case, where we have a viewing key, then we went to consult our amount In `sscrt.getBalance()`, then we convert our `amount` with the function `coinConvert` where <mark style="color:red;">...</mark> and finally we assign the value of `balance` the state `setCoins`.

{% code title="src/App.js" %}
```jsx
const getBalance = async () => {
    const key = viewingKeyManager.get(sscrt.at);
    if (!key) return;
    const amount = await sscrt.getBalance();
    const balance = coinConvert(amount.balance.amount, 6, 'human');
    setCoins(balance);
  }
```
{% endcode %}

And this is what our full application should look like, adding a bit of JSX.

{% code title="src/App.js" %}
```jsx
import React, { useState, useEffect } from "react";
import {
  bootstrap,
  viewingKeyManager,
  onAccountAvailable,
  coinConvert
} from '@stakeordie/griptape.js';
import { sscrt } from './contracts/sscrt';

function App() {

  var [loading, setLoading] = useState(false);
  var [coins, setCoins] = useState('');
  var [viewingKey, setViewingKey] = useState('');
  var [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    onAccountAvailable(() => {
      setIsConnected(true);
      const key = viewingKeyManager.get(sscrt.at);
      if (key) {
        setViewingKey(key);
      }
    })
  }, []);

  const createViewingKey = async () => {

    setLoading(true);
    try {
      const result = await sscrt.createViewingKey();

      if (result.isEmpty()) return;

      const { create_viewing_key: { key } } = result.parse();
      viewingKeyManager.add(sscrt, key);
      setViewingKey(key);
      const currentKey = viewingKeyManager.get(sscrt.at);

      if (currentKey) {
        viewingKeyManager.set(sscrt, key);
      } else {
        viewingKeyManager.add(sscrt, key);
      }
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false);
    }

  }

  const getBalance = async () => {
    const key = viewingKeyManager.get(sscrt.at);
    if (!key) return;
    const amount = await sscrt.getBalance();
    const balance = coinConvert(amount.balance.amount, 6, 'human');
    setCoins(balance);
  }

  return (
    <>
      <h1>Hello, Viewing Keys!</h1>
      <p>Is connected? {isConnected ? "Yes" : "No"}</p>
      <button
        onClick={() => { bootstrap(); }}
        disabled={isConnected}>Bootstrap
      </button>
      <p>Your viewing key is: {viewingKey}</p>
      <p>Your balance is: {coins}</p>
      <button disabled={!isConnected} onClick={() => { createViewingKey(); }}>{loading ? 'Loading...' : 'Create Viewing Key'}</button>
      <button disabled={!viewingKey} onClick={() => { getBalance(); }}>Get balance</button>
    </>
  );
}

export default App;
```
{% endcode %}
