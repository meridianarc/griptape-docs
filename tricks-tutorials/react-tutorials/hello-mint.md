---
description: >-
  In this tutorial we show you how to interact with a snip-721 contract in order
  to mint a NFT.
---

# Hello, Mint

## Overview

When you finish this Hello Mint tutorial you will have a web app connected to `pulsar-2` with the ability to mint a token from a snip-721.

{% hint style="info" %}
Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/react/hello-mint)
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

This tutorial consist of these steps.

1. Grip an application.
2. Bootstrap the application.
3. Create contract client
4. Create List tokens component
5. Get tokens
6. Mint token

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

> We assumed you are using **Keplr** as wallet. Griptape has only support with Keplr at this point. The Griptape team is working looking froward to support as many wallets as the Cosmos Ecosystem requires.

## Bootstrap your application

Now that we have your gripped our application we need to **bootstrap** it. Bootstrap creates a `signing client` able to encrypt and decrypt transactions. If don't **bootstrap** the app we won't be able to get the wallet address and execute messages.

Now on, let's move to start working in `src/App.js`. As our first step we need to import `bootstrap` api from `@stakeordie/griptape.js`. Copy the example below.

```javascript
import { bootstrap } from  '@stakeordie/griptape.js';
```

Right next to it just create a button and add the bootstrap function.

```jsx
return (
	<>
		<h1>Hello, Mint!</h1>
		<button onClick={() => { bootstrap(); }}>
			Bootstrap
		</button>
	<>
)
```

## Create contract

now we need to create a contract client definition in order to execute and query our contract. Let's create a folder `contracts` and inside this folder a file called `minting.js` and start working on this file. First we going to import some APIs needed from Griptape.

```jsx
import {
	createContractClient,
	snip721Def
} from  '@stakeordie/griptape.js';
```

Then we create a contract client object and export it:

```javascript
export  const  minting = createContractClient({
	id:  'nft',
	at:  'secret1lke4emlmhztfr6pzekj3twvp8escmj3hses96v',
	definition:  snip721Def
});
```

As you can see we used a definition already created from Griptape this definition follows a standard defined from Secret Network, more info [here](https://github.com/SecretFoundation/SNIPs/blob/master/SNIP-721.md)

Final view of `minting.js`.

```java
import {
  createContractClient,
  snip721Def
} from '@stakeordie/griptape.js';


export const minting = createContractClient({
  id: 'nft',
  at: 'secret1lke4emlmhztfr6pzekj3twvp8escmj3hses96v',
  definition: snip721Def
});
```

## Create Token list component

In order to have a clean code we are going to create a dumb component to show a list of tokens. Create a folder `components` and inside of it create a file called `TokenList.js` and write something like the following.

```jsx
import React from "react";

function TokenList({ nftList }) {

    function mapTokens() {
        return nftList.map((item,key) => {
            return (
                <div key={key}>
                    <div>
                    {item.image 
	                    ? <img src={item.image} alt={item.image}></img> 
	                    : <img 
		                    src="https://i.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU" 
		                    alt="default">
		                   </img>
		              }
		             </div>
                    <div>{item.name}</div>
                </div>
            );
        });
    }

    return (
        <>
            {mapTokens()}
        </>
    )
}
export default TokenList;
```

## Get Tokens

Now let's move to `App.js` and import some APIs and our Token List component.

```javascript
import React, { useState, useEffect } from "react";
import {
  bootstrap,
  viewingKeyManager,
  onAccountAvailable
} from '@stakeordie/griptape.js';
import { minting } from './contracts/minting';
import TokenList from "./components/TokenList";
```

And then we are going to create some stores with `useState` for rendering our info.

```jsx
  var [loading, setLoading] = useState(false);
  var [loadingMint, setLoadingMint] = useState(false);
  var [loadingTokens, setLoadingTokens] = useState(false);
  var [viewingKey, setViewingKey] = useState('');
  var [nftList, setNftList] = useState([]);
  var [isConnected, setIsConnected] = useState(false);
```

After that we set up a event handler for when our app has an account available.

```jsx
  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable(() => {
      setIsConnected(true);
      const key = viewingKeyManager.get(minting.at);
      if (key) {
        setViewingKey(key);
      }
    })
    return () => {
      removeOnAccountAvailable();
    }
  }, []);
```

Now finally we are going to create a function to query our tokens and same way for create a viewing key, since is neccesary for querying the private state of our contract.

```jsx
const getTokens = async () => {
    setLoadingTokens(true);
    try {
      const tokens = await minting.getTokens(null,null,10,true);
      console.log(tokens)
      const token_list = tokens.token_list.tokens;
      await getNftDetail(token_list);
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingTokens(false);
    }
  }

  const getNftDetail = async (token_list) => {
    const promises = token_list.map(token => {
      return minting.getNftDossier(token);
    });

    const result = await Promise.all(promises);
    const tokens = result
      .map((ele) => {
          const { nft_dossier:{ public_metadata } }= ele
          if(!public_metadata || !public_metadata.extension){
            return {
              name:  "",
              description:  "",
              image: ""
            }
          }
          const { extension } = public_metadata;
          const name = extension.name ? extension.name: "";
          const description = extension.description ? extension.description: "";
          const image = extension.image ? extension.image: "https://i.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU";
          return {
            name:  name,
            description:  description,
            image: image
          }          
      });
      
    setNftList(tokens);
  }
```

Now this is our function to create a viewing key.

```jsx
  const createViewingKey = async () => {
    setLoading(true);
    try {
      const result = await minting.createViewingKey();

      if (result.isEmpty()) return;

      const { viewing_key: { key } } = result.parse();
      viewingKeyManager.add(minting, key);
      setViewingKey(key);
      const currentKey = viewingKeyManager.get(minting.at);

      if (currentKey) {
        viewingKeyManager.set(minting, key);
      } else {
        viewingKeyManager.add(minting, key);
      }
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  }
```

## Mint Token

now we want to create a new token, in order to create a new token you need to be a minter for your contract, for this contract we have for example there is no restrictions but you need to consider this for your contracts. with this said let's create a function to mint a new token.

```javascript
  const mint = async () => {
    var date = Date.now();
    const extension = {
      name: `Example ${date}`,
      description: "test",
      image: 'https://i.picsum.photos/id/586/200/300.jpg?hmac=Ugf94OPRVzdbHxLu5sunf4PTa53u3gDVzdsh5jFCwQE'
    }
    setLoadingMint(true);
    try {
	  // mintNft receives token_id,owner,public_metadata, ...
      await minting.mintNft(null,null,{extension});
    } catch (e) {
      // ignore for now
    } finally {
      setLoadingMint(false);
    }
  }
```

When minting a new token all fields are optional, in this case we want to set some public metadata so we passed in some null values for token\_id and owner,

Finally we should need to show the info and buttons in html:

```jsx
  return (
    <>
      <h1>Hello, Mint!</h1>
      <p>Is connected? {isConnected ? "Yes" : "No"}</p>
      <button
        onClick={() => { bootstrap(); }}
        disabled={isConnected}>Bootstrap
      </button>
      <button disabled={!isConnected} onClick={() => { mint(); }}>{loadingMint ? 'Loading...' : 'Mint'}</button>
      <br></br>
      <br></br>
      <button disabled={!isConnected} onClick={() => { createViewingKey(); }}>{loading ? 'Loading...' : 'Create Viewing Key'}</button>
      <button disabled={!isConnected || !viewingKey}  onClick={() => { getTokens(); }}>{loadingTokens ? 'Loading...' : 'Get Tokens'}</button>
      <br></br>
      <TokenList nftList={nftList} />
    </>
  );
```

Final view of `App.js`

```jsx
import React, { useState, useEffect } from "react";
import {
  bootstrap,
  viewingKeyManager,
  onAccountAvailable
} from '@stakeordie/griptape.js';
import { minting } from './contracts/minting';
import TokenList from "./components/TokenList";

function App() {

  var [loading, setLoading] = useState(false);
  var [loadingMint, setLoadingMint] = useState(false);
  var [loadingTokens, setLoadingTokens] = useState(false);
  var [viewingKey, setViewingKey] = useState('');
  var [nftList, setNftList] = useState([]);
  var [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const removeOnAccountAvailable = onAccountAvailable(() => {
      setIsConnected(true);
      const key = viewingKeyManager.get(minting.at);
      if (key) {
        setViewingKey(key);
      }
    })
    return () => {
      removeOnAccountAvailable();
    }
  }, []);

  const mint = async () => {
    var date = Date.now();
    const extension = {
      name: `Example ${date}`,
      description: "test",
      image: 'https://i.picsum.photos/id/586/200/300.jpg?hmac=Ugf94OPRVzdbHxLu5sunf4PTa53u3gDVzdsh5jFCwQE'
    }
    setLoadingMint(true);
    try {
      await minting.mintNft(null,null,{extension});
    } catch (e) {
      // ignore for now
    } finally {
      setLoadingMint(false);
    }
  }

  const getTokens = async () => {
    setLoadingTokens(true);
    try {
      const tokens = await minting.getTokens(null,null,10,true);
      console.log(tokens)
      const token_list = tokens.token_list.tokens;
      await getNftDetail(token_list);
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingTokens(false);
    }
  }

  const getNftDetail = async (token_list) => {
    const promises = token_list.map(token => {
      return minting.getNftDossier(token);
    });

    const result = await Promise.all(promises);
    const tokens = result
      .map((ele) => {
          const { nft_dossier:{ public_metadata } }= ele
          if(!public_metadata || !public_metadata.extension){
            return {
              name:  "",
              description:  "",
              image: ""
            }
          }
          const { extension } = public_metadata;
          const name = extension.name ? extension.name: "";
          const description = extension.description ? extension.description: "";
          const image = extension.image ? extension.image: "https://i.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU";
          return {
            name:  name,
            description:  description,
            image: image
          }          
      });
      
    setNftList(tokens);
  }

  const createViewingKey = async () => {
    setLoading(true);
    try {
      const result = await minting.createViewingKey();

      if (result.isEmpty()) return;

      const { viewing_key: { key } } = result.parse();
      viewingKeyManager.add(minting, key);
      setViewingKey(key);
      const currentKey = viewingKeyManager.get(minting.at);

      if (currentKey) {
        viewingKeyManager.set(minting, key);
      } else {
        viewingKeyManager.add(minting, key);
      }
    } catch (e) {
      // ignore for now
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Hello, Mint!</h1>
      <p>Is connected? {isConnected ? "Yes" : "No"}</p>
      <button
        onClick={() => { bootstrap(); }}
        disabled={isConnected}>Bootstrap
      </button>
      <button disabled={!isConnected} onClick={() => { mint(); }}>{loadingMint ? 'Loading...' : 'Mint'}</button>
      <br></br>
      <br></br>
      <button disabled={!isConnected} onClick={() => { createViewingKey(); }}>{loading ? 'Loading...' : 'Create Viewing Key'}</button>
      <button disabled={!isConnected || !viewingKey}  onClick={() => { getTokens(); }}>{loadingTokens ? 'Loading...' : 'Get Tokens'}</button>
      <br></br>
      <TokenList nftList={nftList} />
    </>
  );
}
export default App;
```
