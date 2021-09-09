# Cheatsheet

Here's the list of all the current APIs available on Griptape.js.

## Bootstrap API

```ts
import { gripApp } from '...';

gripApp(
  restUrl: string,
  providerGetter: AccountProviderGetter,
  runApp: () => void
): Promise<void>;
```

## Contracts API

```ts
import { createContract, extendContract } from '...';

createContract(spec: ContractSpecification);
extendContract(def1: ContractDefintion, def2: ContractDefinition);
```

## Viewing Keys API

```ts
import { viewingKeyManager } from '...';

viewingKeyManager.add(contract: ContractInstance, key: string);
viewingKeyManager.get(idOrAddress: string);
viewingKeyManager.set(contract: ContractInstance, key: string);
```

## Keplr Utils

```ts
import { getKeplr } from '...';

getKeplr(): Promise<Keplr | undefined>;
```

## Events API

```ts
import {
  onAccountAvailable,
  onAccountChange,
  onViewingKeyCreated
} from '...';

onAccountAvailable(callback: Callback);
onAccountChange(callback: Callback);
onViewingKeyCreated(callback: Callback);
```

## Account Provider

```ts
import {
  getKeplrAccountProvider
} from '...';

getKeplrAccountProvider(): AccountProviderGetter;
```
