import { Link } from 'react-router-dom'
import './notfound.css'

const NotFound = () => {
  return (
    <section className="error section">
      <div className="error-container container error">
        <div className="error-content container">
          <p className="error-subtitle">
            Hey you
          </p>
          <h1 className="error-title">
            Error 404
          </h1>
          <p className="error-desc">
            Sorry! Can't seem to find the page you're looking for.<br />
          </p>
          <Link to="/" className="error-button button">
            Go Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound