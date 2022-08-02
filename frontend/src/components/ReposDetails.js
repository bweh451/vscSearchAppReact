//Imported the following component from react bootstrap
import {Accordion} from 'react-bootstrap';

//Created the following functional component called ReposDetails
const ReposDetails = (props) => {

    const repos = props.repos;

    //Checks if the repos contains any information
    if(repos.length === 0){

        //If not the following will be displayed
        //In the case of the GitHub api, it'll also display the following when the api rate limit is exceeded
        return(
            <div className="flexContainer">
               
                <h3>No repo information available!</h3>
                
            </div>
        )
    }

    //Else the following will be displayed
    else{
        return(
            <div className='flexContainer'>
                <div className='repoDetails'>
                    <Accordion defaultActiveKey="0">

                        {/* Maps each repo item's details in the following manner */}
                        {repos.map((repo, key) => 
                            <Accordion.Item key ={key} eventKey={key}>
                                <Accordion.Header>{repo.name}</Accordion.Header>
                                <Accordion.Body>
                                    <h5>ID</h5>
                                    <p>{repo.id}</p>
                                    <h5>Name</h5>
                                    <p>{repo.name}</p>
                                    <h5>Description</h5>
                                    <p>{repo.description}</p>
                                    <h5>Creation Date</h5>
                                    <p>{repo.creationDate.substring(0, 10)}</p>
                                    <h5>Last Commit Date</h5>
                                    <p>{repo.lastCommitDate.substring(0, 10)}</p>
                                    <h5>Last Commit Messages</h5>

                                    {/* Maps the commitMessages repo element in the following manner */}
                                    <p>{repo.commitMessages.map((commitMsg, key) => <li key={key}>{commitMsg}</li>)}</p>
                                </Accordion.Body>
                            </Accordion.Item>)}
                    </Accordion>
                </div>
            </div>
        )
    }
}
export default ReposDetails;