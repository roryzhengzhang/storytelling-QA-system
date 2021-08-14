import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import views from './views'
import theme from './theme/theme';
import ModalProvider from 'mui-modal-provider';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <BrowserRouter>
          <Switch>
            {views.map(view => (
              <Route exact {...view.routeProps} key={view.name} />
            ))}
            <Route
              exact
              path="/"
            >
              <Redirect to="/storyselection" />
            </Route>
          </Switch>
        </BrowserRouter>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
