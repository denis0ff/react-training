import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRouter } from '../AppRouter/AppRouter';
import { Header } from '../layouts/Header/Header';

export class App extends Component {
  render = () => (
    <BrowserRouter>
      <main className="main-container">
        <Header />
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}
