
//Created a function that simulates a fetch function
const fetchData = async (fetch, url) =>{
    
    let result;

    //Fetched data from url specified
    const res = await fetch(url);
    
    //Checks if the status code is 404 (user not found) or 403 (api limit exceeded) [this is mainly for GitHub's api but would work for GitLab's api as well]
    //If so the result gets set to an empty object
    if(res.status === 404 || res.status === 403){
        result = {};
    }

    //Else if the status code is okay then the user object (result) gets parsed to json
    else{
        result = await res.json();
    }
  
    //Returns the result
    return result;

}

//Created a function that creates a custom repo object
const createCustomRepoObj = async (index, repoObj, vscType) => {  
      
    let customRepoObj;

    //If the vscType is equal to github
    if(vscType === "github"){

        //The following object will get created (GitHub repo object)
        customRepoObj = {
            id:  repoObj[index].id,
            name: repoObj[index].name,
            description : repoObj[index].description,
            creationDate: repoObj[index].created_at,
            lastCommitDate: repoObj[index].updated_at,
            commitMessages: []
        }
    }

    //Else the following object will get created (GitLab repo object)
    else{
        customRepoObj = {
            id:  repoObj[index].id,
            name: repoObj[index].name,
            description : repoObj[index].description,
            creationDate: repoObj[index].created_at,
            lastCommitDate: repoObj[index].last_activity_at,
            commitMessages: []
        }
    }
    
    //The object gets returned
    return customRepoObj;
}

//Exports both functions
module.exports ={
    fetchData: fetchData,
    createCustomRepoObj: createCustomRepoObj
}