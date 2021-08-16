const { h, Component, render } = require("preact");
const { default: Router, Link } = require("preact-router");
const { default: Home } = require("./Pages/Home");
const { default: Settings } = require("./Pages/Settings");

class App extends Component {
    render() {
        return (
            <div>
                <div class="container-fluid bg-white shadow-sm mb-3">
                    <div class="row">
                        <div class="col">
                            <div class="container my-3">
                                <div class="row">
                                    <div class="col">
                                        <div>
                                            MyXCH
                                        </div>
                                        <nav>
                                            <Link href="/">Home</Link>
                                            <Link href="/settings">Settings</Link>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <Router>
                                <Home path="/" />
                                <Settings path="/settings" />
                            </Router>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

render(<App />, document.getElementById("App"));
