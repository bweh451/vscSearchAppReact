//Created a function component called GitHubUser
const GitHubUser = (props) => {

    const user = props.user;

    //Renders the GitHub user details passed as a prop in the following manner
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
                    <p>{user.login}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Name</p></strong>
                    <p>{user.name}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Bio</p></strong>
                    <p>{user.bio === null || user.bio === '' ? "No bio specified" : user.bio}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Public repos</p></strong>
                    <p>{user.public_repos}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Followers</p></strong>
                    <p>{user.followers}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Following</p></strong>
                    <p>{user.following}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Creation date</p></strong>
                    <p>{user.created_at.substring(0, 10)}</p>
                </div>

                <div className='profileItem'>
                    <strong><p>Profile link</p></strong>
                    <p className="profileLink"><a href={user.url}>{user.url}</a></p>
                </div>

            </div>
        </div>
    )
}

export default GitHubUser;