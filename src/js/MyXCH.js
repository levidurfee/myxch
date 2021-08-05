import { h, Component } from "preact";
import Router, { Link } from "preact-router";
import Addresses from "./Pages/Addresses";
import Home from "./Pages/Home";

export default class MyXCH extends Component {
    render() {
        return (
            <div>
                <nav class="container">
                    <Link href="/">Home</Link>
                    <Link href="/addresses">Addresses</Link>
                </nav>
                <div class="container d-flex flex-column bg-light">
                    <Router>
                        <Home path="/" />
                        <Addresses path="/addresses" />
                    </Router>
                </div>
            </div>

        )
    }
}
