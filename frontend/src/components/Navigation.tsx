import { NavLink } from "react-router";

export const Navigation = () => {
    const linkClass = ({ isActive }: { isActive: boolean }) =>
        isActive ? "nav__link active" : "nav__link";

    return (
        <nav className="nav">
            <div className="nav__brand">
                <span>System</span>
                <h1>Student Canteen</h1>
            </div>

            <div className="nav__links">
                <p className="nav__section-label">General</p>
                <NavLink to="/" end className={linkClass}>Home</NavLink>

                <p className="nav__section-label">Manage</p>
                <NavLink to="/students" className={linkClass}>Students</NavLink>
                <NavLink to="/meals" className={linkClass}>Meals</NavLink>
                <NavLink to="/orders" className={linkClass}>Orders</NavLink>

                <p className="nav__section-label">Info</p>
                <NavLink to="/about" className={linkClass}>About</NavLink>
                <NavLink to="/contact" className={linkClass}>Contact</NavLink>
            </div>

            <div className="nav__footer">
                v1.0.0
            </div>
        </nav>
    );
};