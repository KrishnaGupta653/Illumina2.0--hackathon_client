import { Fragment } from "react";
import { Link } from "react-router-dom";
const Homepage=()=>{
    return (
        <Fragment>
            Homepage
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/signin">Sign in</Link></li>
                </ul>
            </nav>
        </Fragment>
    )
}
export default Homepage;