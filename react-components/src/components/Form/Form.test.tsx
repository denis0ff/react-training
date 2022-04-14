import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from './Form';

describe('Form component works', () => {
  it('render form', () => {
    render(<Form setFormValues={(): void => {}} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');

    expect(screen.getByLabelText(/delivery date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delivery date/i)).toHaveValue('');

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getAllByRole('option')).toHaveLength(4);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();

    expect(screen.getAllByRole('radio')).toHaveLength(2);
    screen.getAllByRole('radio').forEach((el) => expect(el).not.toBeChecked());

    const upload = screen.getByLabelText<HTMLInputElement>(/upload image/i);
    expect(upload).toBeInTheDocument();
    expect(upload.files).toHaveLength(0);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('submit button should be disabled', () => {
    render(<Form setFormValues={(): void => {}} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('submit button not to be disabled after 1st input', () => {
    render(<Form setFormValues={(): void => {}} />);
    userEvent.type(screen.getByRole('textbox'), 'Correct Name');
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('submit button should be disabled with unfulfilled form', () => {
    render(<Form setFormValues={(): void => {}} />);
    userEvent.type(screen.getByRole('textbox'), 'Correct Name');
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render errors of incorrect fields', () => {
    render(<Form setFormValues={(): void => {}} />);
    userEvent.type(screen.getByRole('textbox'), 'Correct Name');
    userEvent.click(screen.getByLabelText('Male'));
    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(/Incorrect name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please indicate your gender/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Incorrect date/i)).toBeInTheDocument();
    expect(screen.getByText(/Country should be chosen/i)).toBeInTheDocument();
    expect(screen.getByText(/You should agree with the terms/i)).toBeInTheDocument();
    expect(screen.getByText(/Download file with 2 MB size limit/i)).toBeInTheDocument();
  });

  it('should render only incorrect fields errors after some input corrected', () => {
    render(<Form setFormValues={(): void => {}} />);
    userEvent.type(screen.getByRole('textbox'), 'Correct Name');
    userEvent.click(screen.getByLabelText('Male'));
    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(/Incorrect name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please indicate your gender/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Incorrect date/i)).toBeInTheDocument();
    expect(screen.getByText(/Country should be chosen/i)).toBeInTheDocument();
    expect(screen.getByText(/You should agree with the terms/i)).toBeInTheDocument();
    expect(screen.getByText(/Download file with 2 MB size limit/i)).toBeInTheDocument();

    userEvent.selectOptions(screen.getByRole('combobox'), screen.getByText('Belarus'));
    userEvent.click(screen.getByRole('checkbox'));
    expect(screen.queryByText(/Incorrect name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please indicate your gender/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Country should be chosen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/You should agree with the terms/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Incorrect date/i)).toBeInTheDocument();
    expect(screen.getByText(/Download file with 2 MB size limit/i)).toBeInTheDocument();
  });

  it('form submit correctly', () => {
    render(<Form setFormValues={(): void => {}} />);
    userEvent.type(screen.getByRole('textbox'), 'Correct Name');
    userEvent.type(screen.getByLabelText(/delivery date/i), '2022-12-17');
    userEvent.selectOptions(screen.getByRole('combobox'), screen.getByText('Belarus'));
    userEvent.click(screen.getByRole('checkbox'));
    userEvent.click(screen.getByLabelText('Female'));
    userEvent.upload(
      screen.getByLabelText(/upload image/i),
      new File(['hello'], 'hello.png', { type: 'image/png' })
    );
    userEvent.click(screen.getByRole('button'));
    expect(screen.queryByText(/Incorrect name/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Incorrect date/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Country should be chosen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/You should agree with the terms/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Please indicate your gender/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Download file with 2 MB size limit/i)).not.toBeInTheDocument();

    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByLabelText(/delivery date/i)).toHaveValue('');
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    screen.getAllByRole('radio').forEach((el) => expect(el).not.toBeChecked());

    expect(screen.queryByText(/Card successfully saved/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
