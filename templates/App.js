module.exports = function createAppJs() {
  return `import React from 'react'
import { connect } from 'react-redux'

function App() {
  return (
    <div className="App">
      <h2>Welcome to your new app</h2>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  // todo: state.todos[ownProps.id]
})

const mapDispatchToProps = {
  // action: action
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
`;
};
