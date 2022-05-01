import { render, screen } from '@testing-library/react';
import Main from './Main';
import { Provider } from 'react-redux';
import { setupStore } from '../../../store/store';

const store = setupStore();

describe('Main page', () => {
  it('renders main page', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByRole('searchbox')).toBeInTheDocument;
  });
});
