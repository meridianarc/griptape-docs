# Adding Wallet Support

Griptape comes with some prewired components that you can include in your app with pretty much no configuration. Currently those two components are:

- `<wallet-info>`
- `<viewing-key-info>`

We will get the viewing key component later when we start querying private state, but for now lets add the `wallet-info` component to the header to see what happens.

**/src/App.vue**
```html {2-9}
<template>
  <div>
    <header>
      <div class="logo">Secret Auctions</div>
      <wallet-info></wallet-info>
    </header>
    <main>
    </main>
  </div>
</template>

<script>
  export default {

  }
</script>

<style>

</style>
```

If nothing unexpected happens you should see something close to this:

![](/tutorial/wallet-support/wallet-component.png)

*If the screen is blank it is most likely because the wallet you have selected doesn't exist on testnet. Add some tokens to it here [Holodeck Faucet](https://faucet.secrettestnet.io/), or select a wallet that has a testnet balance.

## It's Reactive!!

If you have another testnet wallet, switch to it. You will notice that the wallet component changes and the balance is changed automatically. Pretty cool huh!

But how does it work?

At the heart of any Griptape app are stores. When you "Grip" your app you automatically get access to the walletInfoStore which is watching for changes to the selected wallet. The `<wallet-info>` component is bound to that store, so any time you change the wallet, the component updates.

To see this a little more clearly, lets pull the balance from that store and render in directly in App.vue

To do this we need to first import two libraries:

Pinia, our state managment library.

And useWalletStore, the pinia store that the wallet-info component is boudn to.

**/src/App.vue**
```javascript
  <template>
    <div>
      <header>
        <div class="logo">Secret Auctions</div>
        <wallet-info></wallet-info>
      </header>
      <main>
      </main>
    </div>
  </template>

  <script>
  import {mapState} from 'pinia'
  import { useWalletStore } from '@stakeordie/griptape-vue.js'

  export default {
    
  }
  </script>
```

Now we can get access to the Wallet Store. To do that we will create a computed property that gets the `balance` property.


**/src/App.vue**
```javascript
  <template>
    <div>
      <header>
        <div class="logo">Secret Auctions</div>
        <wallet-info></wallet-info>
      </header>
      <main>
      </main>
    </div>
  </template>

  <script>
  import { mapState } from 'pinia'
  import { useWalletStore } from '@stakeordie/griptape-vue.js'

  export default {
    computed: {
      ...mapState(useWalletStore, ['balance'])
    }
  }
  </script>
```
*Note
`...mapState()` is a common pattern used to access the state of a Pinia Store. Later we will use `...mapActions()` to access Pinia Actions that mutate the state, among other things.

Now that we have the balance we can just render it in the template.

**/src/App.vue**
```javascript {8}
  <template>
    <div>
      <header>
        <div class="logo">Secret Auctions</div>
        <wallet-info></wallet-info>
      </header>
      <main>
        {{ balance }}
      </main>
    </div>
  </template>

  <script>
  import { mapState } from 'pinia'
  import { useWalletStore } from '@stakeordie/griptape-vue.js'

  export default {
    computed: {
      ...mapState(useWalletStore, ['balance'])
    }
  }
  </script>
```

![](/tutorial/wallet-support/balance-machine.png)

So that worked, but it's not so easy to read. We added a utility function called **coinConvert** to help. Here's what the code looks like:

**/src/App.vue**
```javascript {8, 15, 21-23}
  <template>
    <div>
      <header>
        <div class="logo">Secret Auctions</div>
        <wallet-info></wallet-info>
      </header>
      <main>
        {{ convertedBalance }}
      </main>
    </div>
  </template>

  <script>
  import { coinConvert } from '@stakeordie/griptape.js'
  import { mapState } from 'pinia`
  import { useWalletStore } from '@stakeordie/griptape-vue.js'

  export default {
    computed: {
      ...mapState(useWalletStore, ['balance']),
      convertedBalance() {
        return coinConvert(this.balance, 6, 'human', 2);
      }
    }
  }
  </script>
```

That's much nicer. **coinConvert** accepts `(value, decimals, 'humanm|machine', roundedToXDecimals)

Okay that showed something, but we don't really need it so lets just delete `{{ balance }}` and the other useWallet stuff, and even mapState, we will need it again soon enough, but lets keep things clean. We will leave coinConvert though, as we always need that :🛹.

**/src/App.vue**
```javascript {8, 15, 21-23}
  <template>
    <div>
      <header>
        <div class="logo">Secret Auctions</div>
        <wallet-info></wallet-info>
      </header>
      <main>
      </main>
    </div>
  </template>

  <script>
  import { coinConvert } from '@stakeordie/griptape.js'

  export default {
    computed: {
    }
  }
  </script>
```

One last thing before we talk about SecretJS and connecting to a contract. Just for fun lets console.log out the the useWalletStore Object so we can see whe we have.


We recommend that you install Vue DevTools to inspect you app in development. Here is what you will find if you open it and select Pinia

![](/tutorial/wallet-support/vue-devtools.png)

This then gives you a window into the store and it's current state. This will be more and more helpful as we go along.

Next it's time to connect to a contract and talk to the blockchain!