
const accountBalanceURL = "https://xchscan.com/api/account/balance?address=";

function getTotal(addresses) {
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
