import React from 'react'
import { render } from 'react-dom'
import Category from './components/MemoryList.react'
import ScrapbookApp from './components/ScrapbookApp.react'
import ReactDOM from 'react-dom'

React.render(
  <ScrapbookApp />,
  document.getElementById('scrapbook-app')
);

