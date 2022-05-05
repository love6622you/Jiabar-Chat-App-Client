import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="hero">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="font-bold-mb-8 text-8xl">Oops!</h1>
          <p className="mb-8 text-5xl">404- Page not found!</p>
          <Link to="/" className="btn btn-primary btn-lg">
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

NotFound.propTypes = {};

export default NotFound;
