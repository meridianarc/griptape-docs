# More On Defining Messages

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
