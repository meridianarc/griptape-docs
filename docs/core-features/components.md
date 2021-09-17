# Components

By default, Griptape provides a set of core Vue components for features that are common to all
Dapps.

## Wallet

Dapps need to interact with a wallet. For Secret Network, [Keplr](https://docs.keplr.app/) is the de facto
wallet, and so the wallet enabled by default.

When you grip a Vue application with Griptape, the [Keplr wallet extension](https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap)
should be installed in order to boostrap your application.

The gripped app will then have the ability to access some information provided by the Keplr extension, such the address
and the balance.

The `<wallet-info>` component shows the address and the balance of the user. It is **fully reactive**, that means,
whenever you change your wallet in Keplr, the component and the whole application state will update as well:

```vue
<template>
  <wallet-info></wallet-info>
</template>
```

![wallet showcase](/wallet-info-showcase.png)

## Viewing Keys

Viewing keys are required on Secret Network whenever state is private. Griptape provides a way to store viewing keys and a component, `<viewing-key-manager>`, for creating and referencing them. 

```vue
<template>
  <viewing-key-manager
    :contract-identifier="contractAddress"
  >
  </viewing-key-manager>
</template>
```

`contractAddress` is just a string that represents the contracts address which this instance of the
`<viewing-key-manager>` can create viewing keys for. In addition of using the `contractAddress`, you
can use the contract `id` to tell the viewing key manager which contract to use:


```js
const myContractDef = { ... };
export const myContract = createContract('myContract', 'secret...', myContractDef);
```

```vue
<template>
  <viewing-key-manager
    contract-identifier="myContractId"
  >
  </viewing-key-manager>
</template>
```

Griptape's `<viewing-key-manager>` use the `createViewingKey()` method that is part of any Griptape Contract by default.
We will discuss Griptape Contracts in a the Contracts section. A contract definition can, however, override this default
`createViewingKey()` method. An example to this is a [SNIP-20](https://github.com/SecretFoundation/SNIPs/blob/master/SNIP-20.md)
contract where the functionality of creating or getting a viewing key can be yielded to Keplr, and then stored locally for efficient access.

**Default Viewing Key Creation**

![viewing keys showcase](/viewing-keys-showcase.png)

**SNIP-20 Viewing Key Creation**

![viewing keys showcase](/viewing-keys-showcase.png)
