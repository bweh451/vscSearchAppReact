//Imported chai expect for use below
const expect = require('chai').expect;

//Imported cross-fetch in order to use fetch function
const fetch = require('cross-fetch');

//Imported the module function being tested
const { fetchData } = require('../helpers/utils');

//Imported the config file that contains the URL's required for the fetch test
const config = require('../config/config.json');

describe('fetchData module test', () => {

    it("Returns a GitHub user object and value of name key is 'Creator'", async () => {

        //Calls the fetch method and sets it's return value to the gitHubUserObj variable
        const gitHubUserObj = await fetchData(fetch, `${config.gitHubUrl}/users/creator`);

        //Checks if an object is returned and if the object's login key's value is equal to what is expected
        expect(gitHubUserObj).to.be.a("object");
        expect(gitHubUserObj.name).to.equal('Creator');
    });
});
