# Permits

### `enablePermit(`[`BaseContract`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L45)`, string[])`

**Arguments:**&#x20;

* {[BaseContract](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L45)}: a contract specification object&#x20;
* {string\[]}: string permissions array.

**Returns:** Nothing.

**Description:** This function receives a contract object and a permissions array, then gets the contract `address` so it can check in local storage if that contract has permit.  If the contract does not have a permit, then an encrypted signature is created with your wallet, which is then sent to the contract, which is able to validate whether that signature is yours or not.

Finally, the permit is added to the local storage.

### `hasPermit(`[`BaseContract`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L45)`)`

**Arguments:**&#x20;

* {[BaseContract](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L45)}: a contract specification object.

**Returns:** Nothing.

**Description:** This function receives a contract object, then gets its `address` so it can check in local storage if that contract has permit if so it returns `true`, otherwise it returns `false`.
