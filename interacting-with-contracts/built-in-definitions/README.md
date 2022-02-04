# Built-In Definitions

Griptape has SNIP-20 and SNIP-721 compliant contract definitions, so you don't need to write them yourself.

```typescript
import {
  createContractClient,
  Snip20Contract
  Snip721Contract,
  snip20Def,
  snip721Def,
} from '@stakeordie/griptape.js'

const anSnip20 = createContractClient<Snip20Contract>({
  id: '...',
  at: '...',
  definition: snip20Def
});

const anSnip721 = createContractClient<Snip721Contract>({
  id: '...',
  at: '...',
  definition: snip721Def
});
```
