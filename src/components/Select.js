import React, { Component } from 'react';

class Select extends Component {
  render() {
    return (
      <select onChange={this.props.onSelect}>
        <option value={this.props.value}>{this.props.allTitle}</option>
        {
          this.props.options.map((option) => (
            <option key={option[this.props.valueKey]} value={option[this.props.valueKey]}>{option[this.props.titleKey]}</option>
          ))
        }
      </select>
    )
  }
}

export default Select;
