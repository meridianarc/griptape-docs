# Adding and getting viewing keys

{% hint style="danger" %}
It's important to mention that when interacting with contracts, viewing keys exposed by the `Context`should be registered using the `viewingKeyManager` in order for queries to have the viewing key available.
{% endhint %}

The viewing key manager is an object provided by Griptape to create, set and get viewing keys for an specific contract.

For adding a viewing for an specific contract, use the `add` function:

```typescript
import { viewingKeyManager, ... } from '@stakeordie/griptape.js';
const sefi = refContract<Snip20Contract>('sefi');
viewingKeyManager.add(sefi, 'api_key_J41LMWYXaZqknjcmaex...');
```

In case you want to update a viewing key for an specific contract, use the `set` function:

```typescript
viewingKeyManager.set(sefi, 'api_key_J41LMWYXaZqknjcmaex...');
```

And finally, you can get the viewing key using the `get` function:

```typescript
const key = viewingKeyManager.get(sefi.at);
```
