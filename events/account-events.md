# Account Events

Account events are the most basic events you will have in your application. Its use is pretty straightforward, but you need to take certain things into consideration while developing your application that we are going to cover in this section.

### Running queries that require an address

When running queries using a contract, sometimes you need to pass a user address, like so:

```typescript
// Build the definition
const def: ContractDefinition = {
  queries: {
    getBalance(ctx: Context) {
      const address = ctx.address;
      return { balance: { address } };
    }
  }
}

// Create the contract
const contract = createContract({
  id: 'contract',
  at: '...',
  definition: def
});

// Call `getBalance`
contract.getBalance();
```

The only issue with this approach is that sometimes the `address` hasn't been resolved by the `AccountProvider`(when using Keplr, for example). To prevent this query from failing, wrap it under the `onAccountAvailable` event:

```typescript
onAccountAvailable(() => {
  contract.getBalance();
});
```
