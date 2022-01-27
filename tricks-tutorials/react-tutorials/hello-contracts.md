# Hello, Contracts

{% hint style="info" %}
Read the code for this tutorial [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-contracts)
{% endhint %}

### Overview

In this tutorial we are going to build an application, in which you will be able to connect to \[], learn to define a contract on \[], also interact with it in a simple way to increment a counter and finally get the value of the counter.

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

1. Grip your application
2. Bootstrap the application
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
<mark style="color:red;">You can check how to grip your app, here</mark>
{% endhint %}

### Boostrap the application

Open up `src/App.js` and add a button to bootstrap the application.

{% code title="src/App.js" %}
```jsx
<>
    <h1>Hello, Transactions!</h1>
    <p>Is connected? { isConnected ? "Yes": "No" }</p>
    <button
      onClick={() => bootstrap()}
      disabled={isConnected}>Bootstrap
    </button>
</>
```
{% endcode %}

{% hint style="info" %}
<mark style="color:red;">You can check how to grip your app, here</mark>
{% endhint %}

### Create the contract definition

If we go to the `src/contracts/counter.js` file, you can see that the first thing we need to do is import `createContract` from `@stakeordie/griptape.js`. Thus begins the definition of our contract.

{% code title="src/contracts/counter.js" %}
```js
import { createContract } from '@stakeordie/griptape.js';
```
{% endcode %}

After that, we need to create the contract definition called `counterDef` the contract definition includes the `messages` part, which is everything we are going to write in the blockchain and the `queries` part, basically everything we are going to read from the blockchain.

{% code title="src/contracts/counter.js" %}
```jsx
const counterDef = {
  messages: {
    incrementCount() {
      const handleMsg = {
        increment: {}
      };
      return { handleMsg };
    }
  },

  queries: {
    getCount() {
      return { get_count: {} };
    }
  }
};
```
{% endcode %}

Finally, we are going to create and export your `counter Contract` using the `createContact` API, which we are going to send...

{% code title="src/contracts/counter.js" %}
```jsx
export const counterContract = createContract({
  id: 'counter',
  at: 'secret1vk6j69amm37zkhgqgtvjkymjeee4yhxvmmyxja',
  definition: counterDef
});
```
{% endcode %}

Once we have performed the steps above, the code should be seen as follows:

{% code title="src/contracts/counter.js" %}
```jsx
import { createContract } from '@stakeordie/griptape.js';

const counterDef = {
  messages: {
    incrementCount() {
      const handleMsg = {
        increment: {}
      };
      return { handleMsg };
    }
  },
  queries: {
    getCount() {
      return { get_count: {} };
    }
  }
};

export const counterContract = createContract({
  id: 'counter',
  at: 'secret1vk6j69amm37zkhgqgtvjkymjeee4yhxvmmyxja',
  definition: counterDef
});src/contracts/counter.js
```
{% endcode %}

### Build the application

To start building our application, first we need to import the contract that we created a few steps before `countercontract` from `'./Contracts/Counter'`. Then we need to import `Bootstrap` and `onAccountavailable` from `"@ stakeordie / griptape.js"`.

{% code title="src/App.js" %}
```jsx
import { counterContract } from './contracts/counter';
import {
  bootstrap,
  onAccountAvailable
} from "@stakeordie/griptape.js";
```
{% endcode %}

Now you can notice that we are using the `onAccountAvailable` event, it is within a `useEffect` to know when the user is connected. So, once our app is rendered, it will be asked through the event `onAccountAvailable` if we are connected. If this is the case we will assign `true` to the `setIsConnected` variable.

{% code title="src/App.js" %}
```jsx
useEffect(() => {
    onAccountAvailable(() => {
      setIsConnected(true);
    })
  }, []);
```
{% endcode %}

Now we are going to build the `getCount` function, which contains an asynchronous request to the contract `counterContract` in which it specifically requests the `getCount` query. Once we have the response of this request, we can assign the value to `setCount` state.

{% code title="src/App.js" %}
```jsx
const getCount = async () => {
    const response = await counterContract.getCount();
    setCount(response.count);
  }
```
{% endcode %}

Now we are going to create the `incrementCount` function that asynchronously makes the `incrementCount` request to the `counterContract` contract and returns the result of it.

{% code title="src/App.js" %}
```jsx
const incrementCount = async () => {
    setLoading(true);
    await counterContract.incrementCount();
    setLoading(false);
    return await counterContract.incrementCount();
  }
```
{% endcode %}

And adding a little JSX to our application we can see the full `src/App.js` code:

{% code title="src/App.js" %}
```jsx
import React, { useState, useEffect } from "react";
import { counterContract } from './contracts/counter';
import {
  bootstrap,
  onAccountAvailable
} from "@stakeordie/griptape.js";

function App() {

  const [count, setCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    onAccountAvailable(() => {
      setIsConnected(true);
    })
  }, []);

  const getCount = async () => {
    const response = await counterContract.getCount();
    setCount(response.count);
  }

  const incrementCount = async () => {
    setLoading(true);
    await counterContract.incrementCount();
    setLoading(false);
    return await counterContract.incrementCount();
  }

  return (
    <>
      <h1>Hello, Transactions!</h1>
      <p>Is connected? {isConnected ? "Yes" : "No"}</p>
      <button
        onClick={() => bootstrap()}
        disabled={isConnected}>Bootstrap
      </button>
      <p>Your count is: {count}</p>
      <button onClick={() => { incrementCount(); }}>{loading ? 'Loading...' : 'Increment by 1'}</button>
      <button onClick={() => { getCount(); }}>Get count</button>

    </>
  );
}

export default App;
```
{% endcode %}
