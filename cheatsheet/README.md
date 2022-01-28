# 🔀 API Reference

Here's the list of all the current APIs available on Griptape.js.

## Bootstrap API

```typescript
import { gripApp } from '...';

gripApp(
  restUrl: string,
  providerGetter: AccountProviderGetter,
  runApp: () => void
): Promise<void>;
```

## Contracts API

```typescript
import { createContract, extendContract } from '...';

createContract(spec: ContractSpecification);
extendContract(def1: ContractDefintion, def2: ContractDefinition);
```

## Viewing Keys API

```typescript
import { viewingKeyManager } from '...';

viewingKeyManager.add(contract: ContractInstance, key: string);
viewingKeyManager.get(idOrAddress: string);
viewingKeyManager.set(contract: ContractInstance, key: string);
```

## Keplr Utils

```typescript
import { getKeplr } from '...';

getKeplr(): Promise<Keplr | undefined>;
```

## Events API

```typescript
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

```typescript
import {
  getKeplrAccountProvider
} from '...';

getKeplrAccountProvider(): AccountProviderGetter;
```
