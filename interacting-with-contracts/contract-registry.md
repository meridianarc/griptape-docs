# Contract Registry

All contracts _created_ by the `createContractClient` are added to the Contract Registry. By doing this, you will be able to get access to any contract at any moment, by using the `refContract` function:

```typescript
import { refContract, ... } from '@stakeordie/griptape.js';

const sefi = createContractClient({ id: 'sefi', ... });

// Reference a contract by its ID
await refContract('sefi').getBalance();
await sefi.getBalance();

refContract('sefi') === sefi; // true
```
