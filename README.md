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
4. `npm run start` to run local node server 
5. `npm run test` to test the app