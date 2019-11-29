import React, { Component } from "react";
import Toggle from "react-toggle";
import BlockUi from "react-block-ui";
import 'react-block-ui/style.css';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';

var when = 0;

class Table extends Component {

  constructor(props) {
    super(props);

    this.state = {
      blocking: false,
      message: '',
      rules: []
    };
  }

  // Fetch the rules from the backend
  componentDidMount() {
    fetch("/rules")
      .then(res => res.json())
      .then(rules => this.setState({ rules }));
  }
  // deal with drop down changes
  _onSelect(option) {
    // Set the global
    when = option.value;
  }
  // Write changes to backend
  handleChange(rule, row, event) {
    // console.log('rule:' + rule + ' new state:' + event.target.checked)
    if(event.target.checked) {
      this.setState({message: 'Enabling ' + row.name + ' in ' + when + ' minutes'});
    } else {
      this.setState({message: 'Disabling ' + row.name + ' in ' + when + ' minutes'});
    }
    this.setState({blocking: true});
    fetch("/rules?rule=" + rule + "&enabled=" + event.target.checked + "&time=" + when, {
      method: "post"
    });
    // after 10 seconds, unblock the UI
    // the delay gives the router time to apply the change
    var tbl = this;
    setTimeout(function() {
      when = 0; // remember to reset to default
      tbl.setState({blocking: false});
    }, 10000);
  }

  render() {
  // Drop down constants
  const options = [ 
	{ value: 0, label: 'Now' }, 
        {value: 5, label: '5 min'},
        {value: 10, label: '10 min'},
        {value: 15, label: '15 min'} ];
  const defaultOption = options[0];

    return (
      <div>
        <BlockUi tag="div" blocking={this.state.blocking} renderChildren={true} message={this.state.message}>
          <table align="center">
            <tbody>
              {this.state.rules.map(row => (
                <tr key={row.rule}>
                  <td>{row.name}</td>
                  <td>
                    <Toggle
                      defaultChecked={row.enabled}
                      onChange={this.handleChange.bind(this, row.rule, row)}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td>
                  <Dropdown
                    options={options}
                    onChange={this._onSelect}
                    value={defaultOption} />
                </td>
              </tr>
            </tbody>
          </table>
        </BlockUi>
      </div>
    );
  }
}

export default Table;
