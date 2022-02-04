# Viewing Keys

## KeplrViewingKeyManager

### add()

**Arguments:** {[BaseContract](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/permits.ts#L5)} :  a contract specification object.

**Returns:** {string} : key.

**Usage:** This functiona ads a new viewing key by using the `suggestToken` API from Keplr.

### get()

**Arguments:**  {string} : contract id or address.

**Returns:** {object} : key.

**Usage:** Get a viewing key. This function calls `viewingKeyManager` API from GriptapeJS.

## ViewingKeyManager

### add()

**Arguments:** {[BaseContract](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/permits.ts#L5)} :  a contract specification object, {string} : a key.

**Returns:** {string} : key value.

**Usage:** This function checks that a `key` exists, if not it throws the error `'`'Empty or undefined key cannot be added'`'` and ends. If there is a `key` it gets the `account`, if there is no `account` it throws the `'No account available'` error, but if there is an account it adds the key to local storage.

### set()

**Arguments:** {[BaseContract](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/permits.ts#L5)} :  a contract specification object, {string} : a key.

**Returns:** Nothing.

**Usage:** This function updates in the local storage the received `key` for the corresponding `account`.

### get()

**Arguments:**  {string} : contract id or address.

**Returns:** {string} : key value.

**Usage:** This function gets the `key` for the received `address` or `id`.

### createKey()

**Arguments:** {[KeyForm](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L18)} : a key form.

**Returns:** {[Key](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L7)} : a key object.

**Usage:** This function creates the [Key ](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L7)object.

### addAccount()

**Arguments:** {[Account](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L13)} : an account object.

**Returns:** {object} account object.

**Usage:**This function adds the `account` to the list of accounts, but does not interact with local storage.

### getAccount()

**Arguments:**  {[Account](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L13)} : an account object.

**Returns:** {object} account object.

**Usage:** This function finds the `address` of the received account.

### isEqual()

**Arguments:** {[Key](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L7)} : a key object, {string} : contract id or address.

**Returns:** Boolean.

**Usage:** This function verifies if the `contractAdress` or `id` properties of [Key](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L7) object recived, match with the `id` or `address` recived.

### isKeyAdded()

**Arguments:** {[Key](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L7)} : a key object, {[KeyForm](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L18)} : a key form.

**Returns: Boolean.**

**Usage:** This function verifies if the `contractAdress` or `id`of [Key](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L7) object, match with the  `contractAdress` or `id`of [KeyForm](https://github.com/stakeordie/griptape.js/blob/bc5b8262c4cbf05fd4244e4a73869052e57944d6/src/viewing-keys.ts#L18) object recived.

