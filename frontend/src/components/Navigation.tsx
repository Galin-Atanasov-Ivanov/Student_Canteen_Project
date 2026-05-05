import {Link} from "react-router";

export const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/students">Students</Link></li>
                <li><Link to="/meals">Meals</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    )
}