# Weather-Journal App Project

## Overview
This is a 3rd project made for Udacity Front End Web Developer Nanodegree I took in May/June 2020. It required me to create an asynchronous web app that uses Web API and user data to dynamically update the UI. The idea was to create a wheather journal, that will allow user to log daily mood description and weather conditions thanks to connection with OpenWeatherMap API.

## Prerequisite
- Node and Express, 
- 'cors' package and 'body-parser' package

### Optional
- Nodemon (to restart your server automatically if you were to make any changes)

## Config
- To run this application you need your own API key from https://openweathermap.org/api 
- Once you have it, create a config.js file and save it in a 'website' directory
- In the config file, enter your API key in an object like this:
```
const config = {
    MY_API_KEY : '&appid=<your_api_key_string>',
  }
```
## Installation
run 'node server' in your command line
# FEND_3_Weather-journal
