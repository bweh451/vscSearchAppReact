
//Created a seperate functional component GitHubUser and GitLabUser as the only endpoint I could publically access for GitLab gave me very limited user information. 
//I couldn't access the /users/:id enpoint as it requires a personal access token, which is not a requirement of the task.
//I have spoken to Pierre who handles TQS and he has said that there is no need to use a personal access token,
//and just use the information that I can find via this enpoint.

//Created a function component called GitLabUser
const GitLabUser = (props) => {

    const user = props.user;

    //Renders the GitLab user details passed as a prop in the following manner
    return(
        <div className='flexContainer'>

            <div className='profile'>

                <div className='flexContainer'><img src={user.avatar_url} alt={user.avatar_url}/></div>

                <div className='profileItem'>
                    <strong><p>ID</p></strong>
                    <p>{user.id}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Username</p></strong>
                    <p>{user.username}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Name</p></strong>
                    <p>{user.name}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>State</p></strong>
                    <p>{user.state}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Profile link</p></strong>
                    <p className="profileLink"><a href={user.web_url}>{user.web_url}</a></p>
                </div>

            </div>

        </div>
    )
}

export default GitLabUser;