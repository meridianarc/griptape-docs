---
description: >-
  In this tutorial we show you how to interact with a snip-721 contract in order
  to mint a NFT.
---

# Hello, Mint

## Overview

When you finish this Hello Mint tutorial you will have a web app connected to `pulsar-2` with the ability to mint a token from a snip-721.

{% hint style="info" %}
Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/vue/hello-mint)
{% endhint %}

> Checkout the full example in our repo [here](https://github.com/stakeordie/griptape-tutorials/tree/main/vue/hello-mint)

## Requirements

In order to go through this tutorial you'll need to have a Vue created. You can find how to do it [here](https://cli.vuejs.org/guide/creating-a-project.html). Also, install your dependencies and install Griptape:

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
4. Get tokens
5. Mint token

## Grip an application

As you may know the first thing that we need to do is **Grip** our application, in this case our app is in `src/main.js`. This is how our `main.js` should look like.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import {
  gripApp,
  getKeplrAccountProvider
} from '@stakeordie/griptape.js';

const restUrl = 'https://api.pulsar.griptapejs.com';
const provider = getKeplrAccountProvider();
function runApp() {
  createApp(App)
    .mount('#app')
}

gripApp(restUrl, provider, runApp);
```

> We assumed you are using **Keplr** as wallet. Griptape has only support with Keplr at this point. The Griptape team is working looking froward to support as many wallets as the Cosmos Ecosystem requires.

## Bootstrap your application

Now that we have your gripped our application we need to **bootstrap** it. Bootstrap creates a `signing client` able to encrypt and decrypt transactions. If don't **bootstrap** the app we won't be able to get the wallet address and execute messages.

Now on, let's move to start working in `src/App.vue`. As our first step we need to import `bootstrap` api from `@stakeordie/griptape.js`. Copy the example below.

```javascript
import { bootstrap } from  '@stakeordie/griptape.js';
```

Right next to it just create a function and a button and add the connect function to it.

```javascript
async  connect() {
	await  bootstrap();
},
```

```html
<template>
	<div>
		<h1>Hello, Mint!</h1>
		<button :disabled="isConnected" @click="connect">Bootstrap</button>
	</div>
</template>
```

## Create contract

now we need to create a contract client definition in order to execute and query our contract. Let's create a folder `contracts` and inside this folder a file called `minting.js` and start working on this file. First we going to import some APIs needed from Griptape.

```javascript
import {
	createContractClient,
	snip721Def
} from  '@stakeordie/griptape.js';
```

Then we create a contract client object and export it:

```java
export  const  minting = createContractClient({
	id:  'nft',
	at:  'secret1lke4emlmhztfr6pzekj3twvp8escmj3hses96v',
	definition:  snip721Def
});
```

As you can see we used a definition already created from Griptape this definition follows a standard defined from Secret Network, more info [here](https://github.com/SecretFoundation/SNIPs/blob/master/SNIP-721.md)

Final view of `minting.js`.

```javascript
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

## Get Tokens

Now let's move to `App.vue` and import some APIs and our Token List component.

```javascript
import {
  viewingKeyManager,
  bootstrap,
  onAccountAvailable
} from '@stakeordie/griptape.js';
import { minting } from './contracts/minting';
```

And then we are going to set our date for rendering and storing our info.

```javascript
export default {
  data() {
    return {
      loading: false,
      isConnected: false,
      loadingMint:false,
      loadingTokens:false,
      key:"",
      tokens:[],
      removeOnAccountAvailable:null
    }
  },
	// ...methods
 }
```

After that we set up a event handler for when our app has an account available.

```javascript
mounted(){
    this.removeOnAccountAvailable = onAccountAvailable(()=>{
      this.isConnected = true;
      const key = viewingKeyManager.get(minting.at);
      if (key) {
        this.key = key;
      }
    })
  },
 unmounted(){
    this.removeOnAccountAvailable();
  },
```

Now finally we are going to create a function to query our tokens and same way for create a viewing key, since is neccesary for querying the private state of our contract.

```javascript
methods:{
    async getTokens(){
    this.loadingTokens = true;
    try {
      //Get list of tokens' id owned
      // Exam. ["4","65","87"]
      const tokens = await minting.getTokens(null,null,10,true);
      const token_list = tokens.token_list.tokens;
      //Get details of each token
      await this.getNftDetail(token_list);
    } catch (e) {
      console.error(e)
    } finally {
      this.loadingTokens = false;
    }
  },
  async getNftDetail(token_list) {
    const promises = token_list.map(token => {
      //Query each token 
      return minting.getNftDossier(token);
    });

    const result = await Promise.all(promises);
    const def = {
      name:  "",
      description:  "",
      image: ""
    };
    
    this.tokens = result
      .map((ele) => {
        try {
          const { nft_dossier:{ public_metadata } }= ele
          if(!public_metadata || !public_metadata.extension){
            return def
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
          
        } catch (error) {
          return def
        }
      });
    }
  }
}
```

Now this is our function to create a viewing key.

```javascript
methods:{
	//...methods
	async createViewingKey  () {
      this.loading = true;
      try {
        const result = await minting.createViewingKey();

        if (result.isEmpty()) return;

        const { viewing_key: { key } } = result.parse();
        viewingKeyManager.add(minting, key);
        this.key = key;
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false;
      }
    },
}
```

## Mint Token

now we want to create a new token, in order to create a new token you need to be a minter for your contract, for this contract we have for example there is no restrictions but you need to consider this for your contracts. with this said let's create a function to mint a new token.

```javascript
 methods:{
   async mint(){
      var date = Date.now();
      const extension = {
        name: `Example ${date}`,
        description: "test",
        image: 'https://i.picsum.photos/id/586/200/300.jpg?hmac=Ugf94OPRVzdbHxLu5sunf4PTa53u3gDVzdsh5jFCwQE'
      }
      this.loadingMint = true;
      try {
        await minting.mintNft(null,null,{extension});
      } catch (e) {
        // ignore for now
      } finally {
        this.loadingMint = false;
      }
  },
}
```

When minting a new token all fields are optional, in this case we want to set some public metadata so we passed in some null values for token\_id and owner,

Finally we should need to show the info and buttons in html:

```html
<template>
  <div>
    <h1>Hello, Mint!</h1>
    <p>Is connected? {{isConnected ? "Yes" : "No"}}</p>
    <button :disabled="isConnected" @click="connect">Bootstrap</button>
    <button :disabled="!isConnected" @click="mint">{{loadingMint ? 'Loading...' : 'Mint'}}</button>
    <br />
    <br />
    <button :disabled="!isConnected" @click="createViewingKey">
      {{loading ? 'Loading...' : 'Create Viewing Key'}}
    </button>
    <button :disabled="!isConnected || !key" @click="getTokens">
      {{loadingTokens ? 'Loading...' : 'Get Tokens'}}
    </button>
    <br />
    <div v-bind:key="item.name" v-for="item in tokens">
      <div>
        <img v-if="item.image" :src="item.image" alt="[image]" />
        <img
          v-else
          src="https://i.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU"
          alt="[image]"
        />
      </div>
      <div>{{item.name}}</div>
    </div>
  </div>
</template>
```

Final view of `App.vue`

```html
<template>
  <div>
    <h1>Hello, Mint!</h1>
    <p>Is connected? {{isConnected ? "Yes" : "No"}}</p>
    <button :disabled="isConnected" @click="connect">Bootstrap</button>
    <button :disabled="!isConnected" @click="mint">{{loadingMint ? 'Loading...' : 'Mint'}}</button>
    <br />
    <br />
    <button :disabled="!isConnected" @click="createViewingKey">
      {{loading ? 'Loading...' : 'Create Viewing Key'}}
    </button>
    <button :disabled="!isConnected || !key" @click="getTokens">
      {{loadingTokens ? 'Loading...' : 'Get Tokens'}}
    </button>
    <br />
    <div v-bind:key="item.name" v-for="item in tokens">
      <div>
        <img v-if="item.image" :src="item.image" alt="[image]" />
        <img
          v-else
          src="https://i.picsum.photos/id/551/200/300.jpg?hmac=pXJCWIikY_BiqwhtawBb8x1jxclDny0522ZprZVTJiU"
          alt="[image]"
        />
      </div>
      <div>{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import {
  viewingKeyManager,
  bootstrap,
  onAccountAvailable
} from '@stakeordie/griptape.js';
import { minting } from './contracts/minting';

export default {
  data() {
    return {
      loading: false,
      isConnected: false,
      loadingMint:false,
      loadingTokens:false,
      key:"",
      tokens:[],
      removeOnAccountAvailable:null
    }
  },
  mounted(){
    this.removeOnAccountAvailable = onAccountAvailable(()=>{
      this.isConnected = true;
      const key = viewingKeyManager.get(minting.at);
      if (key) {
        this.key = key;
      }
    })
  },
  unmounted(){
    this.removeOnAccountAvailable();
  },
  methods: {
    async createViewingKey  () {
      this.loading = true;
      try {
        const result = await minting.createViewingKey();

        if (result.isEmpty()) return;

        const { viewing_key: { key } } = result.parse();
        viewingKeyManager.add(minting, key);
        this.key = key;
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false;
      }
    },
    async connect() {
      await bootstrap();
    },
    async mint(){
      var date = Date.now();
      const extension = {
        name: `Example ${date}`,
        description: "test",
        image: 'https://i.picsum.photos/id/586/200/300.jpg?hmac=Ugf94OPRVzdbHxLu5sunf4PTa53u3gDVzdsh5jFCwQE'
      }
      this.loadingMint = true;
      try {
        await minting.mintNft(null,null,{extension});
      } catch (e) {
        // ignore for now
      } finally {
        this.loadingMint = false;
      }
  },
  async getTokens(){
    this.loadingTokens = true;
    try {
      //Get list of tokens' id owned
      // Exam. ["4","65","87"]
      const tokens = await minting.getTokens(null,null,10,true);
      const token_list = tokens.token_list.tokens;
      //Get details of each token
      await this.getNftDetail(token_list);
    } catch (e) {
      console.error(e)
    } finally {
      this.loadingTokens = false;
    }
  },
  async getNftDetail(token_list) {
    const promises = token_list.map(token => {
      //Query each token 
      return minting.getNftDossier(token);
    });

    const result = await Promise.all(promises);
    const def = {
      name:  "",
      description:  "",
      image: ""
    };
    
    this.tokens = result
      .map((ele) => {
        try {
          const { nft_dossier:{ public_metadata } }= ele
          if(!public_metadata || !public_metadata.extension){
            return def
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
          
        } catch (error) {
          return def
        }
      });
    }
  }
}
</script>
```
