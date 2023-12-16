import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from './containers/Home';
import About from './containers/About';
import Card from './containers/Card'; 

import JobsList from './components/jobs/JobsList';
import AddJob from './components/jobs/AddJob';
import Job from './components/jobs/Job';

import Docs from './containers/Docs';

import Stall from './containers/Stall';

import Login from './containers/Login';
import Activate from './containers/Activate';
import Signup from './containers/Signup';
import ResetPassword from './containers/ResetPassword';
import ResetPasswordConfirm from './containers/ResetPasswordConfirm';

import { Provider } from 'react-redux';
import store from './store';

import Layout from './hocs/Layout';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          
          <div>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/card' element={<Card />} />
              <Route path='/docs' element={<Docs />} />

              <Route path='/jobs' element={<JobsList />} />
              <Route path='/jobs/add' element={<AddJob />} />
              <Route path='/jobs/:id' element={<Job />} />
              

              <Route path='/stall' element={<Stall />} />

              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/activate/:uid/:token' element={<Activate />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
            </Routes>
          </div>
        </Router>  
      </Provider>
    </>
  );
}

export default App;
