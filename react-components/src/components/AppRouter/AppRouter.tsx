import { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Paths } from '../../utils/types';
import { AboutUs } from '../../view/AboutUs';
import { Main } from '../../view/Main';
import { NotFound } from '../../view/NotFound';

export class AppRouter extends Component {
  render = () => (
    <Routes>
      <Route path={Paths.MAIN} element={<Main />} />
      <Route path={Paths.ABOUT_US} element={<AboutUs />} />
      <Route path={Paths.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}
