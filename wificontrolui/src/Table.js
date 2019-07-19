import React, { Component } from "react";
import Toggle from "react-toggle";
import BlockUi from "react-block-ui";
import 'react-block-ui/style.css';

class Table extends Component {

  constructor(props) {
    super(props);

    this.state = {
      blocking: false,
      rules: []
    };
  }

  // Fetch the rules from the backend
  componentDidMount() {
    fetch("/rules")
      .then(res => res.json())
      .then(rules => this.setState({ rules }));
  }
  // Write changes to backend
  handleChange(rule, event) {
    // console.log('rule:' + rule + ' new state:' + event.target.checked)
    this.setState({blocking: true});
    fetch("/rules?rule=" + rule + "&enabled=" + event.target.checked, {
      method: "post"
    });
    // after 10 seconds, unblock the UI
    // the delay gives the router time to apply the change
    var tbl = this;
    setTimeout(function() {
      tbl.setState({blocking: false});
    }, 10000);
  }

  render() {
    return (
      <div>
        <BlockUi tag="div" blocking={this.state.blocking}>
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
        </BlockUi>
      </div>
    );
  }
}

export default Table;
