import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold font-display">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="text-primary underline hover:text-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded cursor-pointer">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
