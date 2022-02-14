# Events

### `onAccountAvailable(`[`EventCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)`):` [`CleanListenerCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)``

**Arguments:**

* {[EventCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)}

**Returns:**

* {[CleanEventListenerCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)}

**Description:** Event handler that listens when the Keplr extension has loaded and an address is available.

### `onAccountChange(`[`EventCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)`):` [`CleanListenerCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)``

**Arguments:**

* {[EventCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)}

**Returns:**

* {[CleanEventListenerCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)}

**Description:** Event handler that listens when switching accounts and a new account gets selected.

### `onAccountNotAvailable(`[`EventCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)`):` [`CleanListenerCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)``

**Arguments:**

* {[EventCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)}

**Returns:**

* {[CleanEventListenerCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)}

**Description:** Event handler that listens and executes if the Keplr extension is not installed.

### `onAccountDisconnect(`[`EventCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)`):` [`CleanListenerCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)``

**Arguments:**

* {[EventCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)}

**Returns:**

* {[CleanEventListenerCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)}

**Description:** Event handler that listens when the `shutdown` function gets called.

### `onViewingKeyCreated(`[`EventCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)`):` [`CleanListenerCallback`](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)``

**Arguments:**

* {[EventCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L16)}

**Returns:**

* {[CleanEventListenerCallback](https://github.com/stakeordie/griptape.js/blob/main/src/events/index.ts#L17)}

**Description:** Event handler that listens when a new viewing key is created using the `viewingKeyManager.add()` or `keplrViewingKeyManger.add()` methods.
