# 🕢 Handling Events

This section is dedicated for the events callback handlers available in Griptape. As you might notice, Griptape takes over the control of how your application gets bootstrapped. By doing this, it provides with some specific events that can help you to give a richer UX/UI to your users.

### Keplr Extension Considerations

You can handle certain events that are dependent on Keplr. For example, when changing an account on Keplr, you might want to refresh the page so everything is updated for the new account properly.

```typescript
onAccountChange(() => {
  window.location.reload();
});
```
