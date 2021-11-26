# Interacting with Contracts

In this section you will learn about how to interact with an instantiated contract deployed in Secret Network. Griptape.js offers an abstraction layer for contracts, so querying and performing transactions over them is as easy as a kickflip.

## Contract Definitions

In order to interact with a contract, you first need to create its definition.

Let's take a look at a basic contract definition:

```ts
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

```ts
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

Now we have a contract definition that we could use to _create_ a contract, so we will be able to call these queries and messages to the instantiated contract.

## Creating Contracts

Once we have a contract definition, we can _create_ a contract. Creating a contract in Griptape.js is simply using the `createContract` function and passing the following data:

```ts
import {
  ContractDefinition,
  ContractMessageResponse,
  createContract
} from '@stakeordie/griptape.js';

interface SecretCounter {
  getCount(): Promise<{ count: number }>;
  increment(): Promise<ContractMessageResponse>;
}

const secretCounterDef: ContractDefinition = {
  queries: { ... }
  messages: { ... }
};

const secretCounter = createContract<SecretCounter>({
  id: 'counter',
  at: 'secret1w97ynhe099cs5p433dvlaqhsxrszudz2n3f56h',
  definition: secretCounterDef
});
```

Now you can do:

```ts
const queryRes = await secretCounter.getCount();
// or
const messageRes = await secretCounter.increment();
```

Now you are able to interact with contracts!

## Definitions In-Depth

This sections goes over some advanced features for interacting with contracts.

### Introducing Context

`queries` and `messages` requires certain request parameters in order to be executed, e.g.

```ts
const sefi: ContractDefinition = {
  queries: {
    getBalance() {
      // `address` and `key` are required for this query
      return { balance: { } };
    }
  }
}
```

For this cases, Griptape provides any `query` or `message` a `Context` object as the first parameter of the function:

```ts
import { Context, ... } from '@stakeordie/griptape.js';

const sefi: ContractDefinition = {
  queries: {
    // Using context to get the `address` and `key`
    getBalance(ctx: Context) {
      const address = ctx.address;
      const key = ctx.key;
      return { balance: { address, key } };
    }
  }
}
```

Also, you can define parameters at the right of a `query` or `message`:

```ts
import { Context, ... } from '@stakeordie/griptape.js';

const sefi: ContractDefinition = {
  queries: {
    getTransferHistory(
      ctx: Context,
      page_size: number
    ): ContractQueryRequest {
      return { transfer_history: { address, key, page_size } };
    },
  }
}
```

So you can pass those as arguments when you call the method of a _created_ contract:

```ts
// Passing a page size
await sefi.getTransferHistory(20);
```

{% hint style="info" %}
Defining the context for all your `queries` and `messages` is a good practice even if you don't use them. You can also use `_` as an identifier to express what is not being used by that `query` or `message`:
{% endhint %}

```ts
getAllowance(
  _: Context, // We are not using the context in this query
  owner: string,
  spender: string,
  key: string
): ContractQueryRequest {
  return { allowance: { owner, spender, key } };
},
```

### Built-In Definitions

Griptape has SNIP-20 and SNIP-721 compliant contract definitions, so you don't need to write them yourself.

```ts
import {
  createContract,
  Snip20Contract
  Snip721Contract,
  snip20Def,
  snip721Def,
} from '@stakeordie/griptape.js'

const anSnip20 = createContract<Snip20Contract>({
  id: '...',
  at: '...',
  definition: snip20Def
});

const anSnip721 = createContract<Snip721Contract>({
  id: '...',
  at: '...',
  definition: snip721Def
});
```

### Extending Contract Definitions

Contract definition can be extended, in the same sense a class can inherit from another class in Object-oriented programming, by using the `extendContract` function:

```ts
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

### More on Defining Messages

When writing messages in your contract definition, you have the following options to pass to each message:

```ts
interface ContractMessageRequest {
  handleMsg: Record<string, unknown>;
  memo?: string;
  transferAmount?: { amount: string, denom: string };
  fees?: number;
}
```

So if you want to pass a custom fee for this message you do:

```ts
const def = {
  messages: {
    coolMessageName(...): ContractMessageRequest {
      const fees = 1_000_000;
      const memo = 'My Custom Memo';
      const transferAmount = { amount: '...', denom: '...' };
      const handleMsg = { ... };
      return { handleMsg, fees, memo, transferAmount };
    }
  }
}
```

## Contract Registry

All contracts _created_ by the `createContract` are added to the Contract Registry. By doing this, you will be able to get access to any contract at any moment, by using the `refContract` function:

```ts
import { refContract, ... } from '@stakeordie/griptape.js';

const sefi = createContract({ id: 'sefi', ... });

// Reference a contract by its ID
await refContract('sefi').getBalance();
await sefi.getBalance();

refContract('sefi') === sefi; // true
```

## Multi Message Execution

{% hint style="danger" %}
This feature is experimental.

Function names might change since version `0.7.0`
{% endhint %}

Multi message execution gives you the ability to perform cross-contract multi messages. That means that you can execute multiple messages and sign all at once. Griptape offers a way to perform multi messages using the `multiMessage` and `Message` functions:

```ts
await multiMessage([
  message(sust, sust.depositTo, '1000000'),
  message(sust, sust.depositTo, '2000000')
]);
```

The `multiMessage` function takes an array of `MultiMessageInfo`, which you can construct using the `message` function. Then you use any created contract and pass it along with the transaction you want to perform and the arguments that it has at the end (as a `var args`).

## Utilities

### Instantiating Contracts

You are able to instantiate contract in the blockchain if you already have uploaded a code for that contract.

Use the `instantiateContract` function and you will get a _created_ for free:

```ts
await instantiateContract<Counter>({
  id: 'counter',
  codeId: 50,
  definition: counterDef,
  label: 'griptape.js-counter-01',
  initMsg: { count: 101, addr: 'secret1hca...' }
})
```
