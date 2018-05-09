import React, { Component } from "react";
import "./App.css";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      salary: 0,
      rate: 0,
      paymentday: "",
      date: new Date(),
      slipdata: []
    };
    this.errMsg = " ";
  }
  componentDidMount() {
    fetch("http://localhost:8080/getallusers")
      .then(response => {
        if (response.status === 200) {
          response.json().then(userData => {
            this.setState({ slipdata: userData });
          });
        }
      })
      .catch(err => {});
  }
  validate = () => {
    for (let val in this.state) {
      if (this.state[val] === "" || this.state[val] === 0) {
        this.errMsg = "Please fill out all fields";
        return false;
      }
    }
    return true;
  };

  onChange = date => this.setState({ date });
  changestate = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submit = event => {
    event.preventDefault();
    if (this.validate()) {
      this.errMsg = "";
      let options = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "Post",
        body: JSON.stringify(this.state)
      };
      fetch("http://localhost:8080/makepay", options)
        .then(response => {
          if (response.status === 200) {
            response.json().then(userData => {
              this.setState({ slipdata: userData });
            });
          }
        })
        .catch(err => {
          console.log("err", err);
        });
    } else {
      this.setState({});
    }
  };
  render() {
    return (
      <div className="App">
        <h1>Employee payslip for a flexible pay cycle</h1>
        <form onSubmit={this.submit}>
          <p style={{ fontSize: 24, color: "red" }}>{this.errMsg}</p>
          Firstname : <br />
          <input
            type="text"
            onChange={this.changestate}
            placeholder="First Name"
            name="firstname"
          />
          <br />
          Lastname: <br />
          <input
            type="text"
            onChange={this.changestate}
            placeholder="Last Name"
            name="lastname"
          />
          <br />
          Annual-Salary: <br />
          <input
            type="number"
            onChange={this.changestate}
            placeholder="Annual-Salary"
            name="salary"
            step="any"
            min="1"
          />
          <br />
          Super-Rate: <br />
          <input
            type="number"
            onChange={this.changestate}
            placeholder="Super-Rate"
            name="rate"
            step="any"
            max="12"
            min="0"
          />
          <br />
          Payment-Start-Date: <br />
          <input
            type="date"
            onChange={this.changestate}
            placeholder="Payment start date"
            name="paymentday"
          />{" "}
          <br />
          <button type="submit">click me</button>
        </form>
        <BootstrapTable
          data={this.state.slipdata}
          bordered={false}
          striped
          hover
        >
          <TableHeaderColumn isKey={true} dataField="name">
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField="payperiod">
            Pay - Period
          </TableHeaderColumn>
          <TableHeaderColumn dataField="incometax">
            Income -Tax
          </TableHeaderColumn>
          <TableHeaderColumn dataField="netincome">
            Net-Income
          </TableHeaderColumn>
          <TableHeaderColumn dataField="superamount">
            Super-Amount
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default App;
