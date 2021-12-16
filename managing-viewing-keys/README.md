# Managing Viewing Keys

Griptape has a way to manage viewing keys in an efficient way, so you don't need to care about how to securely store them, and also how to use it when interacting with contracts. In this section you will learn how to use it.

## Using Keplr

Griptape also provides a wrapped version of the `viewingKeyManager` that uses Keplr to add and get viewing keys:

```typescript
import { keplrViewingkeyManager, ... } from '@stakeordie/griptape.js';
const sefi = refContract<...>(...);
await keplrViewingkeyManager.add(sefi);
keplrViewingkeyManager.get(sefi.at);
```
