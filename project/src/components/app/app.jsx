import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import {AppRoute, CITY} from '../../const';
import reviewPropsType from '../../prop-types/reviews';
import MainScreen from '../pages/main-screen/main-screen';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen';
import LoginScreen from '../pages/login-screen/login-screen';
import RoomScreen from '../pages/room-screen/room-screen';
import NotFoundScreen from '../pages/not-found-screen/not-found-screen';

function App(props) {
  const { reviews } = props;
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.MAIN}>
          <MainScreen cityList={CITY}/>
        </Route>

        <Route exact path={AppRoute.FAVORITES}>
          <FavoritesScreen />
        </Route>

        <Route exact path={AppRoute.LOGIN}>
          <LoginScreen />
        </Route>

        <Route
          exact
          path={AppRoute.ROOM}
          render={({match})=>{
            const offerId = match.params.id;
            return <RoomScreen offerId={offerId} reviews={reviews} city={CITY[0]}/>;
          }}
        />

        <Route>
          <NotFoundScreen />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropsType).isRequired,
};

export default App;
