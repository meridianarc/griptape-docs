# Boostrap

### `gripApp(`[`Config`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/bootstrap.ts#L35) `| string,` [`AccountProviderGetter`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/bootstrap.ts#L46)`, Function)`

**Arguments:**

* {[Config](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/bootstrap.ts#L35)}: Config object.
* {[AccountProviderGetter](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/bootstrap.ts#L46)}: Provider getter.
* {Function}: A function that runs your frontend app.

**Returns:** Nothing.

**Description:** Grips an application.

### `bootstrap()`

**Arguments:** No arguments.

**Returns:** Nothing.

**Description:** Bootstrap a Gripped applications, which enables the Account Provider.

### `shutdown()`

**Arguments:** No arguments.

**Returns:** Nothing.

**Description:** Shutdown the Account Provider and returns your application to a Grip state.
