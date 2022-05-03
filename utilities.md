# ⚒ Using Utilities

Griptape has many other utilities to help you solve some of the most common but non-trivial problems you will find while developing your application. Here we are going through some of them briefly.

## Numbers

It is common in dApps to perform operations on big numbers. Most of these numbers are represented in strings, which for some cases formatting and handling a proper way for displaying them might cause some problems. For that you have a `coinConvert` function to help you manage those cases:

```typescript
// Note this is part of griptape.js not griptpae-vue.js!
import { coinConvert } from '@stakeordie/griptape.js'
const bigNumber = '15000001645000'
coinConvert(bigNumber, 6, 'human') // 15000001.645
coinConvert(bigNumber, 6, 'human', 2) // 15000001.65
coinConvert(bigNumber, 6, 'machine') // 15000001645000
```

## Formatting

Formatting addresses and viewing keys is very common in Secret Network dApps. `bech32` can help abbreviate those:

```typescript
import { bech32 } from '@stakeordie/griptape.js'
const address = 'secret1jajwgdsfv8e88utlgxjndlvcm8aldyn3ecsk72'
bech32(walletAddress, 16) // secret1j...n3ecsk72
bech32(walletAddress, 24) // secret1jajwg...aldyn3ecsk72
```

## Accounts

Here are some features that will help you get information about the account that is connected to your app.

The `getAddress()` function is imported directly from `'@stakeordie/griptape.js'` and it's enough to declare a variable and assign the result of this function. `getAddress()` will help you know the `address` of the account connected to your application.

```javascript
import { getAddress } from '@stakeordie/griptape.js'
const address = getAddress()
```

If you want to know the more information about the account connected to your application, the function `getWalletInfo()` should suffice.

```javascript
import { getWalletInfo } from '@stakeordie/griptape.js'
const walletInfo = getWalletInfo()
```

To find out if you have an available account connected to your application, you can use the `isAccountAvailable()` function which will return a boolean value depending on the status of the account.

```javascript
import { isAccountAvailable} from '@stakeordie/griptape.js'
const isAvailable = isAccountAvailable()
```
