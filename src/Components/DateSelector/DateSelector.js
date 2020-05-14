import React, {Component} from 'react';
import { DatePicker } from "@material-ui/pickers"
import {action, observable} from "mobx";
import {observer} from "mobx-react";

@observer
class DateSelector extends Component {
    handleChange = () => {};

    @observable startDate = new Date();
    @action
    onClickHandler = (date) => this.startDate = date;
    render() {
        return (
            <div>
                <DatePicker
                    views={["year"]}
                    label="Select year"
                    value={this.startDate}
                    onChange={this.onClickHandler}
                />
                {/*<DatePicker*/}
                {/*    showPopperArrow={false}*/}
                {/*    selected={this.startDate}*/}
                {/*    onChange={date => this.onClickHandler(date)}*/}
                {/*    dateFormat="MM/yyyy"*/}
                {/*    showMonthYearPicker*/}
                {/*    showFullMonthYearPicker*/}
                {/*/>*/}
            </div>
        );
    }
}

export default DateSelector;