import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FieldSettings from './pages/field-settings/field-settings';
import MenuBar from './components/menu-bar/menu-bar';
import HomePage from './pages/home-page/home-page';
import PageNotFound from './components/page-not-found/page-not-found';
import ResultsPage from './pages/results-page/results-page';

const App = () => {
  return (
    <div className="App">
		<MenuBar />
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/results" component={ResultsPage} />
			<Route exact path="/map-fields" component={FieldSettings} />
			<Route path="*" component={PageNotFound} />
		</Switch>
    </div>
  );
}

export default App;
