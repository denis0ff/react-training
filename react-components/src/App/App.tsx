import { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from '../components/pages/AppRouter';
import Header from '../components/layouts/Header';

class App extends Component {
  render = () => (
    <BrowserRouter>
      <main className="main-container">
        <Header />
        <AppRouter />
      </main>
    </BrowserRouter>
  );
}

export default App;
