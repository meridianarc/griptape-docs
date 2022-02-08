# Contracts

### **`createContract(`**[`ContractSpecification`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L47)**`)`**

**Arguments:**&#x20;

* {[ContractSpecification](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L47)} : a contract specification object.

**Returns:** {T}: a Contract Client

**Description:** This function, **** iterates over all the queries and messages to which it inserts an object as the first parameter of type Context, which stores vital data of the contract such as `viewing key`, `permit` and the `address` of the wallet.

### `extendedContract(`[`ContractDefinition`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L28)`,` [`ContractDefinition`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L28)`)`

**Arguments:**&#x20;

* {[ContractDefinition](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L28)}: a contract definition.&#x20;
* {[ContractDefinition](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L28)}: a contract definition to extends.

**Returns:** {object}: extended contract.

**Description:** This function receives two objects, one the definition of our contract and the other the definition of a contract to be extended. It then calculates their messages and queries common keys using the `calculateCommonKeys` function.

Then bind base definition with extended definition, overriding the common message and queries keys with the keys of the contract to extend.

### `refContract(T)`

**Arguments:** {T}: a contract id or address.

**Returns:** {object}: contract

**Description:** This function analyzes the `contractRegistry` list, if it contains the id called `id` or the address called `at`based on the received argument, if it finds a contract, it returns the complete object, if it's no the case it returns the following message: `"No contract has been found with ID or address"`.

### `instantiateContract(`[`ContractInstantiationRequest`](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L51)`)`

**Arguments:**&#x20;

* {[ContractInstantiationRequest](https://github.com/stakeordie/griptape.js/blob/c9ac1e366497acaafbdde70defa258a7051c46db/src/contracts/types.ts#L51)}: a contract instantiation.

**Returns:** {T}: a Contract Client

**Description:** This function receives a contract request object that contains: `id`, `definition`, `codeId`, `label` and `initMsg`.&#x20;

Then, using the `instantiate` function reviews if there is an available client, if this is the case it creates an instance of the contract with the `codeId`, `label` and `initMsg`, from which it obtains the `at`value of a contract.

If there is no available customer, throw the message "`No signing client available".` Finally, all this is correct, the function calls the function `createContract`, with the contract specification created before.
