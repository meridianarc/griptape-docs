# Boostrap

### `gripApp`

```typescript
gripApp(Config | string, AccountProviderGetter, () => void): Promise<void>
```

#### **Arguments**

* {[Config](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/bootstrap.ts#L35)}: Configuration object or the REST URL of the node you want to connect to.
* {[AccountProviderGetter](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/bootstrap.ts#L46)}: An account provider getter.
* {Function}: A `runApp` function.

#### **Returns**

Nothing.

#### Description

Grips an application by providing the configuration&#x20;

### `bootstrap`

```typescript
bootstrap(): Promise<void>
```

#### **Arguments**

None.

#### **Returns**

Nothing.

#### **Description**

Bootstraps a gripped application by enabling the `AccountProvider` and waiting for an address to be available. At this point, the application is now _bootstrapped_ meaning that the `AccountProvider` will self-bootstrap after page reloads.

### `shutdown`

```
shutdown(): void
```

#### **Arguments**

None.

#### **Returns**

Nothing.

#### **Description**

Return the application to a _gripped_ state, therefore, the `AccountProvider` won't self-bootstrap after page reloads.
