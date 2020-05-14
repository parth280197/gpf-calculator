import React from 'react';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import DateSelector from "./Components/DateSelector/DateSelector";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

class App extends React.Component {
    render() {
    return (
        <div className="App">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateSelector/>
            </MuiPickersUtilsProvider>
        </div>
    );
  }
}

export default App;
