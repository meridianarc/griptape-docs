# Hello, Viewing Keys

### Overview

### Requirements

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
3. ...

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
<mark style="color:red;">You can check how to grip your app, Here</mark>
{% endhint %}
