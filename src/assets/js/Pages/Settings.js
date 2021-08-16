import { h, Component } from "preact";
import Address from "../Components/Address";
import { getAddresses, setAddresses } from "../functions";

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            new_address: "",
            addresses: getAddresses(),
        }

        this.handleAddressInput = this.handleAddressInput.bind(this);
        this.handleAddAddress = this.handleAddAddress.bind(this);
        this.removeAddress = this.removeAddress.bind(this);
    }

    render() {
        return (
            <div>
                <div class="card shadow-sm mb-3">
                    <div class="card-body">
                        {this.state.addresses.map((v, i) => {
                            if(v == "") {
                                return;
                            }
                            return (
                                <Address address={v} index={i} remover={this.removeAddress} />
                            );
                        })}
                    </div>
                </div>
                <div class="card shadow-sm mb-3">
                    <div class="card-body">
                        <div class="form-row">
                            <div class="col-8">
                                <input class="form-control address" value={this.state.new_address} onkeyup={this.handleAddressInput} />
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-success" onclick={this.handleAddAddress}><i class="fal fa-plus-circle"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleAddressInput(e) {
        this.setState({new_address: e.target.value});
    }

    handleAddAddress() {
        if(this.state.new_address == "") {
            toastr.error("Please enter a valid XCH address.");
            return;
        }
        let addresses = getAddresses();
        addresses.push(this.state.new_address);
        setAddresses(addresses);

        this.setState({new_address: ""});
        this.setState({addresses: addresses});

        toastr.success("Address added!");
    }

    removeAddress(i) {
        let addresses = getAddresses();
        addresses.splice(i, 1);
        // if length = 1 and it's empty
        if(addresses.length == 0 && addresses[0] == "") {
            addresses = [];
        }
        setAddresses(addresses);
        this.setState({addresses: addresses});

        toastr.success("Address removed!");
    }
}
