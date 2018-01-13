import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

export default class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      title: "",
      amount: ""
    }
  }

  handleChange(event) {
    let name, obj;
    name = event.target.name;
    this.setState((
      obj = {},
      obj["" + name] = event.target.value,
      obj
    ))
  }

  valid() {
    return this.state.date && this.state.title && this.state.amount
  }

  handleSubmit(event) {
    event.preventDefault();

    RecordsAPI.create(this.state).then(
      response => {
        this.props.handleNewRecord(response.data);
        this.setState({
          date: '',
          title: '',
          amount: ''
        })
      }
    ).catch(
      error => console.log(error.message)
    )
  }

  render() {
    return (
      <form className="form-inline mb-3" onSubmit={ (event) => {this.handleSubmit(event)} }>
        <div className="form-group">
          <input type="text" className="form-control mr-1" onChange={this.handleChange.bind(this)} placeholder="Date" name="date" value={this.state.date} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control mr-1" onChange={this.handleChange.bind(this)} placeholder="Title" name="title" value={this.state.title} />
        </div>
        <div className="form-group">
          <input type="text" className="form-control mr-1" onChange={this.handleChange.bind(this)}  placeholder="Amount" name="amount" value={this.state.amount} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!this.valid()}>Create Record</button>
      </form>
    );
  }
}
