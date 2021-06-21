# State

One of the principles behind in Griptape design is related to state management. Centralization for state is not
necessary for all applications, but Griptape, takes advantage of this pattern to provide a more rich UX/UI experience,
which not all of dApps takes into account when interacting with 3rd party extensions and many common functionality such
as the viewing keys management.

In order to provide such state management, Griptape uses [Pinia](http://pinia.esm.dev/) as its state management
provider.

## Access wallet state

You can access the wallet state for things like the current user address and its balance. This state is mutated by the
Keplr extension, so you are is reactive by default:

```vue
<template>
  Wallet address {{ address }}

  <br>

  Wallet balance {{ balance }}
</template>

<script>
import { useWalletStore as wallet } from '@stakeordie/griptape-vue.js'
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(wallet, [
      'address',
      'balance'
    ])
  }
}
</script>
```

## Access viewing keys state

Access to viewing is kind of the same. You can get the viewing keys for all the different contracts your app interacts
with:

```vue
<template>
  <ul>
    <li v-for="(vk, idx) in viewingKeys" :key="idx">
      Contract address: {{ vk.contractAddress }}<br>
      Wallet address: {{ vk.walletAddress }}<br>
      key: {{ vk.key }}
    </li>
  </ul>
</template>

<script>
import { useViewingKeyStore as vk } from '@stakeordie/griptape-vue.js'
import { mapState } from 'pinia'

export default {
  computed: {
    ...mapState(vk, [
      'viewingKeys'
    ])
  }
}
</script>

```
