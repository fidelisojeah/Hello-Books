import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({ formField,
  field,
  value,
  label,
  errorField,
  type,
  onChange,
  isReq,
  errorMessage }) => {
  return (
    <div className={classnames(formField, { 'has-error': errorField === field })}>
      <input
        type={type}
        value={value}
        required={isReq}
        name={field}
        onChange={onChange}
      />
      <label className="control-label" htmlFor="input">{label}</label>
      <i className="bar" />
      {errorField === field && <div className="error-field">{errorMessage}</div>}
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
  errorMessage: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TextField.defaultProps = {
  type: 'text',
  errorField: 'crap',
  errorMessage: 'nothing',
};

export default TextField;
