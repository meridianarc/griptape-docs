# Events

This section is dedicated for the events callback handlers available in Griptape. As you might notice, Griptape takes over the control of how your application gets bootstrapped. By doing this, it provides with some specific events that can help you to give a richer UX/UI to your users.

## Event Handlers

Event handlers are functions that receive a callback function that will be called when an event of certain nature happen.

All event handlers have a common naming convention, all starting with `on`:

```ts
onAccountAvailable(() => {});
onAccountChange(() => {});
```

Also, all events only receive a function as a callback.

## Handle Account Events

Account events are the most basic events you will have in your application. Its use is pretty straightforward, but you need to take certain things into consideration while developing your application that we are going to cover in this section.

### Running queries that require an address

When running queries using a contract, sometimes you need to pass a user address, like so:

```ts
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

```ts
onAccountAvailable(() => {
  contract.getBalance();
});
```

## Keplr Extension Considerations

You can handle certain events that are dependent on Keplr. For example, when changing an account on Keplr, you might want to refresh the page so everything is updated for the new account properly.

```ts
onAccountChange(() => {
  window.location.reload();
});
```
