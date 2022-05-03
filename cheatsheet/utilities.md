# Utilities

### `getAddress`()

**Arguments:**

None.

**Returns:**

* {string} : address.

**Description:** This function does not receive any arguments, but internally it uses the `provider` and takes the `chainId` to obtain the `address` of the connected account. This function returns a string containing that `address`.

### `getWalletInfo`()

**Arguments:**

None.

**Returns:**

* {[WalletInfo](https://github.com/stakeordie/griptape.js/blob/19a447b4464f05b32399c3518e57339860a7d733/src/bootstrap.ts#L53)} : a WalletInfo object.

**Description:** This function does not receive any arguments, but internally it uses the `provider` and takes the `chainId` to obtain the `address` and the `name` of the connected account. This function returns a [WalletInfo ](https://github.com/stakeordie/griptape.js/blob/19a447b4464f05b32399c3518e57339860a7d733/src/bootstrap.ts#L53)object containing the `address` and `name` of the connected account.

### `isAccountAvailable`()

**Arguments:**

None.

**Returns:**

* {boolean} : account state.

**Description:** This function does not receive any arguments and returns a boolean value according to the account state.
