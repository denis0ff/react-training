import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textfield from './Textfield';

const message = 'some_error_message';
const func = jest.fn();
const data = {
  name: 'fullName',
  label: 'Your name',
  register: {
    validate: func,
  },
};

describe('Textfield component', () => {
  it('render textfield without error', () => {
    render(<Textfield data={data} register={func} clearErrors={func} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('render textfield with error', () => {
    render(<Textfield data={data} error={message} register={func} clearErrors={func} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('textfield works', () => {
    render(<Textfield data={data} register={func} clearErrors={func} />);
    const input = screen.getByRole('textbox');
    const text = 'some_input_text';
    userEvent.type(input, text);
    expect(input).toHaveValue(text);
    expect(input).toHaveDisplayValue(text);
  });
});
