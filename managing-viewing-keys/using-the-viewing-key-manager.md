# Using the viewing key manager

A viewing key manager is an object provided by Griptape to manage viewing keys in a centralized way. This is definitely a helper utility and is not necessary for you to manage viewing keys using this API. One advantage of using this API is that it integrates directly with the contracts API.

Here we have some examples to better understand how the API works.

{% hint style="danger" %}
It's important to mention that when interacting with contracts, viewing keys exposed by the `Context`should be registered using the `viewingKeyManager` in order for queries to have the viewing key available.
{% endhint %}

### Add viewing key

```typescript
import { viewingKeyManager, ... } from '@stakeordie/griptape.js';
const sefi = refContract<Snip20Contract>('sefi');
viewingKeyManager.add(sefi, 'api_key_J41LMWYXaZqknjcmaex...');
```

### Replace viewing key

```typescript
viewingKeyManager.set(sefi, 'api_key_J41LMWYXaZqknjcmaex...');
```

### Get viewing key

```typescript
const key = viewingKeyManager.get(sefi.at); // Either a contract address or the id of the contract client
```

### Remove viewing key

```typescript
viewingKeyManager.remove(sefi.at) // Either a contract address or the id of the contract client
```
