module.exports = function() {
  return `
@import url('https://fonts.googleapis.com/css?family=Roboto:100,200,400,500,700');

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit; 
}

html {
  box-sizing: border-box;
  font-size: 62.5%; 
}
  
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1.6rem;
  background-color: #ECEFF1;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}`;
};
