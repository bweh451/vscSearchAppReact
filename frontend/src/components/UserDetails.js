//Imported the following hooks and components for use below
import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import {PropagateLoader} from 'react-spinners';
import ReposDetails from "./ReposDetails";
import GitHubUser from "./GitHubUser";
import GitLabUser from "./GitLabUser";

//Created the following functional component called UserDetails
const UserDetails = () => {

    //Created the following state props
    const [repos, setRepos] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState({});

    //The following gets the state passed through the Link component on the SearchUsers page
    const location = useLocation();
    const user = location.state;
    
    //Gets the following two parameters from the current location's path
    const {vsc, name} = useParams();

    //useEffect hook that executed everytime the component is rendered
    useEffect(() => {

        //The following state props get set in the following manner
        setIsLoaded(false)
        setError({});
        setRepos({});

        //Checks if the vsc variable is equal to github
        if(vsc === "github"){

            //If so the following function gets called and the name varibale gets passed as a param
            getGitHubRepos(name);
        }

        //Else the following function gets called and the name varibale gets passed as a param
        else{
            getGitLabRepos(name);
        }

        //Added the following dependencies
    }, [vsc, name])


    //Created a function that fetches GitHub repo and commit information
    const getGitHubRepos = async (username) => {

        try{

            //Fetches the information from the follown endpoint
            const res = await fetch(`/api/users/github/repos/${username}`);

            //Checks if the response is not okay (not 400 - 500 status code)
            if(!res.ok){

                //If so the an error variable gets set to the response text
                //and the error gets thrown
                const error = await res.text();
                throw error;
            }

            //Else the following will happen
            else{

                //A result variable gets to the responses parsed json
                const result = await res.json();
                
                //The following state props get set in the following manner
                setRepos(result);
                setIsLoaded(true);
            }
 
        }

        //Cathes an error when one is thrown
        catch(err){

            //Sets the following state variables in the following manner
            setError({error: err, message: "Oops! Looks like something went wrong."});
            setIsLoaded(true);
        }
    
    }

    //Created a function that fetches GitLab repo and commit information
    const getGitLabRepos = async (username) => {

        try{

             //Fetches the information from the follown endpoint
            const res = await fetch(`/api/users/gitlab/repos/${username}`);

            //Checks if the response is not okay (not 400 - 500 status code)
            if(!res.ok){

                //If so the an error variable gets set to the response text
                //and the error gets thrown
                const error = await res.text();
                throw error;
            }

            //Else the following will happen
            else{

                //A result variable gets to the responses parsed json
                const result = await res.json();
                
                //The following state props get set in the following manner
                setRepos(result);
                setIsLoaded(true);
            }
 
        }

        //Cathes an error when one is thrown
        catch(err){

            //Sets the following state variables in the following manner
            setError({error: err, message: "Oops! Looks like something went wrong."});
            setIsLoaded(true);
        }

    }

    //If the isLoaded state prop is true and the error state prop does not contain anything
    if(isLoaded && Object.keys(error).length === 0) {

        //The following will be returned
        return(
            <div className=" flexContainer userDetails">

                <div className="details">

                    <div className="flexContainer"><h1>User details</h1></div>

                    <div className="userProfile">
                        <div className="flexContainer"><h3>User profile</h3></div>
                        {vsc === "github" ? <GitHubUser user={user} /> :  <GitLabUser user={user} />}
                    </div>

                    <div className="userRepoDetails">
                        <div className="flexContainer"><h3>User repo details</h3></div>
                        <ReposDetails repos={repos} />
                    </div>

                    <div className="flexContainer"><Link to={`/${name}`}><button id="homeBtn">Back to home page</button></Link></div>

                </div>

            </div>
        )
        
    }

    //If the isLoaded state prop is true and the error state prop does contain something
    else if(isLoaded && Object.keys(error).length !== 0){

        //The following will be returned
        return (
            <div className="flexContainer userDetailsErrorsContainer">
                <div className="flexContainer userDetailsErrors">
                    <div className="errors">
                        <h1>{error.message}</h1>
                        <div className="flexContainer"><h3>You can view this error by looking at the console.</h3></div>
                    </div>
                </div>
            </div>
        ) 
    }

    //Else the following will be returned
    else {
        return(
            <div className='flexContainer userDetailsLoadingContainer'>
                <div className='flexContainer userDetailsLoading'>
                    <div>
                        <h1>This might take a while...</h1>
                        <div className='flexContainer userDetailsLoader'>
                            <PropagateLoader color={"rgb(28, 28, 28)"} />
                        </div>
                    </div>
                </div>
            </div>
        )    
    }
    
    
}
export default UserDetails;