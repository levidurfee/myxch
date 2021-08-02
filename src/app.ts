const accountBalanceURL = "https://xchscan.com/api/account/balance?address=";

let xch = 0.00;
let mojo = 0;

const xchid = "xch";
const mojoid = "mojo";

function getTotal(addresses: Array<string>) {
    xch = 0.00;
    mojo = 0;
    addresses.forEach((address) => {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState != 4 || this.status != 200) {
                return;
            }

            let resp = JSON.parse(this.responseText);
            xch += parseFloat(resp.xch);
            mojo += parseInt(resp.mojo);

            document.getElementById(xchid).innerHTML = xch.toString();
            document.getElementById(mojoid).innerHTML = mojo.toString();
        };
        xhttp.open("POST", accountBalanceURL+address, true);
        xhttp.send();
    })
}

let addInputButton = document.getElementById("add_input");
addInputButton.onclick = () => {
    addInput("");
}

let getTotalButton = document.getElementById("get_total");
getTotalButton.onclick = () => {
    let addresses: Array<string> = [];

    let addressInputs = document.getElementsByClassName("address");
    for(const addressInput of Array.from(addressInputs)) {
        let input = <HTMLInputElement>addressInput;
        if(input.value == "") {
            continue;
        }
        addresses.push(input.value);
    }

    getTotal(addresses);
}

if (storageAvailable('localStorage')) {
    let saveButton = document.getElementById("save");
    saveButton.style.display = "inline-block";
    saveButton.onclick = () => {
        console.log("Saving...");
        let addresses: Array<string> = [];

        let addressInputs = document.getElementsByClassName("address");
        for(const addressInput of Array.from(addressInputs)) {
            let input = <HTMLInputElement>addressInput;
            if(input.value == "") {
                continue;
            }
            addresses.push(input.value);
        }

        window.localStorage['addresses'] = addresses;
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    if (storageAvailable('localStorage')) {
        let addressesList = window.localStorage['addresses'];
        let addresses = addressesList.split(",");

        getTotal(addresses);

        let addressElement = <HTMLInputElement>document.getElementById("address");
        addressElement.value = addresses[0];
        addresses.shift();

        addresses.forEach(address => {
            addInput(address);
        });
    }
});

function addInput(value: string = "") {
    let input = <HTMLInputElement>document.createElement("input");
    input.name = "address[]";
    input.classList.add("address", "form-control", "mb-3");
    input.value = value;

    document.getElementById("inputs").appendChild(input);
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
