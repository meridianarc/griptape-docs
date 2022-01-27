# Contract Definitions

### Contract Definitions

Think of contract definitions as a description about your contract: it tells about which queries and messages the contract you want to interact with has. Defining definitions is pretty straightforward. In the following sections you will understand all about definitions. After you are done with that, you will learn how to use them to create a client that will be able to interact with your contract.

Let's take a look at a basic contract definition:

```typescript
import {
  ContractDefinition,
  ContractQueryRequest
} from '@stakeordie/griptape.js';

const secretCounterDef: ContractDefinition = {
  queries:  {
    getCount(): ContractQueryRequest {
      return { get_count: {} };
    }
  }
}
```

This simple contract definition defines one query: `getCount`. A query should return a vanilla object that represent the query to perform on the instantiated contract on the blockchain.

Now that we know how to define a query, let's add a message `increment` which, when executed, will perform a transaction:

```typescript
import {
  ContractDefinition,
  ContractQueryRequest,
  ContractMessageRequest
} from '@stakeordie/griptape.js';

const secretCounterDef: ContractDefinition = {
  queries:  {
    getCount(): ContractQueryRequest {
      return { get_count: {} };
    }
  },
  messages: {
    increment(): ContractMessageRequest {
      const handleMsg = { increment: { } };
      return { handleMsg };
    }
  }
}
```

Now we have a contract definition that we could use to _create_ a _client contract_, so we will be able to call these queries and messages to the instantiated contract.
