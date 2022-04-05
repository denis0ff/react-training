import { Component } from 'react';

interface IProps {
  isSaved: boolean;
  isDisabled: boolean;
}

class Submit extends Component<IProps> {
  render = () => (
    <label className="form_sumbit-container" htmlFor="submit">
      <input className="form_submit" name="submit" type="submit" disabled={this.props.isDisabled} />
      {this.props.isSaved ? <span className="form_success">Card successfully saved</span> : null}
    </label>
  );
}

export default Submit;
