import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Paths } from '../../../utils/types/types';
import { AboutUs } from '../AboutUs/AboutUs';
import { Generator } from '../Generator/Generator';
import { Main } from '../Main/Main';
import { NotFound } from '../NotFound/NotFound';

export class AppRouter extends Component {
  render = () => (
    <Routes>
      <Route path={Paths.MAIN} element={<Main />} />
      <Route path={Paths.ABOUT_US} element={<AboutUs />} />
      <Route path={Paths.GENERATOR} element={<Generator />} />
      <Route path={Paths.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}
