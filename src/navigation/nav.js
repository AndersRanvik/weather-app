import { Link } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logotype-black.svg';
//import logo2 from '../assets/Infront_logo.png';

function Nav() {
  return (
    <div>
      <nav>
        <h3>
          <img alt="logo" src={logo} />
        </h3>
        <ul className="nav-links">
          <li>
            <Link to="/">Hjem</Link>
          </li>
          <li>
            <Link to="/search">Søk</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
