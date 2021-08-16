import { h, Component } from "preact";
import Total from "../Components/Total";
import storageAvailable from "../functions";

export default class Home extends Component {
    render() {
        return (
            <div class="mb-3">
                <div>
                    <Total />
                </div>
            </div>
        )
    }
}
