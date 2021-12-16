# Multi-Message Execution

{% hint style="danger" %}
This feature is experimental.

Function names might have changed since version `0.7.0`
{% endhint %}

Multi message execution gives you the ability to perform cross-contract multi messages. That means that you can execute multiple messages and sign all at once. Griptape offers a way to perform multi messages using the `multiMessage` and `Message` functions:

```typescript
await multiMessage([
  message(sust, sust.depositTo, '1000000'),
  message(sust, sust.depositTo, '2000000')
]);
```

The `multiMessage` function takes an array of `MultiMessageInfo`, which you can construct using the `message` function. Then you use any created contract and pass it along with the transaction you want to perform and the arguments that it has at the end (as a `var args`).
