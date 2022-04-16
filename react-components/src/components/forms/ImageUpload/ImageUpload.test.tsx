import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageUpload from './ImageUpload';

const message = 'some_error_message';
const func = jest.fn();
const data = {
  name: 'image',
  label: 'Upload image',
  register: {
    validate: func,
  },
};
const file1 = new File(['hello1'], 'hello1.png', { type: 'image/png' });
const file2 = new File(['hello2'], 'hello2.png', { type: 'image/png' });

describe('Image uploader component', () => {
  it('render uploader without error', () => {
    render(<ImageUpload data={data} register={func} clearErrors={func} />);
    const upload = screen.getByLabelText<HTMLInputElement>(data.label);
    expect(upload).toBeInTheDocument();
    expect(upload.files).toHaveLength(0);
  });

  it('render uploader with error', () => {
    render(<ImageUpload data={data} error={message} register={func} clearErrors={func} />);
    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it('uploader works', () => {
    render(<ImageUpload data={data} register={func} clearErrors={func} />);
    const upload = screen.getByLabelText<HTMLInputElement>(data.label);
    userEvent.upload(upload, file1);
    expect(upload.files).toHaveLength(1);
    expect(upload.files?.item(0)).toEqual(file1);
  });

  it('uploader contain only 1 file', () => {
    render(<ImageUpload data={data} register={func} clearErrors={func} />);
    const upload = screen.getByLabelText<HTMLInputElement>(data.label);
    userEvent.upload(upload, file1);
    expect(upload.files).toHaveLength(1);
    expect(upload.files?.item(0)).toEqual(file1);
    userEvent.upload(upload, file2);
    expect(upload.files).toHaveLength(1);
    expect(upload.files?.item(0)).toEqual(file2);
  });
});
