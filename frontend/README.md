# React VSC search app create using [Create react app](https://github.com/facebook/create-react-app)

## Table of Contents
| Sections | Links | 
| ------------- |:-------------:|
| Description | [Click Me](#description) |
| Installation | [Click Me](#installation) |   
| Usage | [Click Me](#usage) |
| Something to note | [Click Me](#something-to-note) |
| Get help | [Click Me](#get-help)
| Contribution | [Click Me](#contribution) |

## Description
This is a frontend application that integrates with the Node.js and Express backend REST API

## Installation

Clone this repository to your desired directory. Once fully downloaded you can open up the folder within your favourite IDE. Open a terminal and navigate to the directory where you've downloaded repository then navigate to the frontend folder and then run ```npm install```. This will download all the necessary dependencies that you need.

## Usage

Before you start the frontend folder navigate back to the backend folder (should be the root folder) make sure that all the dependecies are installed and then run ```npm start``` in order to get the server running. Only then can you navigate back to the frontend folder and run ```npm start```. The React app should open up on ```http://localhost:3000```. You will be presented with a search bar and prompted to enter user you'd like to search for. After hitting enter a loading screen will appear and then you'll see if a user has been found for each VSC or not. You can click on the ```View User Details``` button in order to view more user details. Once clicked this will take you to the user details page, where you can find all the user information and repository information. To navigate back to the home page click the ```Back to home page``` button.

## Something to note

Since this REST API is only accessing public information and I'm not using a personal access token, the call rate limit for the GitHub API is only 60 calls per hour. The way you can get around it is by using a VPN. Otherwise when the rate limit has been exceeded it the GitHub user result will show up as ```No user information available!```

## Get help

Head over to StackOverflow if you get stuck with anything. There is a ton of information there regarding React, Node.js and Express.

## Contribution

I have been the sole contributor of this project.
