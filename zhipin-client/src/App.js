import React , {lazy, Suspense}from 'react';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import Header from './components/header/index';
import Footer from './components/footer';

const Home = lazy(() => import('./views/home'))

const Login = lazy(() => import('./views/login'))

const Register = lazy(() => import('./views/register'))

const Jobs = lazy(() => import('./views/jobs'))

const Company = lazy(() => import('./views/company'))

const CityBox = lazy(() => import('./components/city-box'))

const Resume = lazy(() => import('./views/resume'))

const Setting = lazy(() => import('./views/setting'))

const Chat = lazy(() => import('./views/chat'))

const CPNDetail = lazy(() => import('./views/company/detail'))

const JobDetail = lazy(() => import('./views/jobs/detail'))



function App() {
  return (
    <Provider store={store}>
      <div className="App search-job-list-wrap">
        <Router>
          <Header />
          <Suspense fallback={<div>loading...</div>}>
            <Switch>
              <Route path='/' exact component={Home}></Route>
              <Route path='/jobs' component={Jobs}></Route>
              <Route path='/company'exact component={Company}></Route>
              <Route path="/company/:code" component={CPNDetail} />
              <Route path="/job_detail/:code" component={JobDetail} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/resume" component={Resume} />
              <Route path="/setting" component={Setting} />
              <Route path="/chat" component={Chat} />
            </Switch>
            <CityBox />
          </Suspense>
        <Footer />
          
        </Router>
        
      </div>
    </Provider>
  );
}

export default App;
