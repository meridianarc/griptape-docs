# Instantiating Contracts

You are able to instantiate contract in the blockchain if you already have uploaded a code for that contract.

Use the `instantiateContract` function and you will get a _created_ for free:

```typescript
await instantiateContract<Counter>({
  id:'counter'
  codeId: 50,
  definition: counterDef,
  label: 'griptape.js-counter-01',
  initMsg: { count: 101, addr: 'secret1hca...' }
})
```
