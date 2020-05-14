import React, {Component} from 'react';
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import InputForm from "../InputForm/InputForm";
import MonthlyData from './../../Models/MothlyData'
import MonthForm from "../MothForm/MonthForm";

@observer
class Calculator extends Component {
    @observable
    monthlyData = [];

    @observable
    startDate = new Date();

    @observable
    openingBalance = 0;

    @observable
    subTotal = [];

    @observable
    netBalance = 0;

    @observable
    totalWithdraw = 0;

    @observable
    totalDeposit = 0;

    @observable
    totalInterest = 0;

    @action
    onDateChange = (date) => {
        this.startDate = date;
        this.updateYear(date.getFullYear());
    };

    @action
    onBalanceChange = (balance) => {
        this.openingBalance = balance;
    }

    @computed
    get isValidInput() {
        return this.date !== null && this.openingBalance > 0;
    }

    @computed
    get isCalculated() {
        return this.netBalance > 0;
    }

    @action
    updateYear = year => {
        this.monthlyData.forEach(data => {
            data.month = data.month.slice(0,data.month.indexOf("|"))+"|"+year;
        })
    }

    @action
    onDepositChange = (i,value) => {
        this.monthlyData[i].deposit = Number(value);
    }

    @action
    onWithdrawChange = (i,value) => {
        this.monthlyData[i].withdraw = Number(value);
    }

    @action
    onInterestChange = (i,rate) => {
        this.monthlyData[i].interest = Number(rate);
    }

    @action
    asAboveHandler = i => {
        this.monthlyData[i].deposit = this.monthlyData[i - 1].deposit;
        this.monthlyData[i].withdraw = this.monthlyData[i - 1].withdraw;
        this.monthlyData[i].interest = this.monthlyData[i - 1].interest;
    }

    componentDidMount = () => {
        if(this.monthlyData.length === 0) {
            const monthsName = ["April", "May", "June", "July", "August", "September", "October", "November", "December","January", "February", "March" ];
            let monthlyData = [];
            monthsName.forEach((monthName)=> {
                monthlyData.push(new MonthlyData(`${monthName}|${this.startDate.getFullYear()}`,0,0,0));
            })
            this.monthlyData= monthlyData;
        }
    }


    getMonthlyDataForm = () => {
        return <MonthForm
            monthlyData={this.monthlyData}
            onDepositChange={this.onDepositChange}
            onWithdrawChange={this.onWithdrawChange}
            onInterestChange={this.onInterestChange}
            asAboveHandler={this.asAboveHandler}
            calculate={this.calculate}
        />;
    }

    @action
    calculate = () => {
        this.totalDeposit = 0;
        this.subTotal = [];
        this.totalInterest = 0;
        this.totalWithdraw = 0;

        this.monthlyData.forEach((data,i)=>{
             if(i===0) {
                 this.subTotal.push(Number(this.openingBalance) + Number(data.deposit) - Number(data.withdraw))
             } else  {
                 this.subTotal.push(Number(this.subTotal[i-1]) + Number(data.deposit) - Number(data.withdraw));
             }

            this.totalDeposit += data.deposit;
            this.totalWithdraw += data.withdraw;
            this.totalInterest += (this.subTotal[i] * Number(data.interest)) / 1200;
        })

        this.netBalance = Number(this.totalDeposit) + Number(this.openingBalance) + Math.round(Number(this.totalInterest)) - Number(this.totalWithdraw);
    }

    getResults = () => {

        return <div>
            <div>Total Deposit: {this.totalDeposit}</div>
            <div>Total Withdraw: {this.totalWithdraw}</div>
            <div>Total Interest: {Math.round(this.totalInterest)}</div>
            <div>Total Net Balance: {this.netBalance}</div>
        </div>;
    }

    render() {
        return (
            <div>
                <InputForm
                    startData={this.startDate}
                    onDateChange={this.onDateChange}
                    openingBalance={this.openingBalance}
                    onBalanceChange={this.onBalanceChange}
                />
                <div>
                    {this.isValidInput && this.getMonthlyDataForm()}
                </div>
                <div>
                    {this.isCalculated && this.getResults()}
                </div>
            </div>
        );
    }
}

export default Calculator;