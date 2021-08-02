import Wallet from "./Wallet";

export default class Wallets {

    Wallets: Record<string, Wallet>;

    add(wallet: Wallet) {
        this.Wallets[wallet.id()] = wallet;
    }
}
