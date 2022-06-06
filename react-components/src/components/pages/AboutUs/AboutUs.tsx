import { Component } from 'react';
import './AboutUs.css';

class AboutUs extends Component {
  render = () => (
    <section>
      <h2>About us</h2>
      <h3>I am strongly motivated and ready to work hard.</h3>
      <a className="github-link" href="https://github.com/denis0ff">
        My GitHub
      </a>
    </section>
  );
}

export default AboutUs;
