import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import modules from './modules'
import theme from './theme/theme';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          {modules.map(module => (
            <Route {...module.routeProps} key={module.name} />
          ))}
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
