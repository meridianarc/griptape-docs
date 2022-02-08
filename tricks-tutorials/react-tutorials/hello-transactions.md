---
description: >-
  Hello, Transactions is a tutorial that teaches you how send messages using
  Griptape.
---

# Hello, Transactions

{% hint style="info" %}
Read the code for this tutorial [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-transactions)
{% endhint %}

### Overview

This tutorial walks you through creating an application that sends a SNIP-20 tokens from the selected wallet to another one. You will learn how to use the SNIP-20 built-in definition and how to set up a simple architecture for your contracts in general.

### Requirements

{% content-ref url="hello-contracts.md" %}
[hello-contracts.md](hello-contracts.md)
{% endcontent-ref %}

In order to go through this tutorial you'll need to have a React created. You can find how to do it [here](https://reactjs.org/docs/create-a-new-react-app.html). Also, install your dependencies and install Griptape:

```bash
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

### Getting Started

This tutorial consist of these steps:

1. Grip your application
2. Bootstrap the application
3. Create a SNIP-20 client contract
4. Create a viewing key for the SNIP-20 token
5. Display current token balance
6. Create form to execute a message that sends tokens

### Grip your application

Go to the `src/index.js` and import `gripApp` and `getKeplrAccountProvider` from `@stakeordie/griptape.js` package.

{% code title="src/index.js" %}
```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  gripApp,
  getKeplrAccountProvider
} from "@stakeordie/griptape.js";

const restUrl = "https://api.pulsar.griptapejs.com";
const provider = getKeplrAccountProvider();
function runApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

gripApp(restUrl, provider, runApp);
```
{% endcode %}

### Bootstrap the application

Open up `src/App.js` and add a button to bootstrap the application.

{% code title="src/App.js" %}
```jsx
import React, { useState, useEffect } from "react";
import { bootstrap, onAccountAvailable } from "@stakeordie/griptape.js";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable(() => {
      setIsConnected(true);
    });

    return () => {
        removeOnAccountAvailable
    }
  }, []);
  return (
    <>
      <h1>Hello, Transactions!</h1>
      <p>Is connected? {isConnected ? "Yes" : "No"}</p>
      <button onClick={() => bootstrap()} disabled={isConnected}>
        Bootstrap
      </button>
    </>
  );
}

export default App;
```
{% endcode %}

### Create a SNIP-20 client contract

Create a new directory in the `src` directory called `contracts` and add a new file called `sscrt.js`. This will the contract we will be interacting with.

{% code title="src/contracts/sscrt.js" %}
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
{% endcode %}

### Create a viewing key for the SNIP-20 token

Create a button that create and sets a new viewing key for the SNIP-20 token. Set the viewing key using the `viewingKeyManager` object by importing it.

{% code title="src/App.js" %}
```jsx
import React, { useState, useEffect } from "react";
import {
  bootstrap,
  onAccountAvailable,
  onViewingKeyCreated,
  viewingKeyManager
} from "@stakeordie/griptape.js";
import { sscrt } from "./contracts/sscrt";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMessageLoading, setMessageLoading] =
    useState(false);

  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable(() => {
      setIsConnected(true);
      hasViewingKey();
    });

    const removeOnViewingKeyCreated = onViewingKeyCreated(() => {
      hasViewingKey();
    });
    return () => {
      removeOnAccountAvailable();
      removeOnViewingKeyCreated();
    }
  }, []);

  async function createViewingKey() {
    setMessageLoading(true);

    try {
      const result = await sscrt.createViewingKey();
      if (result.isEmpty()) return;
      const { create_viewing_key: { key } } =
        result.parse();
      viewingKeyManager.add(sscrt, key);
    } finally {
      setMessageLoading(false);
    }
  }
  
  function hasViewingKey() {
    const key = viewingKeyManager.get(sscrt.at);
    return typeof key !== "undefined";
  }

  return (
    <>
      <h1>Hello, Transactions!</h1>
      <p>Is connected? { isConnected ? "Yes": "No" }</p>
      <p>
        Has viewing key? { hasViewingKey() ? "Yes" : "No" }
      </p>
      <button
        onClick={() => bootstrap()}
        disabled={isConnected}
      >
        Connect
      </button>
      <button
        onClick={() => createViewingKey()}
        disabled={
            isMessageLoading
          || hasViewingKey()
          || !isConnected
        }
      >
        Create Viewing Key
      </button>
    </>
  );
}

export default App;
```
{% endcode %}

### Display current account token balance

Create a button and bind a click event to a function that queries the token balance of the `sscrt` client contract.

{% code title="src/App.js" %}
```jsx
import React, { useState, useEffect } from "react";
import {
  bootstrap,
  onAccountAvailable,
  onViewingKeyCreated,
  viewingKeyManager,
  coinConvert
} from "@stakeordie/griptape.js";
import { sscrt } from "./contracts/sscrt";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMessageLoading, setMessageLoading] =
    useState(false);
  const [isQueryLoading, setQueryLoading] =
    useState(false);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable(() => {
      setIsConnected(true);
      hasViewingKey();
    });

    const removeOnViewingKeyCreated = onViewingKeyCreated(() => {
      hasViewingKey();
    });
    return () => {
      removeOnAccountAvailable();
      removeOnViewingKeyCreated();
    }
  }, []);

  async function createViewingKey() {
    setMessageLoading(true);

    try {
      const result = await sscrt.createViewingKey();
      if (result.isEmpty()) return;
      const { create_viewing_key: { key } } =
        result.parse();
      viewingKeyManager.add(sscrt, key);
    } finally {
      setMessageLoading(false);
    }
  }
  
  function hasViewingKey() {
    const key = viewingKeyManager.get(sscrt.at);
    return typeof key !== "undefined";
  }

  async function getBalance() {
    if (!hasViewingKey()) return;

    setQueryLoading(true);
    try {
      const { balance: { amount: result } } =
        await sscrt.getBalance();
      const amount = coinConvert(result, 6, "human");
      setBalance(amount);
    } finally {
      setQueryLoading(false);
    }
  }

  return (
    <>
      <h1>Hello, Transactions!</h1>
      <p>Is connected? { isConnected ? "Yes": "No" }</p>
      <p>
        Has viewing key? { hasViewingKey() ? "Yes" : "No" }
      </p>
      <p>SNIP-20 Token Balance: { balance }</p>
      <button
        onClick={() => bootstrap()}
        disabled={isConnected}
      >
        Connect
      </button>
      <button
        onClick={() => createViewingKey()}
        disabled={
            isMessageLoading
          || hasViewingKey()
          || !isConnected
        }
      >
        Create Viewing Key
      </button>
      <button
        onClick={() => getBalance()}
        disabled={isQueryLoading}
      >
        Get Balance
      </button>
    </>
  );
}

export default App;
```
{% endcode %}

### Create form to execute a message that sends tokens

Create a form to input an address and an amount and execute the `send` message on the `sscrt` contract.

```javascript
import React, { useState, useEffect } from "react";
import {
  bootstrap,
  onAccountAvailable,
  onViewingKeyCreated,
  viewingKeyManager,
  coinConvert
} from "@stakeordie/griptape.js";
import { sscrt } from "./contracts/sscrt";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMessageLoading, setMessageLoading] =
    useState(false);
  const [isQueryLoading, setQueryLoading] =
    useState(false);
  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable(() => {
      setIsConnected(true);
      hasViewingKey();
    });

    const removeOnViewingKeyCreated = onViewingKeyCreated(() => {
      hasViewingKey();
    });
    return () => {
      removeOnAccountAvailable();
      removeOnViewingKeyCreated();
    }
  }, []);

  async function createViewingKey() {
    setMessageLoading(true);

    try {
      const result = await sscrt.createViewingKey();
      if (result.isEmpty()) return;
      const { create_viewing_key: { key } } =
        result.parse();
      viewingKeyManager.add(sscrt, key);
    } finally {
      setMessageLoading(false);
    }
  }
  
  function hasViewingKey() {
    const key = viewingKeyManager.get(sscrt.at);
    return typeof key !== "undefined";
  }

  async function getBalance() {
    if (!hasViewingKey()) return;

    setQueryLoading(true);
    try {
      const { balance: { amount: result } } =
        await sscrt.getBalance();
      const amount = coinConvert(result, 6, "human");
      setBalance(amount);
    } finally {
      setQueryLoading(false);
    }
  }

  async function sendTokens(e) {
    e.preventDefault();

    if (!address || !amount) return;

    setMessageLoading(true);

    try {
      const theAmount = coinConvert(amount, 6, "machine");
      await sscrt.send(address, theAmount);
      setAddress("");
      setAmount(0);
    } finally {
      setMessageLoading(false);
    }
  }

  return (
    <>
      <h1>Hello, Transactions!</h1>
      <p>Is connected? { isConnected ? "Yes": "No" }</p>
      <p>
        Has viewing key? { hasViewingKey() ? "Yes" : "No" }
      </p>
      <p>SNIP-20 Token Balance: { balance }</p>
      <button
        onClick={() => bootstrap()}
        disabled={isConnected}
      >
        Connect
      </button>
      <button
        onClick={() => createViewingKey()}
        disabled={
            isMessageLoading
          || hasViewingKey()
          || !isConnected
        }
      >
        Create Viewing Key
      </button>
      <button
        onClick={() => getBalance()}
        disabled={isQueryLoading}
      >
        Get Balance
      </button>
      <form onSubmit={sendTokens}>
        <input
          type="text"
          placeholder="Address to send to"
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <input
          type="number"
          placeholder="Amount to send"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <button disabled={isMessageLoading}>
          Send tokens
        </button>
      </form>
    </>
  );
}

export default App;
```

