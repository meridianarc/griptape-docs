---
description: This section goes over some advanced features for interacting with contracts.
---

# More on Definitions

### Introducing Context

`queries` and `messages` requires certain request parameters in order to be executed, e.g.

```typescript
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

```typescript
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

```typescript
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

```typescript
// Passing a page size
await sefi.getTransferHistory(20);
```

{% hint style="info" %}
Defining the context for all your `queries` and `messages` is a good practice even if you don't use them. You can also use `_` as an identifier to express what is not being used by that `query` or `message`:

```typescript
 getAllowance(
  _: Context, // We are not using the context in this query
  owner: string,
  spender: string,
  key: string
): ContractQueryRequest {
  return { allowance: { owner, spender, key } };
},
```
{% endhint %}

### More on Defining Messages

When writing messages in your contract definition, you have the following options to pass to each message:

```typescript
interface ContractMessageRequest {
  handleMsg: Record<string, unknown>;
  memo?: string;
  transferAmount?: { amount: string, denom: string };
  fees?: number;
}
```

So if you want to pass a custom fee for this message you do:

```typescript
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



When writing messages in your contract definition, you have the following options to pass to each message:

```typescript
interface ContractMessageRequest {
  handleMsg: Record<string, unknown>;
  memo?: string;
  transferAmount?: { amount: string, denom: string };
  fees?: number;
}
```

So if you want to pass a custom fee for this message you do:

```typescript
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
