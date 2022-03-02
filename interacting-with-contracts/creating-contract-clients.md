# Creating Contract Clients

Once we have a contract definition, we can _create_ a _client contract_. Creating a _client contract_ in Griptape is simply using the `createContractClient` function and pass in the following data:

```typescript
import {
  ContractDefinition,
  ContractMessageResponse,
  createContractClient
} from '@stakeordie/griptape.js';

interface SecretCounter {
  getCount(): Promise<{ count: number }>;
  increment(): Promise<ContractMessageResponse>;
}

const secretCounterDef: ContractDefinition = {
  queries: { ... }
  messages: { ... }
};

const secretCounter = createContractClient<SecretCounter>({
  at: 'secret1w97ynhe099cs5p433dvlaqhsxrszudz2n3f56h',
  definition: secretCounterDef
});
```

Now you can do:

```typescript
const queryRes = await secretCounter.getCount();
// or
const messageRes = await secretCounter.increment();
```

Now you are able to interact with contracts!
