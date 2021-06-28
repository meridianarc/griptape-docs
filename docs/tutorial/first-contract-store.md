## My First Contract Store

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

The contracts folder will hold all the **Contract Definition Files** we create as well as an `index.js` file where we will "create" our contract stores.

First lets just create an empty `index.js` and a `contractDef.js` file. 

```{2-3}
│  ├─ contracts
│  │  ├─ counterDef.js
│  │  └─ index.js
```

Open `counterDef.js` and add the follow:

**/src/contracts/counterDef.js**
```javascript
export const counterDef = {
  state: {},
  queries: {},
  messages: {}
}
```

This is what an empty contract definition object looks like. And although it doesn't look like much, this definition can already be used to create a contract. 

But lets add the logic from App.vue so it can do something of use.

**/src/contracts/counterDef.js**
```javascript
export const counterDef = {
  state: {
    count: undefined
  },
  queries: {
    async getCount() {
      const msg = { 'get_count': { } }
      const res = await wsjs.queryContract(this.contractAddress, msg)
      this.count = res.count
    }
  },
  messages: {
    async increment() {
      const msg = {'increment':{}}
      try {
        const res = await wsjs.executeContract(this.contractAddress, msg)
        this.count = res.count
      } catch (e) {
        
      }
      this.count = res.count
    } 
  }
}
```

That looks familiar, and good. The next step is "creating" contractDef to the `index.js` file.

**/src/contracts/index.js**
```javascript
  import { createContract } from '@stakeordie/griptape-vue.js'
  import { counterDef } from './counterDef.js'

  const contractAddress = 'secret1w97ynhe099cs5p433dvlaqhsxrszudz2n3f56h'

  const useContract = createContract('counter', contractAddress, counterDef)
```

And now finally we can refactor App.vue

Old
```html
<template>
  <div>
    <header>
      <div class="logo">GRIPTAPE.JS</div>
      <wallet-info></wallet-info>
    </header>
    <main>
      <div>Count is: {{ count }}</div>
      <button @click="increment">+</button>
    </main>
  </div>
</template>

<script>
  import { coinConvert, createScrtClient, useWallet } from '@stakeordie/griptape.js'

  const wallet = await useWallet()
  const wsjs = await createScrtClient('https://api.holodeck.stakeordie.com', wallet)

  const secretCounterAddress = 'secret1w97ynhe099cs5p433dvlaqhsxrszudz2n3f56h'

  export default {
    created() {
      this.getCount();
    },
    data() {
      return {
        count: 0
      }
    },
    methods: {
      async increment() {
        const handleMsg = {'increment':{}}
        try {
          const res = await wsjs.executeContract(secretCounterAddress, handleMsg)
        } catch (e) {
          console.log(e);
        }
        this.getCount()
      },
      async getCount() {
        const msg = {'get_count':{}}
        const res = await wsjs.queryContract(secretCounterAddress, msg)
        this.count = res.count
      }
    }
  }
</script>
```

New
```html
<template>
  <div>
    <header>
      <div class="logo">GRIPTAPE.JS</div>
      <wallet-info></wallet-info>
    </header>
    <main>
      <div>Count is: {{ count }}</div>
      <button @click="increment">+</button>
    </main>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'pinia'
  import { useCounterStore } from '@/contracts'

  export default {
    created() {
      this.getCount()
    },
    computed: {
      ...mapState(useCounterStore, ['count']),
    },
    methods: {
      ...mapActions(useCounterStore, ['getCount','increment']),
    }
  }
</script>
```

Hopefully it works, and you have now defined, created, and used a **Griptape Contract Store**. 

## What's Next

There is soooo much more. Viewing Keys, createSnip20Contract, Orchestration, and more... But lets take a break and come back for Part 2

## Intermission

Well, you did it! You made it to the end of Part 1 of this tutorial. Part 1 is all about showing features and explaining things at a high level with examples. We didn't show you everything, but we showed you enough for things to make sense. I hope you enjoyed getting your hands dirty and will move on the Part 2 where we will build a real app. In Part 2 we will be moving pretty fast, but we will try to refer back to Part 1 a lot for reference.

Thanks Again, and get ready for Part 2!!!