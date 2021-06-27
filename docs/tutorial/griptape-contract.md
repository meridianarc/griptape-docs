# Griptape Contract

For most dApps on Secret Network, Secret Contracts are the core. We took that to heart and built Griptape in a way that, as best as possible, tried to bring the contract to the front-end. The goal with this is to allow the front end developer to code as if they were communicating with the smart contract directly in there web app, leaving all the connecting back and forth to the framework. This is what the Griptatpe Contract is all about, a front-end implementation of the backend contract. This should all make a lot more sense when you see it in actions so lets get to it.

The first thing we will do is create the contracts folder.

```{5}
.
├─ public
├─ src
│  ├─ assets
│  ├─ contracts
│  ├─ App.vue
│  └─ main.js
├─ index.html
├─ package.json
├─ vite.config.js
└─ yarn.lock
```

The contracts folder will hold all the contract definitions we create as well as an index.js file where we will instantiate the definition to create the actual Griptape Contract that we will use in out app.

First lets just create an empty `index.js` and a `contractDef.js` file. 

```{2-3}
│  ├─ contracts
│  │  ├─ contractDef.js
│  │  └─ index.js
```

Open `contractDef.js` and add the follow:

**/src/contracts/contractDef.js**
```javascript
export const contractDef = {
  state: {},
  queries: {},
  messages: {}
}
```

Contract definition files like this one are vanilla javascript objects that map to the state, queries, and messages of contracts on the blockchain.

The one we just created is what an empty contract definition object looks like. And although it doesn't look like much, this definition can already be used to create a contract. In the `index.js` file lets create this contract using the counter address from before.

**/src/contracts/index.js**
```javascript
  import { createContract } from '@stakeordie/griptape-vue.js'
  import { contractDef } from './contractDef.js'

  const contractAddress = 'secret1w97ynhe099cs5p433dvlaqhsxrszudz2n3f56h'

  const useContract = createContract('emptyContract', contractAddress, contractDef)
```

Now, lets examine it by importing it into the `App.vue` component, remebering to import the pinia methods we will need too.

**/src/App.vue**
```html {11-15,22,40-42}
<template>
  <div>
    <header>
      <div class="logo">Secret Auctions</div>
      <wallet-info></wallet-info>
    </header>
    <main>
      <div>{{ theCount }}</div>
      <button @click="increment">+</button>
      <button @click="reset">RESET</button>
      <hr>
      <ul>
          <li>Contract: {{contractAddress}}</li>
          <li>Spec: {{spec}}</li>
      </ul>
    </main>
  </div>
</template>

<script>
  import { coinConvert, createScrtClient, useWallet } from '@stakeordie/griptape.js'
  import { mapState } from 'pinia'
  import { useContract } from '@/contracts'

  const wallet = await useWallet()
  const wsjs = await createScrtClient('https://api.holodeck.stakeordie.com', wallet)

  const secretCounterAddress = 'secret1sfga5c35trjwvgpfz8r7mh0zfecs3y2fmgmlgr'

  export default {
    async created() {
      this.getTheCount();
    },
    data() {
      return {
        theCount: 0,
        contract: undefined
      }
    },
    computed: {
      ...mapState(useContract, ['contractAddress', 'spec']),
    },
...
</script>
```

We are now importing the newly created contract and using it to display back to us it's address and it's spec. These values do not need to be defined in the store, they are added automatically as part of the core contract definition createContract extends. 

There is also a message that is added by defualt, createViewingKey. Lets use it.

```html
<template>

...

      <hr>
      <ul>
          <li>Contract: {{contractAddress}}</li>
          <li>Spec: {{spec}}</li>
      </ul>
      <hr>
      <div>{{viewingKey}}</div>
      <button @click="createViewingKey">Create Viewing Key</button>
    </main>
  </div>
</template>

<script>
  import { coinConvert, createScrtClient, useWallet } from '@stakeordie/griptape.js'
  import { mapState, mapActions } from 'pinia'
  import { useContract } from '@/contracts'
  
...

    data() {
      return {
        theCount: 0,
        viewingKey: "No Viewing Key Yet"
      }
    },
    computed: {
      ...mapState(useContract, ['contractAddress', 'spec']),
    },
    methods: {
      ...mapActions(useContract, {
        createVKey: "createViewingKey"
      }),
      async createViewingKey() {
        this.viewingKey = await this.createVKey();
      },
    
...

</script>
```

Click create viewing_key and ... Error. Open the console and you will see and error saying that  `create_viewing_key` is and unkown variant. The reason for this is that this simpleCounter contract doesn't have viewing keys. It's a public state only app. Well, you have it to use if you need it, thats the point :🛹.

The reason to show this is to explain that you get some functions by default and so that when we start using them in the wild, you don't wonder, where did that come from?!?

## Intermission

Well, you did it! You made it to the end of Part 1 of this tutorial. Part 1 is all about showing features and explaining things at a high level with examples. I hope you enjoyed getting your hands dirty and will move on the Part 2 where we will build a real app. In Part 2 we will be moving pretty fast, but we will try to refer back to Part 1 a lot for reference.

Thanks Again, and get ready for Part 2!!!