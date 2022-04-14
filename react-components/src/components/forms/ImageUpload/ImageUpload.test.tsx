import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageUpload from './ImageUpload';

const setError = jest.fn();
const message = 'some_error_message';
const file1 = new File(['hello1'], 'hello1.png', { type: 'image/png' });
const file2 = new File(['hello2'], 'hello2.png', { type: 'image/png' });

describe('Image uploader component', () => {
  it('render uploader without error', () => {
    render(<ImageUpload setError={setError} />);
    const upload = screen.getByLabelText<HTMLInputElement>(/upload image/i);
    expect(upload).toBeInTheDocument();
    expect(upload.files).toHaveLength(0);
  });

  it('render uploader with error', () => {
    render(<ImageUpload message={message} setError={setError} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('uploader works', () => {
    render(<ImageUpload setError={setError} />);
    const upload = screen.getByLabelText<HTMLInputElement>(/upload image/i);
    userEvent.upload(upload, file1);
    expect(upload.files).toHaveLength(1);
    expect(upload.files?.item(0)).toEqual(file1);
  });

  it('uploader contain only 1 file', () => {
    render(<ImageUpload setError={setError} />);
    const upload = screen.getByLabelText<HTMLInputElement>(/upload image/i);
    userEvent.upload(upload, file1);
    expect(upload.files).toHaveLength(1);
    expect(upload.files?.item(0)).toEqual(file1);
    userEvent.upload(upload, file2);
    expect(upload.files).toHaveLength(1);
    expect(upload.files?.item(0)).toEqual(file2);
  });
});
