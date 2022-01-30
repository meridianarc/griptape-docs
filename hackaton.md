---
description: Check out what you need to start hacking! 🛹
---

# 💻 Hackaton

### Getting Started

1. Install Keplr
2. Add `pulsar-2` to Keplr
3. Create an account and send funds using the [faucet](https://faucet.secrettestnet.io)
4. Install `secretcli` and connect it to `pulsar-2`
5. Add custom SNIP-20 tokens to Keplr
6. Instantiate the `auction-factory` contract
   1. What is a contract?
   2. What is a factory contract?
7. Create auctions

### Install Keplr



1\. Install secretcli

2\. Configure your secretcli

bash

secretcli config chain pulsar-2

secretcli config node tcp://rpc.pulsar.griptapejs.com

secretcli config output json

3\. Add tokens to Keplr

4\. Instantiate the auction factory contract

```bash
secretcli tx compute instantiate 2496 \
'{"entropy":"hola","auction_contract":{"code_id":1986,"code_hash":"477D30BF933D82AC233A13927EABAD4730DFCD1E0714EEA75A9F4DE26A631870"}}' \
--from test-account-first \
--label scrt-auction-factory-test-01
```

