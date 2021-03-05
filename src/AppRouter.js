import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LogInPage from './components/Pages/LogInPage';
import RedirectPage from './components/Pages/RedirectPage';
import AboutUsPage from './components/Pages/AboutUsPage';
import SettingsPage from './components/Pages/SettingsPage';
import PlaylistsPage from './components/Pages/PlaylistsPage';
import StatisticsPage from './components/Pages/StatisticsPage';
import ArtistsPage from './components/Pages/ArtistsPage';

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route path="/" component={LogInPage} exact={true} />
            <Route path="/redirect" component={RedirectPage} />
            <Route path="/about" component={AboutUsPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/playlists" component={PlaylistsPage} />
            <Route path="/statistics" component={StatisticsPage} />
            <Route path="/artists" component={ArtistsPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;