import { Route, Routes, Navigate, Link } from 'react-router-dom';
import React, {Suspense} from 'react';

import AllQuotes from './pages/AllQuotes';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import Comments from './components/comments/Comments';
import LoadingSpinner from './components/UI/LoadingSpinner';


//import NewQuote from './pages/NewQuote';
//if you want to load NewQuote Page only when user visits it:
const NewQuote = React.lazy(() => import('./pages/NewQuote'));

//import QuoteDetail from './pages/QuoteDetail';
const QuoteDetail = React.lazy(() => import('./pages/QuoteDetail'))

//Must wrap the stuff that uses lazy loading with the Suspense component


function App() {
  return (
    <Layout>

      <Suspense fallback={<div><LoadingSpinner/></div>}>
      <Routes>
        <Route path='/' element={<Navigate replace to='/quotes' />} />
        <Route path='/quotes' element={<AllQuotes />} />
        <Route path='/quotes/:quoteId' element={<QuoteDetail />}>
          <Route
            path=''
            element={
              <div className='centered'>
                <Link className='btn--flat' to={`comments`}>
                  Load Comments
                </Link>
              </div>
            }
          />
          <Route path={`comments`} element={<Comments />} />
        </Route>
        <Route path='/new-quote' element={<NewQuote />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
