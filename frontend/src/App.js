//Imported the following components for use below
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchUsers from './components/SearchUsers';
import UserDetails from './components/UserDetails';

//Functional component called App
const App = () => {

  //Returns the following
  return (
    <>
      {/* Used the BrowserRouter component to display different components on different pages */}
      <BrowserRouter>
        <Routes>

          {/* Each route displays a different component, the first two routes display the same component,
          but uses a parameter to differentiate the two (in order to display different information) */}
          <Route exact={true} path="/" element={<SearchUsers />}/>
          <Route exact={true} path="/:name" element={<SearchUsers />}/>
          <Route exact={true} path="/user/:vsc/:name" element={<UserDetails />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
