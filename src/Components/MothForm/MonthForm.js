import React, {Component} from 'react';
import {observer} from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Styles from './MonthForm.module.css'
import Button from "@material-ui/core/Button";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import InputAdornment from '@material-ui/core/InputAdornment';
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft';

@observer
class MonthForm extends Component {
    render() {
        const {monthlyData} = this.props;
        return (
            <>
                <div className={Styles.formContainer}>
                    <div className={Styles.field}>Month</div>
                    <div className={Styles.field}>Deposit</div>
                    <div className={Styles.field}>Withdraw</div>
                    <div className={Styles.field}>Interest</div>
                    <div className={Styles.field}> </div>
                </div>
                {monthlyData.map((data,i)=>
                    <div className={Styles.formContainer}>
                        <div className={Styles.field}>{data.month}</div>
                        <TextField
                            className={Styles.field}
                            onChange={
                                (e) =>
                                    this.props.onDepositChange(i,e.target.value)
                            }
                            value={data.deposit}
                            type={"number"} />
                        <TextField
                            className={Styles.field}
                            onChange={
                                (e) =>
                                    this.props.onWithdrawChange(i,e.target.value)
                            }
                            value={data.withdraw}
                            type={"number"} />
                        <TextField
                            className={Styles.field}
                            onChange={
                                (e) =>
                                    this.props.onInterestChange(i,e.target.value)
                            }
                            InputProps={{
                                endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                            value={data.interest}
                            type={"number"} />
                        {
                            i !== 0 ?
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={Styles.field}
                                    onClick={()=>this.props.asAboveHandler(i)}
                                    startIcon={<SubdirectoryArrowLeftIcon />}
                                >
                                    As above
                                </Button> :
                                <div className={Styles.field}> </div>
                        }
                    </div>
                )}
                <Button
                    variant="outlined"
                    color="primary"
                    className={Styles.field}
                    onClick={this.props.calculate}
                    startIcon={<PlaylistAddCheckIcon />}
                >
                    Calculate
                </Button>
            </>
        );
    }
}

export default MonthForm;