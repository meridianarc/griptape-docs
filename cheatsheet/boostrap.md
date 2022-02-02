# Boostrap

### gripApp()

**Arguments:** {string}:provider's URL, {object}:provider, {function}:\[definition]

**Returns:** Nothing.

**Usage:** To use this function, first create `cosmWasmClient`, then run the application, if there is no connection it throws the error `'Not connected yet'`, if it is the case if you are connected call the provider, if everything is ok at this point we have an account available

```javascript
gripApp(restUrl, provider, runApp);
```

### boostrap()

**Arguments:** No arguments.

**Returns:** Nothing.

**Usage:** This function initializes a CosmWasm client, then gets the chain id of that client so it can set the `accountAvailable` state and finally instantiate your session in local storage.

```javascript
boostrap();
```

### shutdown()

**Arguments:** No arguments.

**Returns:** Nothing.

**Usage:** This function checks if you are connected, if you are not nothing happens. But if it's the case that you are connected then remove your connection from local storage

```javascript
shutdown();
```
