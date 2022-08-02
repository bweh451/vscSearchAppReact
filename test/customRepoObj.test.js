//Imported chai expect for use below
const expect = require('chai').expect;

//Imported cross-fetch in order to use fetch function
const fetch = require('cross-fetch');

//Imported the module function to use in test and module function being tested
const { fetchData, createCustomRepoObj } = require('../helpers/utils');


//Imported the config file that contains the URL's required for the fetch test
const config = require('../config/config.json');

describe('createCustomRepoObj module test', () => {

    it("Returns a custom repo object with all the necessary keys", async () => {

        //Calls the fetch method and sets it's return value to the gitLabRepoObjects variable
        const gitLabRepoObjects =  await fetchData(fetch, `${config.gitLabUrl}/users/creator/projects?per_page=5`);

        //Created custom variable for use below
        let customRepoObj;

        //Loops through each repo object
        for(let i = 0; i < gitLabRepoObjects.length; i++) {

            //Creates a custom object
            customRepoObj = await createCustomRepoObj(i, gitLabRepoObjects, "gitlab");

            //breaks out of the loop after the first object gets created
            break;
        }

        //Checks if an object is returned and if the object's login key's value is equal to what is expected
        expect(customRepoObj).to.have.own.property('id');
        expect(customRepoObj).to.have.own.property('name');
        expect(customRepoObj).to.have.own.property('description');
        expect(customRepoObj).to.have.own.property('creationDate');
        expect(customRepoObj).to.have.own.property('lastCommitDate');
        expect(customRepoObj).to.have.own.property('commitMessages');
    });
});
