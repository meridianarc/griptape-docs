# Boostrap

### gripApp()

**Arguments:** {[Config](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/bootstrap.ts#L35)}:provider's URL, {[AccountProviderGetter](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/bootstrap.ts#L46)}:provider, {function}:\[definition]

**Returns:** Nothing.

**Usage:** To use this function, first create `cosmWasmClient`, then run the application, if there is no connection it throws the error `'Not connected yet'`, if it is the case if you are connected call the provider, if everything is ok at this point we have an account available

### boostrap()

**Arguments:** No arguments.

**Returns:** Nothing.

**Usage:** This function initializes a CosmWasm client, then gets the chain id of that client so it can set the `accountAvailable` state and finally instantiate your session in local storage.

### shutdown()

**Arguments:** No arguments.

**Returns:** Nothing.

**Usage:** This function checks if you are connected, if you are not nothing happens. But if it's the case that you are connected then remove your connection from local storage
