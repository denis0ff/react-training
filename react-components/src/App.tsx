import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRouter } from './components/AppRouter/AppRouter';
import { Header } from './view/Header';

export class App extends Component {
  render = () => (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
}
