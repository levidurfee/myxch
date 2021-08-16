import { h, Component } from "preact";

export default class Value extends Component {
    render() {
        return (
            <div>
                {this.props.value} {this.props.name}
            </div>
        )
    }
}
