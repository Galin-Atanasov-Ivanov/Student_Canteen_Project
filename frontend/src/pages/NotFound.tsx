import { Link } from "react-router";

export const NotFound = () => {
    return (
        <div className="not-found">
            <p className="not-found__code">404</p>
            <p className="not-found__message">This page doesn't exist.</p>
            <Link to="/" className="btn btn--ghost">← Back to Home</Link>
        </div>
    );
};