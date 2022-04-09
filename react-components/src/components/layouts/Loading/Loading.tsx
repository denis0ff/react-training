import { Component } from 'react';
import './Loading.css';

class Loading extends Component {
  render = () => (
    <div className="snippet">
      <div className="stage">
        <div className="dot-spin"></div>
      </div>
    </div>
  );
}

export default Loading;
