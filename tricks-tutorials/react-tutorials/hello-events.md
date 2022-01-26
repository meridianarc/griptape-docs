# Hello, Events

{% hint style="info" %}
Read the code for this tutorial [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-contracts)
{% endhint %}

### Overview



### Requirements

For this tutorial you will need to have a React created. You can find how to do it [here](https://reactjs.org/docs/create-a-new-react-app.html). Also, install your dependencies and install Griptape:

```bash
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

### Getting started

This tutorial consist of these steps:

1. Grip you application
2. Boostrap the application
3. Create a contract definition
4. Build the application

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
<mark style="color:red;">You can check how to grip your app, Here</mark>
{% endhint %}

### Boostrap the application

Open up `src/App.js` and add a button to bootstrap the application.

{% code title="src/App.js" %}
```jsx
<>
    <h1>Hello, Events!</h1>
    <p>Is connected? { isConnected ? "Yes": "No" }</p>
    <button
      onClick={() => bootstrap()}
      disabled={isConnected}>Bootstrap
    </button>
</>
```
{% endcode %}

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

To build this application, we must import `boostrap`, `viewingKeyManager`, `onAccountAvailable`, `onAccountChange` and `coinConvert` APIs from `@stakeordie/griptape.js`, in addition to importing the definition of the contract `sscrt` that we have just created.

{% code title="src/App.js" %}
```jsx
import {
  bootstrap,
  viewingKeyManager,
  onAccountAvailable,
  coinConvert,
  onAccountChange
} from '@stakeordie/griptape.js';
import { sscrt } from './contracts/sscrt';
```
{% endcode %}

Now, you may notice that we are using the event `onAccountAvailable` <mark style="color:red;">it is...</mark>, where you can call the `viewingKeyManager` from our contract `sscrt` to know if we already have a viewingbkey. If that's the case, the key is assigned to `setViewingKey` state and the function `getBalance` is called, of which we will talk later.

{% code title="src/App.js" %}
```jsx
onAccountAvailable(() => {
  const key = viewingKeyManager.get(sscrt.at);
  if (key) {
    setViewingKey(key);
    getBalance();
 }})
```
{% endcode %}

Now, in order to detect when changing the account, we have the event `onAccountChange`, <mark style="color:red;">which serves ...</mark> Then we show an alert that says it has changed the account, and we will assign it the false value to the `setIsAccountChanged` state.

{% code title="src/App.js" %}
```jsx
onAccountChange(() => {
    alert("You have changed your account, please refresh this page.")
    setIsAccountChanged(false);
});
```
{% endcode %}

viewinkeys...

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

{% hint style="info" %}
to see viewing keys here
{% endhint %}

After having our viewing key, we want to see our balance. For that reason, we create the function `getBalance`, within the function, we can see that we make an asynchronous request to obtain the value of our viewing key.

If we do not have a viewing key the function ends, but if this is the case, where we have a viewing key, then we went to consult our amount In `sscrt.getBalance()`, then we convert our `amount` with the function `coinConvert` where ... and finally we assign the value of `balance` the state `setCoins`.

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

Finally, joining all our code, and adding a bit of JSX we have the full application.

```jsx
import React, { useState, useEffect } from "react";
import {
  bootstrap,
  viewingKeyManager,
  onAccountAvailable,
  coinConvert,
  onAccountChange
} from '@stakeordie/griptape.js';
import { sscrt } from './contracts/sscrt';

function App() {

  var [loading, setLoading] = useState(false);
  var [coins, setCoins] = useState('');
  var [viewingKey, setViewingKey] = useState('');
  var [isAccountChanged, setIsAccountChanged] = useState(true);

  useEffect(() => {
    onAccountAvailable(() => {
      const key = viewingKeyManager.get(sscrt.at);
      if (key) {
        setViewingKey(key);
        getBalance();
      }
    });

    onAccountChange(() => {
      alert("You have changed your account, please refresh this page.")
      setIsAccountChanged(false);
    });
  }, []);

  const getBalance = async () => {
    const key = viewingKeyManager.get(sscrt.at);
    if (!key) return;
    const amount = await sscrt.getBalance();
    const balance = coinConvert(amount.balance.amount, 6, 'human');
    setCoins(balance);
  }

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
      <h1>Hello, Events!</h1>
      <p>Your balance is: {coins}</p>
      <button onClick={() => { bootstrap() }}>Connect</button>
      <button onClick={() => { createViewingKey() }}>{loading ? 'Loading...' : 'Create Viewing Key'}</button>
      <button hidden={isAccountChanged} onClick={() => { window.location.reload(); }}>Refresh</button>
    </>
  );
}

export default App;
```

