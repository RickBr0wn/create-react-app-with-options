module.exports = function createAppJs(answers) {
  return `import React from 'react'${
    answers.cssStyles === 'styled-components'
      ? `\nimport styled from 'styled-components'`
      : ``
  }${
    answers.stateManagement === 'redux, react-redux, redux-thunk'
      ? `\nimport \{ connect \} from 'react-redux'`
      : ''
  }${
    answers.cssStyles === 'styled-components'
      ? '\n\nconst StyledContainer = styled.div`\n  /* Your CSS code goes here.. */\n`'
      : ``
  }${
    answers.cssStyles === 'styled-components'
      ? '\nconst StyledH2 = styled.h2`\n  /* Your CSS code goes here.. */\n`'
      : ``
  }

const App = () => {
  return (
    <${answers.cssStyles === 'styled-components' ? 'StyledContainer' : 'div'}>
      <${
        answers.cssStyles === 'styled-components' ? 'StyledH2' : 'h2'
      }>Welcome to your new app.</${
    answers.cssStyles === 'styled-components' ? 'StyledH2' : 'h2'
  }>
    </${answers.cssStyles === 'styled-components' ? 'StyledContainer' : 'div'}>
  )
}

${
  answers.stateManagement === 'redux, react-redux, redux-thunk'
    ? `const mapStateToProps = (state, ownProps) => (\{\n  // for example\n  // todo: state.todos[ownProps]\n\})\n\nconst mapDispatchToProps = dispatch => (\{\n  // for example\n  // increment: () => dispatch(\{type: 'INCREMENT'\})\n\})\n\nexport default connect(mapStateToProps,mapDispatchToProps)(App)`
    : 'export default App'
}
`;
};
