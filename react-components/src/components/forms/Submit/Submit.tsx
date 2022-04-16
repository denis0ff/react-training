interface Props {
  isSaved: boolean;
  isDisabled: boolean;
}

const Submit = ({ isSaved, isDisabled }: Props) => (
  <label className="form_sumbit-container" htmlFor="submit">
    <input className="form_submit" name="submit" type="submit" disabled={isDisabled} />
    {isSaved ? <span className="form_success">Card successfully saved</span> : null}
  </label>
);

export default Submit;
