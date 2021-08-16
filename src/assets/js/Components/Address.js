import { h, Component } from "preact";

export default class Address extends Component {
    render() {
        return (
            <div class="form-row mb-2" key={this.props.index}>
                <div class="col-8">
                    <input class="form-control address" value={this.props.address} readonly />
                </div>
                <div class="col-auto">
                    <button title="Delete" class="btn btn-outline-danger" onclick={() => this.props.remover(this.props.index)}><i class="fal fa-dumpster"></i></button>
                </div>
            </div>
        )
    }
}
