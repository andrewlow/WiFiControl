import React, { Component } from "react";
import Toggle from "react-toggle";

class Table extends Component {
  state = { rules: [] };

  componentDidMount() {
    fetch("/rules")
      .then(res => res.json())
      .then(rules => this.setState({ rules }));
  }
  handleChange(rule, event) {
    // console.log('rule:' + rule + ' new state:' + event.target.checked)
    fetch("/rules?rule=" + rule + "&enabled=" + event.target.checked, {
      method: "post"
    });
  }

  render() {
    return (
      <table align="center">
        <tbody>
          {this.state.rules.map(row => (
            <tr key={row.rule}>
              <td>{row.name}</td>
              <td>
                <Toggle
                  defaultChecked={row.enabled}
                  onChange={this.handleChange.bind(this, row.rule)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
