# Viewing Keys

## KeplrViewingKeyManager

### `add(`[`BaseContract`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/permits.ts#L5)`)`

**Arguments:**&#x20;

* {[BaseContract](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/permits.ts#L5)}:  a contract specification object.

**Returns:** {string} : key.

**Description:** This functiona ads a new viewing key by using the `suggestToken` API from Keplr.

### `get(string)`

**Arguments:** &#x20;

* {string}: contract id or address.

**Returns:** {object} : key.

**Description:** Get a viewing key. This function calls `viewingKeyManager` API from GriptapeJS.

## ViewingKeyManager

### `add(`[`BaseContract`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/permits.ts#L5)`, string)`

**Arguments:**&#x20;

* {[BaseContract](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/permits.ts#L5)}:  a contract specification object
* {string} : a key.

**Returns:** {string} : key value.

**Description:** This function checks that a `key` exists, if not it throws the error `'`'Empty or undefined key cannot be added'`'` and ends. If there is a `key` it gets the `account`, if there is no `account` it throws the `'No account available'` error, but if there is an account it adds the key to local storage.

### `get(string)`

**Arguments:**  {string} : contract id or address.

**Returns:** {string} : key value.

**Usage:** This function gets the `key` for the received `address` or `id`.

### `set(`[`BaseContract`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/permits.ts#L5)`, string)`

**Arguments:**&#x20;

* {[BaseContract](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/permits.ts#L5)}:  a contract specification object
* {string}: a key.

**Returns:** Nothing.

**Description:** This function updates in the local storage the received `key` for the corresponding `account`.

