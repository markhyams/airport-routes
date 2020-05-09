import React, { Component } from 'react';

function Select({ value, onSelect, allTitle, options, titleKey, valueKey }) {
  // render() {
    return (
      <select 
        value={value}
        onChange={onSelect}
      >
        <option value="">{allTitle}</option>
        {
          options.map((option) => (
            <option 
              key={option[valueKey]}
              value={option[valueKey]}
              disabled={option.disabled}
            >
              {option[titleKey]}
            </option>
          ))
        }
      </select>
    )
  // }
}

export default Select;
