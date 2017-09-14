import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({ formField,
  field,
  value,
  label,
  errorField,
  errField,
  type,
  onChange,
  isReq,
  errorMessage,
  checkUserExists }) => {
  return (
    <div className={classnames(formField,
      { 'has-error': (errorField === field || errField) })}
    >
      <input
        type={type}
        value={value}
        required={isReq}
        name={field}
        onBlur={checkUserExists}
        onChange={onChange}
      />
      <label className="control-label" htmlFor="input">{label}</label>
      <i className="bar" />
      {errorField === field &&
        <div className="error-field">{errorMessage}</div>}
      {errField &&
        <div className="error-field">{errField}</div>}
    </div>
  );
};

TextField.propTypes = {
  formField: PropTypes.string.isRequired,
  isReq: PropTypes.bool.isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorField: PropTypes.string,
  errField: PropTypes.string,
  errorMessage: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func,
};

TextField.defaultProps = {
  type: 'text',
  errorField: 'crap',
  errField: null,
  errorMessage: 'nothing',
  checkUserExists: null,
};

export default TextField;
