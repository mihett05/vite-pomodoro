# Vite Pomodoro 
Vite Pomodoro - time-management app built with React, Firebase and Vite

## Features
1. Pomodoro sessions with multiple users
2. Updates in real time
3. Customizable session and break time

## Used technologies
1. 🔥 Firebase - fast and easy way of development app
2. 🕹 Vite - faster and has better performance than CRA
3. ☢️ Typescript - type checking and 🤘
4. 🎨 Chakra UI - beautiful and responsive UI library


## How does timer work?
All calculation of timer are processed in session owner browser

## Running locally
Install deps
```shell script
npm install
# or
yarn install
```

#### Development
```shell script
npm start
# or
yarn start
```

Open [localhost:3000](http://localhost:3000/)

#### Build
```shell script
npm run build
# or
yarn build
```

## Deploy
Log in firebase

```shell script
firebase login
```

Build react app

```shell script
npm run build
# or
yarn build
```

Deploy at Firebase Hosting
```shell script
firebase deploy
```
