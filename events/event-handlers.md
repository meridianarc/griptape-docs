# Event Handlers

Event handlers are functions that receive a callback function that will be called when an event of certain nature happen.

All event handlers have a common naming convention, all starting with `on`:

```typescript
onAccountAvailable(() => {});
onAccountChange(() => {});
```

Also, all events only receive a function as a callback.
