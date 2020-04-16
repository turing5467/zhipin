import React from 'react';
import Header from './components/header/index';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store'
import Home from './views/home'
import Jobs from './views/jobs'
import CPNDetail from './views/company/detail'
import JobDetail from './views/jobs/detail'
import Company from './views/company'
import Footer from './components/footer'
import CityBox from './components/city-box'
import Register from './views/register'
import Login from './views/login'
import Resume from './views/resume'
import Setting from './views/setting'


function App() {
  return (
    <Provider store={store}>
    <div className="App search-job-list-wrap">
      <Router>
      <Header />
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
        </Switch>
      <Footer />
      <CityBox />
      </Router>
      
    </div>
    </Provider>
  );
}

export default App;
