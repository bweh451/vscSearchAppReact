//Imported the following component and renderer for use below
import SearchUsers from '../components/SearchUsers';
import renderer from 'react-test-renderer';

//Tests if the SearchUsers component renders correctly
test('Checks if the SearchUsers component renders correctly', () => {
    const tree = renderer

        //Creates a SearchUsers component 
        .create(<SearchUsers />)
        .toJSON();

    //Checks if the SearchUsers component is rendered correctly
    expect(tree).toMatchSnapshot();
});