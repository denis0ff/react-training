import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../NotFound';
import App from '../../../App';
import { setupStore } from '../../../store/store';
import { Provider } from 'react-redux';

const store = setupStore();

describe('Routing', () => {
  it('full app rendering/navigating', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    userEvent.click(screen.getByText(/about us/i));
    expect(screen.getByText(/We are strongly motivated/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/main/i));
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('landing on a bad page', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
