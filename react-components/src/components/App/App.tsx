import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRouter } from '../AppRouter/AppRouter';
import { Header } from '../../view/Header/Header';

export class App extends Component {
  render = () => (
    <BrowserRouter>
      <div className="main-container">
        <Header />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}
