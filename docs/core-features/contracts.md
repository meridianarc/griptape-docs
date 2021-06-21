# Contracts

Contracts are essential when working with dApps. Secret Network has also its own challenges when doing interacting with
contracts. For that, we created a uniform, yet known way of interacting with contracts.

## Contract anatomy

To interact with a contract in Griptape, you need first to create its definition:

```ts
interface ContractBaseDefinition {
  state: object
  messages: object
  queries: object
}

interface ContractDefinition extends ContractBaseDefinition {
  spec: 'base' | 'snip-20'
  contractAddress: string
}
```

For example, you can define a contract definition for the [secret-counter](https://github.com/enigmampc/secret-counter)
secret contract:

```js
const secretCounter = {
  state: {
    count: undefined,
    owner: undefined
  },

  messages: {
    increment() { ... }
    reset() { ... }
  },


  queries: {
    getCount() { ... }
  }
}
```

## Instantiating contracts


Once you have a contract definition, you can _instantiate_ the contract by using the `createContract` helper method:

```js
import { createContract } from '@stakeordie/griptape-vue.js'

// The address which the contract is available in the blockchain
const secretCounterAddress = 'secret1lqdx8va86f9cff5dsz28l97x20z67qv7d4npj8'

// The contract definiton for `secret-counter`
const secretCounter = { ... }

const instance = createContract('anId', secretCounterAddress, secretCounter)
```

In order to create a contract you need to provide a unique id for that contract, an address for that specific instance
of the contract and the contract definition.

## Implicit state

A contract definition has access to the following state by default:

```js
interface DefaultState {
  contractAddress: string
  spec: 'base' | 'snip-20'
}
```

Therefore, while defining your contract definition, you can access those properties by using `this` in the messages and
queries functions (following the example above):

```js
const secretCounter = {
  ...

  messages: {
    increment() {
      this.contractAddress // secret1lqdx8va86f9cff5dsz28l97x20z67qv7d4npj8
      this.spec // base
    }
  }
}
```

## Interacting with the contract

Messages and queries are the functions in which we can interact with a contract to modify its state. This
methods have access to a special object that have the ability to call the contract on the blockchain. This object is
called the `scrtClient`, and is accessable by `this`.

### Queries

An example of a query would be:

```js
const secretCounter = {
  ...

  queries: {
    async getCount() {
      // Create the query message
      const queryMsg = { 'get_count': { } }

      // Use `queryContract` from `scrtClient` to query the contract
      const res = await this.scrtClient.queryContract(this.contractAddress, queryMsg)

      // Modify the state
      this.count = res.count.count
    }
  }
}
```

### Messages

An example of a message would be:

```js
const secretCounter = {
  ...

  messages: {
    async increment() {
      // Create the handle message
      const handleMsg = { 'increment': { } }

      // Use `executeContract` from `scrtClient` to execute a transaction
      await this.scrtClient.executeContract(this.contractAddress, handleMsg)

      // At the end you may want to update the state again
      await this.getCount()
    }
  }
}
```
