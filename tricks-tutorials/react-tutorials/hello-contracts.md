# Hello, Contracts

## hello-contracts

## hello-contracts

### Overview

{% hint style="info" %}
Read the code for this tutorial [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-contracts)
{% endhint %}

In this tutorial we are going to build an application, in which you will be able to connect to \[], learn to define a contract on \[], also interact with it in a simple way to increment a counter and finally get the value of the counter.

### Overview

1. Create the contract definition.
2. Use `onAccountAvailable` event.

### Overview

Full example: [hello-contracts](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-contracts)

In this tutorial we are going to build an application, in which you will be able to connect to \[], learn to define a contract on \[], also interact with it in a simple way to increment a counter and finally get the value of the counter.

### Create the contract definition

In this tutorial we are going to build an application, in which you will be able to connect to \[], learn to define a contract on \[], also interact with it in a simple way to increment a counter and finally get the value of the counter.

If we go to the `src/contracts/counter.js` file, you can see that the first thing we need to do is import `createContract` from `@stakeordie/griptape.js`. Thus begins the definition of our contract.

1. Create the contract definition.
2. Use `onAccountAvailable` event.

```js
import { createContract } from '@stakeordie/griptape.js';
```

### Requirements

After that, we need to create the contract definition called `counterDef` the contract definition includes the `messages` part which is everything we are going to write in the blockchain and the `queries` part, basically everything we are going to read from the blockchain.

Full example: [hello-contracts](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-contracts)

```js
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

For this tutorial you will need to have a React created. You can find how to do it [here](https://reactjs.org/docs/create-a-new-react-app.html). Also, install your dependencies and install Griptape:

Now you can notice...

### Create the contract definition

Finally, we are going to create and export your `counter Contract` using the `createContact` API, which we are going to send...

```bash
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

```js
export const counterContract = createContract({
  id: 'counter',
  at: 'secret1vk6j69amm37zkhgqgtvjkymjeee4yhxvmmyxja',
  definition: counterDef
});
```

If we go to the `src/contracts/counter.js` file, you can see that the first thing we need to do is import `createContract` from `@stakeordie/griptape.js`. Thus begins the definition of our contract.

### Use `onAccountAvailable` event

### Getting Started

```js
import { createContract } from '@stakeordie/griptape.js';
```

This tutorial consist of these steps:

After that, we need to create the contract definition called `counterDef` the contract definition includes the `messages` part which is everything we are going to write in the blockchain and the `queries` part, basically everything we are going to read from the blockchain.

1. Grip you application
2. Boostrap the application
3. Create a contract definition
4. Build the application

```js
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

### Grip your application

Now you can notice...

Go to the `src/index.js` and import `gripApp` and `getKeplrAccountProvider` from `@stakeordie/griptape.js` package.

Finally, we are going to create and export your `counter Contract` using the `createContact` API, which we are going to send...

{% code title="src/index.js" %}
```jsx
import {
  gripApp,
  getKeplrAccountProvider
} from "@stakeordie/griptape.js";
```
{% endcode %}

```js
export const counterContract = createContract({
  id: 'counter',
  at: 'secret1vk6j69amm37zkhgqgtvjkymjeee4yhxvmmyxja',
  definition: counterDef
});
```

{% hint style="info" %}
<mark style="color:red;">You can check how to grip your app, Here</mark>
{% endhint %}

### Use `onAccountAvailable` event

### Bootstrap the application

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
<mark style="color:red;">You can check how to grip your app, Here</mark>
{% endhint %}

### Create a contract definition

If we go to the `src/contracts/counter.js` file, you can see that the first thing we need to do is import `createContract` from `@stakeordie/griptape.js`. Thus begins the definition of our contract.

{% code title="src/contracts/counter.js" %}
```js
import { createContract } from '@stakeordie/griptape.js';
```
{% endcode %}

After that, we need to create the contract definition called `counterDef` the contract definition includes the `messages` part, which is everything we are going to write in the blockchain and the `queries` part, basically everything we are going to read from the blockchain.

{% code title="src/contracts/counter.js" %}
```js
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

Now you can notice...

Finally, we are going to create and export your `counter Contract` using the `createContact` API, which we are going to send...

{% code title="src/contracts/counter.js" %}
```js
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
});

```
{% endcode %}

### Build the application

To Start Building Our Application, first we need to import the contract that we created a few steps before `countercontract` from `'./Contracts/Counter'`. Then We Need to Import `Boostrap` and `Onaccountavailable` from `"@ stakeordie / griptape.js"`.

{% code title="src/App.js" %}
```jsx
import { counterContract } from './contracts/counter';
import {
  bootstrap,
  onAccountAvailable
} from "@stakeordie/griptape.js";
```
{% endcode %}

Now you can notice that we are using the `onAccountAvailable` event, it is within a `useEffect` to know when the user is connected. So, once our APP is rendered, it will be asked through the event `onAccountAvailable` if we are connected, if this is the case we will assign `true` to the `setIsConnected` variable.

{% code title="src/App.js" %}
```jsx
useEffect(() => {
    onAccountAvailable(() => {
      setIsConnected(true);
    })
  }, []);
```
{% endcode %}

Now we are going to build the `getCount` function, which contains an asynchronous request to the contract `counterContract` in which it specifically requests the `getCount` query, once we have the response of this request, we can assign the value to `setCount` state.

{% code title="src/App.js" %}
```jsx
const getCount = async () => {
    const response = await counterContract.getCount();
    setCount(response.count);
  }
```
{% endcode %}

Now we are going to create the `incrementCount` function that asynchronously makes the `incrementCount` request to the `counterContract` Contract and returns the result of it.

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

