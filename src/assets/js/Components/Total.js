import { h, Component } from "preact";
import Value from "./Value";

const accountBalanceURL = "https://xchscan.com/api/account/balance?address=";

export default class Total extends Component {
    constructor(props) {
        super(props);

        this.state = {
            xch: "",
            mojo: ""
        };
    }

    render() {
        return (
            <div class="card shadow-sm">
                <div class="card-header bg-white">Total</div>
                <div class="card-body">
                    <p class="font-weight-bold mb-0"><Value name="xch" value={this.state.xch} /></p>
                    <small class="text-muted"><Value name="mojo" value={this.state.mojo} /></small>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-success btn-sm" onclick={this.getTotal}><i class="fal fa-sync"></i></button>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getTotal();
    }

    getTotal() {
        if(window.localStorage.getItem("addresses") == null) {
            return;
        }
        let addresses = window.localStorage['addresses'].split(",");

        let xch = 0.00;
        let mojo = 0;
        let _self = this;
        addresses.forEach((address) => {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState != 4 || this.status != 200) {
                    return;
                }

                let resp = JSON.parse(this.responseText);
                xch += parseFloat(resp.xch);
                mojo += parseInt(resp.mojo);

                if(typeof xch != "number") {
                    return;
                }

                xch = xch.toFixed(6);

                _self.setState({xch: xch});
                _self.setState({mojo: mojo});
            };
            xhttp.open("POST", accountBalanceURL+address, true);
            xhttp.send();
        })
    }
}
