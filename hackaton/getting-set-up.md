# Getting Set Up

### Getting Started

1. Install Keplr
2. Add `pulsar-2` to Keplr
3. Create an account and send funds using the [faucet](https://faucet.secrettestnet.io)
4. Add custom SNIP-20 tokens to Keplr
5. Install `secretcli` and connect it to `pulsar-2`
6. Instantiate the `auction-factory` contract
7. Create auctions

### Install Keplr

Check out this video to set up you Keplr wallet.

{% embed url="https://youtu.be/HgFWNJdD7-U" %}

### Connect to `pulsar-2`

1. In order to connect to the `pulsar-2` chain, go to [https://connect.pulsar.griptapejs.com](https://connect.pulsar.griptapejs.com) and click on the "pulsar-2" button.
2. Then a Keplr window will pop up, click on the "approve" button.

![Connect to pulsar-2](../.gitbook/assets/connect-to-pulsar.gif)

### Create an account and send funds using the [faucet](https://faucet.secrettestnet.io)

Once you have Keplr installed and an account created, you con now send test tokens to your account. In order to send these tokens you will need to go the the faucet and paste your account address there.

### Add custom SNIP-20 tokens to your wallet

In order to add your custom SNIP-20 tokens, open the Keplr extension:

![Step 1/6](../.gitbook/assets/add-tokens\_1.png)

Click on the hamburger menu:

![Step 2/6](../.gitbook/assets/add-tokens\_2.png)

Click on add token:

![Step 3/6](../.gitbook/assets/add-tokens\_3.png)

Paste the contract address of the token you want to add and click the "Submit" button:

![Step 4/6](../.gitbook/assets/add-tokens\_4.png)

Click the "approve" button:

![Step 5/6](../.gitbook/assets/add-tokens\_5.png)

Check that your tokens was added:

![Step 6/6](../.gitbook/assets/add-tokens\_6.png)

### Install `secretcli` and connect it to `pulsar-2`

Go to the [Releases Page](https://github.com/scrtlabs/SecretNetwork/releases) of Secret Network [Github](https://github.com/scrtlabs/SecretNetwork) and download the latest version:

![Secret Network Releases Page](../.gitbook/assets/download-secretcli.jpeg)

### Instantiate the `auction-factory` contract

To instantiate the `auction-factory` contract, run the following command:

```shell
secretcli tx compute instantiate 2496 \
'{"entropy":"QUIza1hNOVlrYVlPQXFuWU00Vmw=","auction_contract":{"code_id":2760,"code_hash":"9D733DD6C613C354A6A86ED62C7839F25C47F942E59F590C6233BD0243D8540C"}}' \
--from <your-key-name> \
--gas 1000000 \
--label <your-label> -y
```

Where:

* `<your-key-name>` is the key assigned to you account in the `secretcli`
* `<your-label>` a unique identifier for your instantiated contract. Use whatever it makes sense for you.

### Create auctions

To create auctions you need to do a two step process.

```shell
secretcli tx compute execute secret1n3aa0kyx0e7gt0hwtqc76z7a7p2zuz0ycwpszt \
'{"increase_allowance":{"spender":"secret1n9funu0pgycntvatcewfy20232r09ks7dr0hma","amount":"1000000"}}' \
--from whale \
--gas 120000 -y
```

```shell
secretcli tx compute execute secret1n9funu0pgycntvatcewfy20232r09ks7dr0hma \
'{"create_auction":{"label":"new-auction-001","sell_contract":{"code_hash":"9587d60b8e6b078ace12014ceeee089530b9fabcd76535d93666a6c127ad8813","address":"secret18vd8fpwxzck93qlwghaj6arh4p7c5n8978vsyg"},"bid_contract":{"code_hash":"cd306596d0c5f43d99b7085c35be615dd2210c0a36bddfb4189b6a54d0906d95","address":"secret1zh5lx269gjjklsz2m32ztt95qcqve37zt3etcx"},"sell_amount":"1000000","minimum_bid":"1000000","ends_at":1643698320,"description":"This is an optional description"}}' \
--from whale \
--gas 630000 -y
```
