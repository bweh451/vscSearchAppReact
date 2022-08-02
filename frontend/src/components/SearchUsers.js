//Imported the following hooks and components for use below
import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import {PropagateLoader} from 'react-spinners';
import Results from './Results';

//Created a functional component called SearchUsers
const SearchUsers = () => {

    //Created the following state props
    const [username, setUsername] = useState("");
    const [users, setUsers] = useState({});
    const [error, setError] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    //Gets the name parameter from current location path
    const {name} = useParams();

    //useEffect hook that executed everytime the component is rendered
    useEffect(() => {

        //If the name variable has a value
        if(name){
            
            //The following state props get set as follows
            setUsers({});
            setError({});
            setIsLoaded(false);
            setIsSubmitted(true);
            setUsername(name);

            //The following function gets called and the name variable gets passed as a param
            getUsers(name);
           
        }

        //Added the following dependency
    }, [name])

    //Created the following function
    const handleChange = (e) => {

        //The form input box is empty
        if(e.target.value === ""){

            //The following state prop gets set to false
            setIsSubmitted(false);
        }

        //Sets the user username to what the user has entered in the form input box
        setUsername(e.target.value);
    }

    //Created the following function that gets executed when a user clicks on the form's submit button
    const handleSubmit = (e) => {

        //The following state props gets set in the following manner
        setUsers({});
        setError({});
        setIsLoaded(false);
        setIsSubmitted(true)

        //Prevents page from refreshing
        e.preventDefault();

        //Callse the following function and passes in the username state prop as a param
        getUsers(username);
    }

    //Created a function that fetches user information
    const getUsers = async (username) =>{

        try{
            //Fetches from the following enpoint
            const res = await fetch(`/api/users/${username}`);

            //Checks if the response is not okay
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
                setUsers(result);
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

    //Created the following variable for use below
    let element;

    //If the following state props are true
    if (isSubmitted && isLoaded){

        //The element gets set to the following
        element = (
            <>
                <Results users={users} username={username} error={error}/>
            </>
        )
        
    }
    
    //If the isSubmitted state prop is true and the isLoaded state prop is false
    else if(isSubmitted && !isLoaded){

        //The element gets set to the following
        element = (
            
            <div className='loading'>
                <h2>This might take a while...</h2>
                <div className='flexContainer loader'>
                    <PropagateLoader color={"rgb(28, 28, 28)"} />
                </div>
            </div>
        )
    }

    //Else the element gets set to the following
    else{
        element = (
            <>
                <h2>Please enter a username you'd like to search for</h2>
            </>
        )
    }
    
    //The component returns the following
    return(

        <div className='searchContainer'>

            <div className='search'>

                <div className='flexContainer'><h1>VCS Search App</h1></div>

                <div className=' flexContainer searchFormContainer'>

                    <form onSubmit={handleSubmit}>
                        <input type="text" value={username} onChange={handleChange}/>
                        <div className='flexContainer'><button type="submit">SEARCH</button></div>
                    </form>

                </div>

                <div className='flexContainer results'>
                    {/* The element variable gets show here */}
                    {element}
                </div>

            </div>

        </div>
    )
}

export default SearchUsers;