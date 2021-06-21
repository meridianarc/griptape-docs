# Adding Wallet Support

Griptape comes with some prewired components that you can include in your app with pretty much no configuration. Currently those two components are:

- `<wallet-info>`
- `<viewing-key-info>`

We will add the `wallet-info` component to the header.

And add some markup to `/src/App.vue`

```html
<template>
  <div>
    <header>
      <div class="logo">Secret Auctions</div>
    </header>
    <main>
    </main>
  </div>
</template>

<script>

</script>

<style>

</style>
```

 Eventually griptape will come with a modular UI system to help rapidly build moderately no ugly sites, but for now just include the `style.css` :)

 With that out of the way all you need to do is add `<wallet-info/>` to `/src/App.vue` like this:

 ```html{5}
 <template>
  <div>
    <header>
      <div class="logo">Secret Auctions</div>
      <wallet-info></wallet-info>
    </header>
  </div>
<template>
```

If nothing unexpected happens you should see something close to this:

![](/tutorial-wallet-component.png)

*If the screen is blank it is most likely because the wallet you have selected doesn't exist on testnet. Add some tokens to it here [Holodeck Faucet](https://faucet.secrettestnet.io/), or select a wallet that has a testnet balance.

## It's Reactive!!

If you have another testnet wallet, switch to it. You will notice that the wallet component changes and the balance is changed automatically. Pretty cool huh!

But how does it work?

At the heart of any Griptape app are stores. When you "Grip" your app you automatically get access to the walletInfoStore which is watching for changes to the selected wallet. The `<wallet-info>` component is bound to that store, so any time you change the walletl, the component rerenders.

To see this a little more clearly, lets pull the balance from that store and render in directly in App.vue