import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import Error from './components/Error';

import DocsList from './components/docs/DocsList';
import Doc from './components/docs/Doc';

import { Provider } from 'react-redux';
import store from './store';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            
            <div>
              <Routes>
                <Route path="*" element={<Error isNotFound={true} />} />

                <Route exact path='/' element={<DocsList />} />
                <Route path='/docs/:slug' element={<Doc />} />

              </Routes>
            </div>
          </Router>
        </QueryClientProvider>  
      </Provider>
    </>
  );
}

export default App;
