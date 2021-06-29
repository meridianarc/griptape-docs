# Adding Wallet Support

Griptape comes with some prewired components that you can include in your app with pretty much no configuration. Currently those two components are:

- `<wallet-info>`
- `<viewing-key-info>`

We will get the viewing key component later when we start querying private state, but for now lets add the `<wallet-info>` component to the header to see what happens.

**/src/App.vue**

```html {2-9}
<template>
  <div>
    <header>
      <div class="logo">GRIPTAPE.JS</div>
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

![wallet working](/wallet-working.png)

If you have another testnet wallet, switch to it. You will notice that the wallet component changes and the balance is changed automatically. Reactivity, pretty cool huh!

## useWalletStore

So we are able to display the wallet address and balance, but how does it work?

At the heart of any Griptape app are stores. This is how all components can stay in sync without passing values around up and down the component tree. There are three types of stores. Basic, Core, and **Griptape Contract Stores**. Griptape Contract Stores will be introduced in due time, but the `usewalletStore` is the core type. There are actually 2 core stores, the other being `useViewingKeyStore` which we will discuss later. The `<wallet-info>` component is bound to that `useWalletStore`, so any time you change the wallet, the component updates.

Because the `<wallet-info>` component is fully built and lives outside of this app, it is hard follow what is going on. So lets lets pull the balance from `useWalletStore` directly and render it, just for fun.

To do this we need to first import two methods:
- `mapState`
- `useWalletStore`

**/src/App.vue**
```html{13-14}
  <template>
    <div>
      <header>
        <div class="logo">GRIPTAPE.JS</div>
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
    
  }
  </script>
```

`mapState` comes from **Pinia**, the lightweight state-management library we are useing in Griptape-vue. We will use `mapState` to get the balance out of the `useWalletStore` store. To do that we will create a computed property.


**/src/App.vue**
```html{17-19}
  <template>
    <div>
      <header>
        <div class="logo">GRIPTAPE.JS</div>
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

::: warning Note
`...mapState()` is one of two spread operators that we use to access Pinia store data. Later we will use `...mapActions()` to access, you guessed it, actions. Actions will be methods that mutate the state, among other things.
:::

Now that we have the balance we can just render it in the template.

**/src/App.vue**
```html {8}
  <template>
    <div>
      <header>
        <div class="logo">GRIPTAPE.JS</div>
        <wallet-info></wallet-info>
      </header>
      <main>
        Balance: {{ balance }}
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

## coinConvert

So that worked, but it's not so easy to read. We added a utility function called **coinConvert** to help. Here's what the code looks like:

**/src/App.vue**
```html {8,15,22-24}
  <template>
    <div>
      <header>
        <div class="logo">GRIPTAPE.JS</div>
        <wallet-info></wallet-info>
      </header>
      <main>
        Balance: {{ coinConvert(balance, 6, 'human', 2) }}
      </main>
    </div>
  </template>

  <script>
    import { mapState } from 'pinia'
    import { coinConvert } from '@stakeordie/griptape.js'
    import { useWalletStore } from '@stakeordie/griptape-vue.js'

    export default {
      computed: {
        ...mapState(useWalletStore, ['balance'])
      },
      methods: {
        coinConvert
      }
    }
  </script>
```

That's much nicer. **coinConvert** accepts:
```javascript
  coinConvert(<amount>, <decimals>, <type>('human|machine'), <precision>)
```

::: warning Note
One last thing before we talk about SecretJS and connecting to a contract. It is really helpful to install Vue DevTools so we can examine the stores we have. You can find the latest version here: [Vue DevTools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en).

![](/tutorial/wallet-support/vue-devtools.png)

If you go to the Pinia sections you can see the stores. The only ones that we currently have are useWalletStore and useViewingKeyStore, and that is expected as they are the **Core** stores. If you look at the state, you find `address`, `balance` and `isWalletReady`. This is how the `<wallet-info>`component can display the address and balance.

We use Vue DevTools all the time and you probably will too. 
:::

Okay, we learned all about the wallet component. Go ahead and remove everything from `App.Vue` getting back to its scaffold state.


**/src/App.vue**
```html
  <template>
    <div>
      <header>
        <div class="logo">GRIPTAPE.JS</div>
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
```

Great, now it's time to connect to a contract and talk to the blockchain!
