# Travel App Project

## Overview
This is a *capstone project* made for *Udacity Front End Web Developer Nanodegree* I took in May/June 2020. The goal of the project was to create a travel app, where user could add their trip. By entering a destination and dates, the app will display an image of the place, calculate duration and time remaining to the trip. And of course show the weather.
I fetched the data from Pixabay, Geonames and Weatherbit.

## Config
- To run this application you need your own API keys:
  - [Pixabay](https://pixabay.com/api/docs/)
  - [Weatherbit](https://www.weatherbit.io/account/create)
  - [Geonames](http://www.geonames.org/export/web-services.html) 
- Once you have it, create `.env` file and add you keys there (see `.env_sample` file to see how to add your keys)

## Installation
1. `npm i` to install dependencies
2. `npm run build-prod` to build production files
3. `npm run build-dev` to run webpack developer server
4. `npm run start` to run local node server and start the application
5. `npm run test` to test the app

## Info for reviewer
Extend your Project/Ways to Stand Out:
– Add end date and display length of trip

### List of dependencies:
1. Global dependencies:
  - "body-parser": "^1.19.0",
  - "cors": "^2.8.5",
  - "date-input-polyfill": "^2.14.0",
  - "dotenv": "^8.2.0",
  - "eslint": "^7.1.0",
  - "express": "^4.17.1",
  - "nodemon": "^2.0.4",
  - "request": "^2.88.2"

2. Dev dependencies:
  - "@babel/core": "^7.10.2",
  - "@babel/preset-env": "^7.10.2",
  - "babel-loader": "^8.1.0",
  - "babel-plugin-transform-es2015-modules-commonjs": "^6.26.2",
  - "clean-webpack-plugin": "^3.0.0",
  - "css-loader": "^3.5.3",
  - "dotenv-webpack": "^1.8.0",
  - "fetch-mock": "^9.10.3",
  - "file-loader": "^6.0.0",
  - "html-webpack-plugin": "^4.3.0",
  - "jest": "^26.0.1",
  - "mini-css-extract-plugin": "^0.9.0",
  - "node-fetch": "^2.6.0",
  - "node-sass": "^4.14.1",
  - "optimize-css-assets-webpack-plugin": "^5.0.3",
  - "path": "^0.12.7",
  - "sass-loader": "^8.0.2",
  - "style-loader": "^1.2.1",
  - "supertest": "^4.0.2",
  - "terser-webpack-plugin": "^3.0.3",
  - "webpack": "^4.43.0",
  - "webpack-cli": "^3.3.11",
  - "webpack-dev-server": "^3.11.0",
  - "webpack-merge": "^4.2.2",
  - "workbox-webpack-plugin": "^5.1.3"