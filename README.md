# Node.js with Express VSC search app REST API

## Table of Contents
| Sections | Links | 
| ------------- |:-------------:|
| Description | [Click Me](#description) |
| Installation | [Click Me](#installation) |   
| Usage | [Click Me](#usage) |
| Endpoints and their responses | [Click Me](#endpoints-and-their-responses) |
| Something to note | [Click Me](#something-to-note) |
| Get help | [Click Me](#get-help)
| Contribution | [Click Me](#contribution) |

## Description
This is a rest API that integrates with GitHub and GitLab API. This API serves as a backend server for a React App (found within the frontend folder) making calls to the GitHub and GitLab API's and sending data to the frontend via different endpoint.

## Installation

Clone this repository to your desired directory. Once fully downloaded you can open up the folder within you favourite IDE. Open a terminal and navigate to the directory where you've downloaded the repository and then run ```npm install```. This will download all the necessary dependencies that you need.

## Usage

After installing you can run ```npm start``` and the server should be up and running ! To test the endpoints you can use something like [Postman](https://www.postman.com/downloads/) or you can run it using the React frontend (a README file is provided within the frontend folder in order to install it)

## Endpoints and their responses

All the enpoints are GET request so there is no need for header information.

### Retrieve both GitHub and GitLab user information

#### Request

`GET /api/users/:name`

`http://localhost:4000/api/users/:name`

### Response
```
{
    gitHubUser: {userInformation...},
    gitLabUser: {userInformation...}
}

```
### Retrive repo and commit information from GitHub user

#### Request

`GET /api/users/github/repos/:name`

`http://localhost:4000/api/users/github/repos/:name`


#### Response
```
[
  {
    id: "id",
    name: "name"
    description: "description"
    creationDate: "creationDate"
    lastCommitDate: "lastCommitDate"
    commitMessages: ["msg1", "msg2", "msg3", "msg4", "msg5"]
  }
]
```

### Retrive repo and commit information from GitLab user

#### Request

`GET /api/users/gitlab/repos/:name`

`http://localhost:4000/api/users/gitlab/repos/:name`

#### Response

The response will be exactly the same as the GitHub repo response.

## Something to note

Since this REST API is only accessing public information and I'm not using a personal access token, the call rate limit for the GitHub API is only 60 calls per hour. The way you can get around it is by using a VPN. Otherwise you'll have to wait an hour to get your desired information.

## Get help

Head over to StackOverflow if you get stuck with anything. There is a ton of information there regarding Node.js and Express. I

## Contribution

I have been the sole contributor of this project.
