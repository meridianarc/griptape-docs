---
description: >-
  Learn about how to set up your application so you can start interacting with
  contracts.
---

# 🗞 Interacting with Contracts

Contract interaction is at the core of Griptape. In order to interact with contracts we provide a couple of APIs that will make your journey way easier. There are two major things that you need to understand: Contract Definitions and Client Contract Creation.

### Introduction

Contract interaction is at the core of Griptape. In order to interact with contracts we provide a couple of APIs that will make your journey way too easier. There are two major things that you need to understand: Contract Definitions and Client Contract Creation.

### Contract Definitions

Contract definitions are the "blueprints" for the deployed contract you want to interact with; it not only defines what queries and messages you can send to the contract, but also, help you deal with common needs like passing an address, viewing keys, permits and fees.

### Client Contracts

Client contracts are objects that are created based on contract definitions. Think of them as the object responsable to send the queries and messages defined on the contract definition. It is a plain-old JavaScript object, but it is all connected with you Account Provider and the Viewing Key Manager.

###
