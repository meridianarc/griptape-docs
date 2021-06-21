# Step by step tutorial

Configuration



yarn create @vitejs/app griptape-demo

  Options

    Select a Framework

      vue

    Select a variant

      vue

yarn add @stakeordie/griptape-vue.js

code .

Boilerplate

vite patches

vite.config.js

add `const path = require('path')` after `import vue from '@vitejs/plugin-vue'`

after `plugins: [vue()],` add

```
resolve: {
	alias: {
	  '~': path.resolve(__dirname, 'node_modules'),
	  '@': path.resolve(__dirname, 'src')
	}
}
```


index.html

add `<script>window.global = window;</script>` before `</body>` tag

app.vue

```html
<template>
  
</template>

<script>
export default {

}
</script>

<style>

</style>
```

remove HelloWorld.vue from components and the logo from assets

main.js

remove `import { createApp } from 'vue'`

add `import { gripVueJsApp } from '@stakeordie/griptape-vue.js'` after `import App from './App.vue'`

add ```javascript
// Griptape config
const conf = {
  restUrl: 'https://api.holodeck.stakeordie.com/'
}```
after
`import { gripVueJsApp } from '@stakeordie/griptape-vue.js'\`

replace `createApp(App).mount('#app')` with 
```javascript
// Grip the vue app
gripVueJsApp(conf, App, (app, pinia) =\> {})
```

Meat and Potatoes

Update App.vue to add wallet and show balance

header

`<wallet-info></wallet-info>`

`<div>{{myBalance}}</div>`

script

"wallet-info is avaialbe by defaul"

balance

`import { mapState } from 'pinia'`

`import { useWalletStore} from '@stakeordie/griptape-vue.js'`

```javascript
{{balance}}

...

computed: {
    ...mapState(useWalletStore, ['balance']),
}
```

formattedBalance

`import { coinConvert } from '@stakeordie/griptape.js'`

```javascript

{{formattedBalance}}

...


formattedBalance() {
  return coinConvert(this.myBalance, 6, 'human');
}
```

the other cool thing

`return coinConvert(this.myBalance, 6, 'human', 2)`

goes both ways

`return coinConvert(this.myBalance, 6, 'machine')`

Contracts

First lets create a contract folder and add related files to it.

Create the folder

The contracts folder is where we are going to store all the contracts we want to interact with.

By convention we create and `index.js` file. This is where we are going to instantiate or, in griptape verbage, "create" our contracts

Create the file, leave blank

Before we can create a contract though, we need to add a contract definition. This is were we define the state, messages, and queries the contract has that we want to interact with. We will start with a blank contract definition named auctionsFactory

auctions-factory.js

```javascript
export const auctionsFactory = {
  state: {

  },
  messages: {

  },
  queries: {
    
  }
}
```

Now that we have that we can add the ability to create it.

index.js

```javascript
import { createContract } from '@stakeordie/griptape-vue.js'
import auctionsFactory from './auctions-factory.js'

export const useAuctionsFactoryStore = createContract(
    'auction-factory', //Contract ID
    'secret1lqdx8va86f9cff5dsz28l97x20z67qv7d4npj8', //Contract Instance Address
    auctionsFactory //Contract Definition
)
```

Now that we have the contract created, we can add it to our app and use it.

App.vue

`import { useAuctionsFactory } from '@/contracts';`

We can now use it!

Thats great, but we haven't added any state to it. Lets add some state

auctions-factory.js

```javascript
state: {
    someStateProperty: "A Value"
}
```

And use this state in our app

App.vue

`...mapState(useAuctionsFactory, ['someStateProperty']),`

```html
<div class="main-content">
   {{someStateProperty}} 
</div>
```

Show Dev Tools

![][image-1]

Show the state props that you get by default

contractAddress

This was passed in when it was created

spec

This defines this contract as being of type "base". This will make more sense when we start working with Snip20 specs

Now that the flow is hopefully clear, lets add some real functionality to the contract definition

auctions-factory.js

I'm going to add comments for default state poperties

What I want to do here is get all the active auctions and list them for the user

```javascript

export const auctionsFactory = {
  state: {
    //contractAddress: "secret1lqdx8va86f9cff5dsz28l97x20z67qv7d4npj8"
    //spec: "base"
    auctions: [],
  },
  messages: {

  },
  queries: {
    async listAuctions() {
      const auctions = await this.scrtClient.queryContract(this.contractAddress, {"list_active_auctions":{}})
      this.auctions = auctions;
    }
  }
}
```

Now lets output that in the app

App.vue

```html
...
<div class="main-content">
  <ul>
    <li v-for="(auction, index) in activeAuctions" :key="index">
      {{ auction.pair }}
    </li>
  </ul>
</div>
...
```

```javascript
    created() {
      this.listAuctions()
    },
    computed: {
  
...
    
    ...mapState(useAuctionsFactoryStore, [
      "auctions"
    ]),
    
...
    
    activeAuctions() {
      return this.auctions.active;
    }
      
...
    
    methods: {
      ...mapActions(useAuctionsFactoryStore, [
        "listAuctions" 
      ])
    }
      
...
```

Amazing! We are talking to a contract!

Next lets get user specific by adding My Auctions. And we get to the fun of Viewing Keys


[image-1]:	https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fstake-or-die-roam%2FJIf012BLOL.png?alt=media&token=c9e83b4a-ecf2-494d-90ac-c733f7824422