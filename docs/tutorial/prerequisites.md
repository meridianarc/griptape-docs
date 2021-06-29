# Prerequisites

## High Level

This tutorial assumes that you are familiar with basic web technologies (HTML/CSS) and Javascript. Knowing Vue.js would be a big help, but you can probably follow along without it. Who knows, maybe you will like what you see and decide to learn more.

Additionally we don't assume you have worked with SecretJS before or even built any blockchain apps before. However, this isn't a tutorial in blockchain, or even really in whats going on under the hood with SecretJS or Secret Network more broadly. It's here to get you building fast to show you what the potential is. So if things confuse you, we are sorry.

## Required Software

**Node.js and NVM/NVS**: 

You will need to install Node.js. We also recommend [nvm](https://github.com/nvm-sh/nvm) (Unix/Mac) or [nvs](https://github.com/jasongin/nvs) (Windows). They let you switch between node versions. To install both we recommend these links:

- [https://nodejs.org/en/download/package-manager/#nvm](https://nodejs.org/en/download/package-manager/#nvm) for Unix/Mac
- [https://nodejs.org/en/download/package-manager/#nvs](https://nodejs.org/en/download/package-manager/#nvs) for Windows

**Yarn**

Node.js comes bundled with npm, but we like Yarn. If you want to use Yarn too, the good news is you can get Yarn with npm:

```bash
npm install --global yarn
```

**Checkup**

```bash
$ node --version ↵
v15.0.1

$ yarn --version ↵
1.22.10
```
Got something like that, you are good to go!

Well, actually you will need to switch Node versions, good thing we install nvm!

```bash
$ nvm use 14 ↵
Now using node v14.16.1 (npm v6.14.12)
```

Now you're go to go!
