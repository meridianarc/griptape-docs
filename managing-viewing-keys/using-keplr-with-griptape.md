# Using Keplr with Griptape

Griptape works along with Keplr to provide a way to get and store SNIP-20 viewing keys previously created using the `keplr.suggestToken` function. To do so, you will need to use the `keplrViewingKeyManager`

```typescript
import { keplrViewingKeyManager } from '@stakeordie/griptape.js';

const contract = ...
await keplrViewingKeyManager.add(contract);
```

The example above will call the `keplr.suggestToken` in case there is no viewing key available for that contract in Keplr and then stores it on Griptape. In case there is already a viewing key, it will just store it directly on Griptape.

`keplrViewingKeyManager` has the same API as the `viewingKeyManager` and therefore you can get the viewing key or set it:

```typescript
const key = keplrViewingKeyManager.get(contract.at);

keplrViewingKeyManager.set(contract.at);
```

Is important to mention that the `set` method of the `keplrViewingKeyManager` does not updates the viewing key that is hold by Keplr.
