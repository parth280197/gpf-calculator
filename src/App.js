import React from 'react';
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Calculator from "./Components/Calculator/Calculator";

class App extends React.Component {
    render() {
    return (
        <div className="App">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Calculator/>
            </MuiPickersUtilsProvider>
        </div>
    );
  }
}

export default App;
