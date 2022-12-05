![Logo](https://github.com/optimazme/frontend/blob/main/static/github_readme_logo.png?raw=true)

# Optimaz #

## Summary ##

A token-gated timed Metaverse maze scavenger hunt. Each maze benefits a different charity and the images that are found come with words that can be redeemed and used as a prompt to generate an AI image at the end of the game. 



## Overview ##
Optimaz.me players get a uniquely immersive experience as they hunt for the images within the maze. It is a straight forward experience where, with a couple of clicks, users are able to explore the world on their own.

Users get a unique game pass for playing the game, and they can mint AI art that will have the chance to be shown in subsequent play throughs of the maze where other players will have the opportunity to purchase them. Half of the proceeds from every game pass or AI art NFT purchase goes to the benefitting charity. The donations will be made through The Giving Block.

The experience of hunting for images is fun on its own. Given more time we would love to add more features and utilities to make this a truly special experience when giving to charities.

## How to Play ##
### Step 1: We are using the Optimism blockchain. For many reasons.
![You had me at cheap gas](https://www.optimaz.me/memes/cheap_gas.png)

<br>

### Step 2: Before you go to our website make sure that you use a [reliable website](https://app.optimism.io/bridge/deposit) to bridge your Ethereum to Optimism
![Cross the bridge with us](https://www.optimaz.me/memes/crossing_bridge.png)

<br>

### Step 3: Go to our website: [https://www.optimaz.me](https://www.optimaz.me), and click on play!
![our homepage](https://www.optimaz.me/memes/homepage.png)

<br>

### Step 4: Switch your Metamask wallet to Optimism
![Metamask on Optimism](https://www.optimaz.me/memes/metamask.png)

<br>

### Step 5: Buy your Game Pass
![Buy Screen](https://www.optimaz.me/memes/buy_pass.png)

<br>

### Step 6: Enter into the maze
![Enter Maze](https://www.optimaz.me/memes/enter_maze.png)

<br>

### Step 7: Play the Game

**Navigation**: You can use your arrow keys and WASD to move forward and backwards. You can use your mouse to grab the screen and change where you're looking.

**Side Panel**: You can see the images that you've found, and how much time you have left. The game ends when you either run out of time or have found all of the images in the maze.

**End Screen**:
![Enter Maze](https://www.optimaz.me/memes/congratulations.png)

<br>

### Step 8: You can mint the words that you rescued from the maze, and the resulting image will have the chance to be shown to future players of the game!

## Team ##

Amy Detwiler


Nate Weeks


Ry


Satyam


## Technologies Used

* Frontend - NuxtJS (VueJS)
* Backend - NestJS
* Lottery Contract - Solidity
* NFT Collections - NiftyKit
* Metaverse - AFrame
* 3D object creation - TinkerCAD
* AI art generation - Stable Diffusion



## Frontend Build Setup

You will need to fill out your own .env file with the appropriate variables

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

```

The backend is actually separate and so you'll have to have it running in a different terminal tab/window

follow the README instructions in the optimaz-backend folder to setup the backend.

### hackathon Information
This project was build as a part of Encode's Metaverse Hackathon Challenge [details](https://encodeclub.notion.site/30f747c055eb4e5f935d46b595150e0b?v=97eb36e8fa2e4440bd0bb2db48e7527a)

| challenge | Description | how we met it |
| ----------- | ----------- | ----------- |
| Overall Challenge | Build a project related to the metaverse on any chain, any client, and excited to see games  | Optimaz.me is a timed maze game with game passes on Optimism, and self-hosted on Optimaz.me. The metaverse is built with [aframe](https://aframe.io/), a wrapper for three.js, and makes building out a Metaverse very easy|
| ----------- | ----------- | ----------- |
| 
Optimism:
Build NFT / Gaming Projects with Optimism | Onboarding experience, User Experience, Ecosystem Integration, innovative, public works | Our website is a straight forward experience in a metaverse, and rewards the players by allowing them to mint an additional NFT as a result of their gameplay. 50% of the proceeds will be going to the designated charity |
| ----------- | ----------- | ----------- |
| OpenSea API | creative uses of seaport and OS api | We chose to make this an Optimism project, which isn't compatible with the OpenSea API quite yet. However, we made art using an alternative AI art tool and sold it on Ethereum so that we can display more options to the users on the end screen after gameplay. We were able to use OpenSea API to find the NFTs and SeaPort to get their current price |
| ----------- | ----------- | ----------- |
| NiftyKit: Token-Gated Experience | Use the DropKit SDK to create a token-gated experience | Users are prompted to buy a game pass before entiring the timed maze. This uses the NiftyKit DropKit and we used the NiftyKit split contracts to properly split where all of the money should be going.|
| ----------- | ----------- | ----------- |
| NiftyKit: Dynamic NFTs | use the Reveal API | We're actually using the reveal API once for the game passes, and once for the AI art generated NFTs. We're using their API to programmatically update the metadata of both NFTs. The game pass gets the game results updated in the metadata, and the AI art gets the art filled out so that it is on display |


### Next Steps

- Forming our team as a nonprofit. Using gamification online for charity can be an extremely efficient way to raise funds. We will be focusing on simple games with straight forward utility that we can turn into learning materials to help onboard new people into the Web3 space.

- Raffles for NFTs. 5% of each game pass is set aside for giving back directly to the artist community. Extra entries will be granted to those that own multiple game passes and AI generated art produced by our games.

- More Mazes. This is meant to benefit as many charities as possible, and each maze will have different themed prompts and AI art as a result.

- Mobile friendly version of this maze. There's no navigation right now for mobile users.
