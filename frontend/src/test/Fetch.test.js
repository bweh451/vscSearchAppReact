//Imported the following module in order to mock the fetch
import fetch from 'isomorphic-fetch';

//NOTE: Insure that the server is running
//Tests if fetching data from the specified api endpoint works (GitHub and GitLab user objects should be retrieved)
test('check if result is truthy, if an object is returned and if object has needed properties', async () => {

    //Calls fetch function making a call to the specified api endpoint (simulates the fetch)
    const res = await fetch("http://localhost:4000/api/users/creator");

    //Parses the response to json
    const result = await res.json();

    //Checks for the following in order to past the test
    expect(result).toBeTruthy();
    expect(typeof result === 'object').toBe(true);
    expect(result.hasOwnProperty('gitHubUser')).toBe(true);
    expect(result.hasOwnProperty('gitLabUser')).toBe(true);
    
});