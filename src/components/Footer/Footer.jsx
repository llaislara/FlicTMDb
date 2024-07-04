import { Link, useNavigate } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  const navigate = useNavigate();

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand-wrapper">
            <Link to="/" className="nav-logo footer-logo">
              Flic<img src="/images/logo.svg" className="nav-logo-img" style={{width: 20, marginLeft:6}}/>
            </Link>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li onClick={() => navigationHandler("movie")}><p className="footer-link">Movie</p></li>
              <li onClick={() => navigationHandler("tv")}><p className="footer-link">TV Show</p></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2024 <span className="copyright-link">Flic</span>. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer