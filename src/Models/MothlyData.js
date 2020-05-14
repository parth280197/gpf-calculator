import {observable} from "mobx";
export default class MothlyData {
    @observable
    month;

    @observable
    deposit;

    @observable
    withdraw;

    @observable
    interest;


    constructor(month, deposit, withdraw, interest) {
        this.month = month;
        this.deposit = Number(deposit);
        this.withdraw = Number(withdraw);
        this.interest = Number(interest);
    }
}