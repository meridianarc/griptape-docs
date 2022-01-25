# Extending Contract Definitions

Contract definition can be extended, in the same sense a class can inherit from another class in Object-oriented programming, by using the `extendContract` function:

```typescript
import {
  createContract,
  extendContract,
  snip20Def,
  Snip20Contract
} from '@stakeordie/griptape.js';

const myDef = { ... };

// The result definition contains all queries and messages from the
// `Snip20Def` plus all queries and messages from `myDef`
const extendedDef = extendContract(snip20Def, myDef);

createContract({
  ...
  definition: extendedDef
});
```

All common methods between contract definitions are overrided by the methods on the second parameters of the `extendContract` function.
