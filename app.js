//Imported the following for use below
const express = require("express");
const app = express();
const fetch = require('cross-fetch');
const helmet = require("helmet");
const port = process.env.PORT || 4000;

//Imported the following config file as it contains URL's of the two different APIs
const config = require("./config/config.json");

//Imported a module that contains utility functions
const utils = require ("./helpers/utils.js");

//The app uses the following to provide more security to the app
app.use(helmet());

//The app uses the following in order to parse JSON as response
app.use(express.json());

//Sends both GitHub and GitLab user objects
app.get("/api/users/:name", async (req, res) => {

    try{

        //Fetches GitHub user information
        const gitHubUserObj = await utils.fetchData(fetch, `${config.gitHubUrl}/users/${req.params.name}`);
      
        //For the following Gitlab api call I can only get a limited amount of user information.
        //In order to get more user information an I need to use the /users/:id enpoint.
        //This enpoint requires a personal access token, which is not a requirement of the task.
        //I have spoken to Pierre who handles TQS and he has said that there is no need to use a personal access token,
        //and just use the information that I can find via this enpoint.
        let gitLabUserObj = await utils.fetchData(fetch, `${config.gitLabUrl}/users?username=${req.params.name}`);

        //Checks if the gitLabUseObj is an Array
        if(Array.isArray(gitLabUserObj)){

            //If so is will check if the length is not 0
            if(gitLabUserObj.length !== 0){

                //If the gitLabUseObj gets set to the following
                gitLabUserObj = gitLabUserObj[0]
            }

            //Else the gitLabUseObj gets set to the following
            else{
                gitLabUserObj = {};
            }
           
        }
        
        //Creates a users object and set it to the following
        const users = {
            gitHubUser: gitHubUserObj,
            gitLabUser: gitLabUserObj
        }
        
        //Sends the users object to the frontend
        res.json(users);
    }
    
    //If there is an error it will be caught
    catch(err){

        //Sends the following error code including the error itself to the frontend
        res.status(500).send(err);
    }

});

//Sends a GitHub repo object including commit information
app.get("/api/users/github/repos/:name", async (req, res) => {
    
    //Created an array for use below
    const gitHubRepoArray = [];

    try{

        //Fetches 5 repos related to the user that has been searched
        const gitHubRepoObj =  await utils.fetchData(fetch, `${config.gitHubUrl}/users/${req.params.name}/repos?per_page=5`);
        
        //If the object that is returned has no information
        if(Object.keys(gitHubRepoObj).length === 0){

            //And empty array will be sent to the fontend
            res.json([]);
        }

        //Else the following will execute
        else{

            //Loops through each repo object
            for(let i = 0; i < gitHubRepoObj.length; i++){

                //Fetches 5 commit details from each repo object
                const gitHubCommitObj = await utils.fetchData(fetch, `${config.gitHubUrl}/repos/${req.params.name}/${gitHubRepoObj[i].name}/commits?per_page=5`);

                //Calls helper function to create a custom repo object
                const customGitHubRepoObj = await utils.createCustomRepoObj(i, gitHubRepoObj, "github");
                
                //Inner for loop that loops through the gitHubCommitObj
                for(let j = 0; j < gitHubCommitObj.length; j++){

                    //Adds the the last 5 commit messages to the commitMessages key inside the customGitHubRepoObj
                    customGitHubRepoObj.commitMessages.push(gitHubCommitObj[j].commit.message)
                }
                
                //Each customGitHubRepoObj gets pushed to the array created earlier
                gitHubRepoArray.push(customGitHubRepoObj);

            }

            //The array gets sent to the frontend
            res.json(gitHubRepoArray);
        }

    }

     //If there is an error it will be caught
     catch(err){

        //Sends the following error code including the error itself to the frontend
        res.status(500).send(err);
    }
   
});


//Similar to the endpoint created above, however it fetched GitLab repo and commit information instead
app.get("/api/users/gitlab/repos/:name", async (req, res) => {
    
    const gitLabRepoArray = [];

    try{
        
        const gitLabRepoObj =  await utils.fetchData(fetch, `${config.gitLabUrl}/users/${req.params.name}/projects?per_page=5`);

        if(gitLabRepoObj.length === 0){
            res.json(gitLabRepoObj);
        }
        else{

            for(let i = 0; i < gitLabRepoObj.length; i++){

                const gitLabCommitObj = await utils.fetchData(fetch, `${config.gitLabUrl}/projects/${gitLabRepoObj[i].id}/repository/commits?per_page=5`);
            
                const customGitLabRepoObj = await utils.createCustomRepoObj(i, gitLabRepoObj, "gitlab");

                for(let j = 0; j < gitLabCommitObj.length; j++){
                    customGitLabRepoObj.commitMessages.push(gitLabCommitObj[j].title)
                }
                
                gitLabRepoArray.push(customGitLabRepoObj);
                
            }

            res.json(gitLabRepoArray);
        }
    }

     //If there is an error it will be caught
     catch(err){

        //Sends the following error code including the error itself to the frontend
        res.status(500).send(err);
    }
   
});

app.listen(port);