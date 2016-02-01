import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import Category from './components/MemoryList.react'
import ScrapbookApp from './components/ScrapbookApp.react'
import ReactDOM from 'react-dom'

React.render(
  <ScrapbookApp />,
  document.getElementById('scrapbook-app')
);

React.render((
  <Router history={browserHistory}> 
    <Route path="/" component={ScrapbookApp}>
      <Route path="/category/:name" component={Category} /> 
    </Route>
  </Router>
), document.getElementById('body'));
