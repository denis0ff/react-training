import { Routes, Route } from 'react-router-dom';
import { Paths } from '../../../utils/types/types';
import AboutUs from '../AboutUs';
import Generator from '../Generator';
import Main from '../Main';
import MainCard from '../MainCard';
import NotFound from '../NotFound';

const AppRouter = () => (
  <Routes>
    <Route path={Paths.MAIN} element={<Main />}></Route>
    <Route path={`${Paths.MAIN}:cardId`} element={<MainCard />} />
    <Route path={Paths.ABOUT_US} element={<AboutUs />} />
    <Route path={Paths.GENERATOR} element={<Generator />} />
    <Route path={Paths.NOT_FOUND} element={<NotFound />} />
  </Routes>
);

export default AppRouter;
