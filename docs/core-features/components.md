# Components

By default, Griptape provides with a set of helper Vue components which has some core features that are common to all
DApps.

## Wallet

DApps have the need to interact with a wallet. The default browser extension for managing wallets in
Secret Network is [Keplr](https://wallet.keplr.app/).

The gripped app will then have the ability to access some information provided by the Keplr extension, such the address
and the balance.

The `<wallet-info>` component shows the address and the balance of the user. It is **fully reactive**, that means,
whenever you change your wallet in Keplr, the component and the whole application state will update too:

```vue
<template>
  <wallet-info></wallet-info>
</template>
```

![wallet showcase](/wallet-info-showcase.png)

## Viewing Keys

For contract interaction, specially for [SNIP-20](https://github.com/SecretFoundation/SNIPs/blob/master/SNIP-20.md)
contracts, apps need to manage viewing keys. Keplr helps you manage the viewing keys in a secure way, but sometimes you
want to give the user the ability to create the viewing key while using your app in order the improve the UX experience.

For that, Griptape has a `<viewing-key-manager>` which provides a simple interace for creating viewing keys for SNIP-20
and non-SNIP-20 contracts:

```vue
<template>
  <viewing-key-manager
    :contract-address="contractAddress"
  >
  </viewing-key-manager>
</template>
```

`contractAddress` is just a string that represents the contracts address which this instance of the
`viewing-key-manager` can create viewing keys for.

![viewing keys showcase](/viewing-keys-showcase.png)
