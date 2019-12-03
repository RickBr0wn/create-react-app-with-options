module.exports = function createIndexJs({ stateManagement }) {
  return `import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

${
  stateManagement === 'redux, react-redux, redux-thunk'
    ? `import store from './store.js'
import \{ Provider \} from 'react-redux'
import \{ BrowserRouter as Router \} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <Provider store=\{store\}>
      <App />
    </Provider>
  </Router>
, document.getElementById('root'))
`
    : `ReactDOM.render(<App />, document.getElementById('root'));`
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

`;
};
