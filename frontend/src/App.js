import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Error from './components/Error';

import DocsList from './components/docs/DocsList';
import Doc from './components/docs/Doc';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          
          <div>
            <Routes>
              <Route path="*" element={<Error isNotFound={true} />} />

              <Route exact path='/' element={<DocsList />} />
              <Route path='/docs/:slug' element={<Doc />} />

            </Routes>
          </div>
        </Router>  
      </Provider>
    </>
  );
}

export default App;
