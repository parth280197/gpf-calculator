import React, {Component} from 'react';
import { DatePicker } from "@material-ui/pickers"
import {observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Styles from './InputForm.module.css'

@observer
class InputForm extends Component {
    render() {
        return (
            <div className={Styles.formContainer}>
                <DatePicker
                    views={["year"]}
                    label="Select year"
                    value={this.props.startData}
                    onChange={this.props.onDateChange}
                />
                <TextField onChange={(e) => this.props.onBalanceChange(e.target.value)} value={this.props.openingBalance} label={'opening balance'} type={'number'} variant="outlined" />
            </div>
        );
    }
}

export default InputForm;