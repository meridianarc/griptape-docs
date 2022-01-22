---
description: >-
  Hello, Transactions is a tutorial that teaches you how send messages using
  Griptape.
---

# Hello, Transactions

### Overview

This tutorial walks you through creating an application that sends a SNIP-20 tokens from the selected wallet to another one. You will learn how to use the SNIP-20 built-in definition and how to set up a simple architecture for your contracts in general.

### Requirements

In order to go through this tutorial you'll need to have a React created. You can find how to do it [here](https://reactjs.org/docs/create-a-new-react-app.html). Also, install your dependencies and install Griptape:

```bash
# With npm
npm install && npm install @stakeordie/griptape.js

# With yarn
yarn && yarn add @stakeordie/griptape.js
```

### Getting Started

These are the steps you need to follow:

1. Grip your application
2. Bootstrap the application
3. Create a SNIP-20 client contract
4. Create a viewing key for the SNIP-20 token
5. Display current token balance
6. Create form to send tokens and execute a message

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
import {
  bootstrap,
  onAccountAvailable
} from "@stakeordie/griptape.js";

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    onAccountAvailable(() => {
      setIsConnected(true);
    });
  }, []);

  return (
    <>
      <h1>Hello, Transactions!</h1>
      <p>Is connected? { isConnected ? "Yes": "No" }</p>
      <button
        onClick={() => bootstrap()}
        disabled={isConnected}
      >
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

```javascript
import {
  createContract,
  snip20Def
} from "@stakeordie/griptape.js";

export const sscrt = createContract({
  id: "sscrt",
  at: "secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg",
  definition: snip20Def
});
```

### Create a viewing key for the SNIP-20 token

Create a button that create and sets a new viewing key for the SNIP-20 token. Set the viewing key using the `viewingKeyManager` object by importing it.

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
    onAccountAvailable(() => {
      setIsConnected(true);
      hasViewingKey();
    });

    onViewingKeyCreated(() => {
      hasViewingKey();
    });
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

### Display current account token balance

Create a button and bind a click event to a function that queries the token balance of the `sscrt` client contract.

```javascript
import React, { useState } from "react";
import {
  bootstrap
} from "@stakeordie/griptape.js";

function App() {
  const [isQueryLoading, setQueryLoading] = useState(false);
  const [balance, setBalance] = useState(false);
  
  async function getBalance() {
    const { 
  }
  return (
    <>
      <h1>Hello, Transactions!</h1>
      <button onClick={() => bootstrap()}></button>
    </>
  );
}
```
