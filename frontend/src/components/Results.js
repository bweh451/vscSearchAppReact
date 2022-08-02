//Imported the following component from react-router-dom
import { Link } from 'react-router-dom';

//Created a functional component called Results
const Results = (props) => {

    //Created variables related to the props that have been passed to this component
    const {gitHubUser, gitLabUser} = props.users;
    const username = props.username;
    const error = props.error;
    
    //Checks if there is any information within the errors object
    if(Object.keys(error).length !== 0){

        //If there is information the following will be returned
        return(

            <div className='result'>
                <div className='errors'>
                    <div className="flexContainer"><h2>{error.message}</h2></div>
                    <div className="flexContainer"><h4>You can view this error by looking at the console.</h4></div>
                </div>
            </div>
            
        )
    }

    //Else the following will be returned
    else {

        return(
            <div className='userLinks'>

                <div className='link'>

                    <h2>GitHub</h2>

                    {/* Checks if the user object contains any information (this means user has not been found or the API rate limit has been exceeded) */}
                    {Object.keys(gitHubUser).length === 0 ? 

                        // If not the following will be returned
                        <div className='flexContainer noUser'><p>No user account available!</p></div> : 

                        //Else the following will be returned
                        <div><p>A user account has been found!</p> <p>You can click the button below to view their user details.</p>

                        {/* Link is used to link to user details page, passing in the user through its state and passing the username as a parameter */}
                        <Link to={`/user/github/${username}`} state={gitHubUser}><button className='userDetailsBtn'>View User Details</button></Link></div>}
                        
                </div>

                <div className='link'>

                    <h2>GitLab</h2>
                    
                    {/* Checks if the user object contains any information */}
                    {Object.keys(gitLabUser).length === 0 ?
                    
                        // If not the following will be returned
                        <div className='flexContainer noUser'><p>No user account available!</p></div> :
                        
                        //Else the following will be returned
                        <div><p>A user account has been found!</p> <p>You can click the button below to view their user details.</p>

                        {/* Link is used to link to user details page, passing in the user through its state and passing the username as a parameter */}
                        <Link to={`/user/gitlab/${username}`} state={gitLabUser}><button className='userDetailsBtn'>View User Details</button></Link></div>}
                </div>

            </div>
        )
    }
}

export default Results;