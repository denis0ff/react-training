import { render, screen } from '@testing-library/react';
import Submit from './Submit';

const message = /Card successfully saved/i;

describe('Submit component', () => {
  it('render submit button should be disabled', () => {
    render(<Submit isSaved={false} isDisabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('render submit button should not be disabled', () => {
    render(<Submit isSaved={true} isDisabled={false} />);
    expect(screen.queryByRole('button')).not.toBeDisabled();
  });

  it('render submit without message', () => {
    render(<Submit isSaved={false} isDisabled={true} />);
    expect(screen.queryByText(message)).not.toBeInTheDocument();
  });

  it('render submit with message', () => {
    render(<Submit isSaved={true} isDisabled={true} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
