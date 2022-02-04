---
description: In this section of the guide, we go through how to use and handle events.
---

# 🕢 Handling Events

Griptape has a built-in emitted-based event model that help developers to improve the UX of their app. There is a set of events that you can listen to, for example, when the account from the Account Provider is available (after the `bootstrap` function is being called) among others. This section explains how and when you might need to use this events, and how to properly managed, so you can use whenever you want.

### What is an Event?

In Griptape, events are situations that as an app developer you might be interested in. All events in Griptape are either _emitted_ or _listened. Emitted_ events are all handled by Griptape. On the other hand you might want to _listen_ to them. There is a set of functions that you can use to listen to specific events; we call them _Event Handlers._ Let's go through some of them.

### Anatomy of listening to events

In order to listen to a specific event, you will need first to import an _Event Handler_. All _Event Handlers_ are named with a prefix `on` like `onAccountAvailable` or `onAccountChange`. In addition to that, all _Event Handlers_ receive a function as its first argument and return a function that stop listening to the event.

```typescript
import { onAccountAvailable } from '@stakeordie/griptape.js';

const stopListen = onAccountAvailable(() => {});
stopListen();
```

Once you start listen for a specific event, the callback passed as the first argument will be called every time the event happens. Once you don't want to listen to the event anymore, you can call the function returned by the Event Handler.

### Running queries that require an address

When running queries using a Contract Client, sometimes you need to pass a user address, like so:

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
const contract = createContract<...>({
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
