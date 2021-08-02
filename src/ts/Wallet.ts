import Balance from "./Balance";

export default class Wallet {
    ID: Number;

    Address: string;
    Balance: Balance;

    Destroyable: boolean;

    constructor(id: number, address: string, balance: Balance, destroyable: boolean) {
        this.ID = id;

        this.Address = address;
        this.Balance = balance;

        this.Destroyable = destroyable;
    }

    input(): HTMLInputElement {
        let input = document.createElement("input");
        input.classList.add("address", "form-control", "mb-2");

        return input;
    }

    id(): string {
        return this.ID.toString()
    }
}
