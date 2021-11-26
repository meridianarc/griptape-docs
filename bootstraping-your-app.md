# Bootstrapping Your App

In order to start interacting with contracts, you first need to bootstrap your app. After you grip an application, your application needs to boostrap in order to have access to the account address from your Account Provider. It is important to mention that the bootstrap process should be run after you grip your application, and is commonly handled by a component in your UI.

## App States

This diagram represents how the app goes from a **not gripped app** to a **bootstrapped app**:

![bootstrap](.gitbook/assets/bootstrap.png)

* **Regular App: **Cannot interact with contracts
* **Gripped:** Can interact with contracts, but the account provider hasn't been initialized (queries that require an **account address** or **viewing key** and **messages** in general can't be called)
* **Bootstrapped:** Messages and queries that require an **account address** or **viewing key** (for queries only) now can be called.

```ts
import { bootstrap } from '@stakeordie/griptape.js';

// This will bootstrap your app
bootstrap();
```

## Vue Store Example

**Store**:

```ts
import {
  bech32,
  bootstrap,
  getAddress,
  onAccountAvailable,
  onAccountNotAvailable
} from '@stakeordie/griptape.js';
import { computed, ComputedRef, Ref, ref } from 'vue';

export interface WalletStore {
  address: ComputedRef<string | undefined>;
  humanAddress: ComputedRef<string | undefined>;
  isConnected: Ref<boolean | undefined>;
  bootstrap(): Promise<void>;
}

const address = ref<string>();
const isConnected = ref<boolean>();

onAccountAvailable(() => {
  const theAddress = getAddress();
  isConnected.value = typeof theAddress !== "undefined";
  address.value = theAddress;
});

onAccountNotAvailable(() => {
  isConnected.value = false;
});

const humanAddress = computed(() => {
  if (!address.value) return;
  return bech32(address.value, 12);
});

export function useWalletStore(): WalletStore {
  return {
    bootstrap,
    address: computed(() => address.value),
    humanAddress,
    isConnected,
  };
}
```

**Component**:

```
<template>
  <div class="wallet">
    <img src="../assets/images/wallet.svg" alt="wallet icon" />
    <span v-if="!isConnected" @click="bootstrap">Connect to Keplr</span>
    <div v-else>
      <span>{{ address }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { useWalletStore } from "@/domain/wallet-store";
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const {
      isConnected,
      bootstrap,
      humanAddress: address
    } = useWalletStore();
    return {
      isConnected,
      address,
      bootstrap
    };
  },
});
</script>
```
