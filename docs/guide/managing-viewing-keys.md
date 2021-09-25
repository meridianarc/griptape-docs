# Managing Viewing Keys

Viewing keys are an essential piece of Secret Network. They gives users the ability to decrypt and access private data
in a Secret Contract. Griptape has a way to manage viewing keys in an efficient way, so you don't need to care about
how to securely store them, and also how to use it when interacting with contracts. In this section you will learn how
to use it.

## Viewing Key Manager

::: warning
Is important to mention, that when interacting with contracts, viewinng keys exposed by the `Context` should be
registered using the `viewingKeyManager` in order to queries have the viewing key available.
:::

The viewing key manager is an object provided by Griptape to create, set and get viewing keys for an specific contract.

For adding a viewing for an specific contract, use the `add` function:

```ts
import { viewingKeyManager, ... } from '@stakeordie/griptape.js';
const sefi = refContract<Snip20Contract>('sefi');
viewingKeyManager.add(sefi, 'api_key_J41LMWYXaZqknjcmaex...');
```

In case you want to update a viewing key for an specific contract, use the `set` function:

```ts
viewingKeyManager.set(sefi, 'api_key_J41LMWYXaZqknjcmaex...');
```

And finally, you can get the viewing key using the `get` function:

```ts
const key = viewingKeyManager.get(sefi.at);
```

## Using Keplr

Griptape also provides a wrapped version of the `viewingKeyManager` that uses Keplr to add and get viewing keys:

```ts
import { keplrViewingkeyManager, ... } from '@stakeordie/griptape.js';
const sefi = refContract<...>(...);
await keplrViewingkeyManager.add(sefi);
keplrViewingkeyManager.get(sefi.at);
```
