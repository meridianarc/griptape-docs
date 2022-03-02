---
description: >-
  This section goes over how to use and store viewing keys and permits using
  Griptape.
---

# 🔑 Using Viewing Keys and Permits

Viewing keys and permits are one of the most unique feature of Secret Network. It authorizes queriers for contracts to access account specific data, providing a layer for security and compliance of the data stored in the contract.

In order to manage viewing keys and permits, Griptape uses the local storage on the browser to locally access them when querying contracts. It also integrates natively with Keplr, therefore enabling already created viewing keys to be added to your application. There are many benefits of doing this as you will see in the next sections of this guide, but essentially, this set of APIs closes the gap between using viewing keys while making queries on your contracts.
