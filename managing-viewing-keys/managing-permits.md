# Managing Permits

{% hint style="info" %}
Permits are stored in local storage inside an object called`griptape.js`
{% endhint %}

A permit is a free authentication message from a certain public address, like a wallet signature, permits are stored locally so you don't need to re-generate a permit.

### Add a permit

To create a permit, we must first import in our application `permitManager` from `@stakeordie/griptape.js`.

```jsx
import { permitManager } from '@stakeordie/griptape.js';
```

Next, we're going to use the `permitManager`  for this we use the `add` function, to which we're going to pass our contract and a permissions array.

```jsx
await permitManager.add(myContract, ["balance"]);
```

You can notice that within the `createPermit` function we are also using `permitManager.get()` this function returns a `boolean` indicating whether or not this account has a `permit`. In this case it already has it and we add it to the `setIsPermit` variable.

### Use a permit with the contracts API

{% hint style="info" %}
To learn more about contract definitions, click [here](../interacting-with-contracts/contract-definitions/).
{% endhint %}

Here is an example of how to use a permit in our contract definition, first we must import the APIs thet we require.

```jsx
import {
    createContract,
    snip20Def,
    extendContract
  } from '@stakeordie/griptape.js';
  
```

Now we create `myContract_permit` object, where we add the `query` called `getBalance` wich receives a `permit` object and returns in this case the `query` and the `permit`.



```jsx
  const myContract_permit = {
    queries: {
      getBalance({ permit }) {
        const query = { balance: {} }
        return {
          with_permit: { query, permit }
        }
      }
    }
  }
```

Finally we export and extend our contract.

```jsx
export const sscrt = createContract({
    at: 'secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg',
    definition: extendContract(snip20Def, myContract_permit)
  });
```
