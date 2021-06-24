## Project Description
Griptape.js is a framework built to get Secret Network UI developers off the ground quickly. With a feature set, and opinionated design methodology, Griptape.js allows UI developers to focus on building what makes their app unique, not what every other app shares in common.

## Detailed Project Description

The challenges of developing contracts on Secret Network are well understood. Less well understood and arguably underappreciated, are the challenges of developing user interfaces for those applications. Whether it’s the current need for every developer to build the same features independently, the amount of boiler plate code required to be written for each task, or the fact that design decisions around viewing keys and state management, if done incorrectly, can lead to network wide performance issues; the need for a unified set of tools is clear. Today, with Griptape.js, we take the first step in providing those tools, and we ask for support moving forward.

## Detailed Project Description
For a detailed description, and to test out the current public beta, please visit griptapejs.com & docs.vue.griptapejs.com.

## Problem / Solution
Problem: Developing web applications on Secret Network is hard and the solutions developed are all doing the sames things in different ways, some more successfully than others.
Solution: Griptape makes it application development significantly easier by providing common components, utilities, and preconfigured libraries by default. In addition the application design methodology is opinionated helping to get all developers using it to "row in the same direction". And, by providing support and receiveing feedback from a diverse group of developers, the application will be able identify and elevate the best solutions and drop worst, making every app better in the process.

## Value capture for Secret Network Ecosystem
For better or worse web development is the entry point for the vast majority of young developers. JS tools like React, Vue, Svelte, and others have made developing for the web easier and easier. As these developers discover the power of a decentralized future, they are eager to find their place in it. We feel strongly that the growth of Secret Network depends in part on attracting these folks. If intuitive enough, they can learn to build on Secret Network quickly and stick around, if however the barrier of entry is too high, they will go elsewhere. That is why we are building griptape. To make building UIs fun and intuitive, but also to make Secret Network sticky. If we succeed, this tool will help grow our ranks with the people we need to build our product, and in turn build our network.


## Team Members
Stake or Die
  Sandy Corsillo
  Victor Valle
  Luis Espinoza
  David Rodriguez
  Others to be assigned
Community
  The project will be open source and we will welcome and encourage anyone who wants to contribute.


## Development Roadmap
#### It's Alive
Before describing the raodmap it is important to make it clear that the project is live right now. We are in public beta, we only have the vue-flavor, and a lot of features are still at an early stage, but what we have currenlty is significant. In fact we are using it internally at Stake or Die to build our own projects. So from a roadmap standpoint we are already 2 months down the road and have a significate feature set.

#### Today
- Griptape.js
- Griptape-vue.js
- Features:
  - Components
    - Wallet Component
    - Viewing Key Component
  - Utility Functions
    - CoinFormat
  - Libraries
    - wSecretJS
    - createContract



## Milestones

1. General structure of the open source repo, assess reusability of the https://github.com/terra-project/terra-sdk-python rest client modules.
2. REST api requests finalize
3. Smart contract query functionality (encrypt/decrypt steps | curve25519 equivalent in python)
4. Cosmwasmclient support
5. Signingcosmwasmclient support 
6. Documentation
7. Maintenance and streamline further development for a year - including Stargate upgrade

## Grant request
We are requesting 78,500 SCRT ($89,400 USD based on 1 week trailing average). This will pay for 12 Sprints (two weeks each). Below is the rate a position table:

| Billables                     | Sprints | Rate                    | Hours Per Sprint | Total            |
|-------------------------------|---------|-------------------------|------------------|------------------|
| Senior Full Stack Developer   | 12      |  $               35.00  | 80               |  $   33,600.00   |
| Senior Full Stack Develope    | 12      |  $               35.00  | 80               |  $   33,600.00   |
| 1 QA Engineer (80 Hours)      | 12      |  $               27.00  | 60               |  $   19,440.00   |
| 1 Technical Writer (20 Hours) | 12      |  $               25.00  | 10               |  $     3,000.00  |
| Total                         |         |                         | 230              |  $   89,640.00   |

In addition to these hours, we have provided and will provide a significant amount of work and services for no charge including:

- The initial 2 Months (4 Sprints) of development it took to get the current beta live
- 1-2 hours (depending on participation) of office hours in which Sandy and Luis will be available for support, feedback, and ideation with the community
- 1 hour bi-weekly live release and demo at conclusion of each sprint
- 3 bi-monthly "Hackathons" sponsored by Stake or Die in which a common contract will be used to develop multiple UIs
- Free video tutorials demonstrating solutions to common issues