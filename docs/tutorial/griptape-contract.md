# Griptape Contracts

## State Management and the Blockchain

For most dApps on Secret Network, Secret Contracts are the core. We took that to heart and built Griptape in a way that, as best as is possible, tries to bring the contract to the front-end. That way the front end developer can code as if they were communicating with the smart contract directly in their web app, leaving all the connecting back and forth to the framework. 

At the same time we also needed to figure out the best way to manage complex application state reactively to minimize back and forth with the chain and provide a modern ui feel without constant site refreshes.

What we realized is that for the most part we are doing everything we can to make the contract state on the chain and the state managenent layer in the app sync. And if that is the goal, why not make the contract state and the application state one and the same.

## Griptape Contract State

With that decision Griptatpe Contract State was born. Instead of having an application store that talks to the contract(s) through an api class, we make the store and the api one and the same. Here is how it works

## How it Works

1. As a developer your job is to create **Contract Definitions**. These are objects that, as close as makes sense, replicate the **state**, **queries** and **messages** of the contract they are defining.
2. **Griptape Contract Stores** are then "created", by passing the definition, and the contract address, into a `createContract` function imported from Griptape-Vue
3. The newly created Contract Stores are now accessible to components which will "use" then throught the `...mapState` and `...mapActions` methods.

Simple

## The Beauty of it all

The Beauty of this is that Contract Definition Files can become targets for automation and improved collaboration between the contract developer and the front-end developer.

- Automation in the contract definition files will be able to be scaffolded from the contract schema files.

- Collaboration in that the front-end and the backend meet in one location; a straight forward definition file that both parties can understand. And even if the contract and the front-end are being developed by the same person, the two worlds are more easily connected in a single file.

If this is all seemingly like a lot to grasp or just doesn't seem that important or even necessary, lets build one to see it in action.
