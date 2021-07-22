import './App.css';
import { Switch, Route } from 'react-router-dom';
import modules from './modules'


function App() {
  return (
    <div>
      <Switch>
        {modules.map(module => (
          <Route {...module.routeProps} key={module.name} />
        ))}
      </Switch>
    </div>
  );
}

export default App;
