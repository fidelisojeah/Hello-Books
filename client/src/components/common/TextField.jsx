import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextField = ({ formField,
  field,
  value,
  label,
  inputError,
  errField,
  type,
  onChange,
  isRequired,
  errorMessage,
  checkExists,
  compoundError }) => {
  const hasError = compoundError.map((errorFields) => {
    if (errorFields.field === field) {
      return errorFields.error;
    }
    return null;
  }).toString();
  if (type === 'textarea') {
    return (
      <div className={
        classnames(formField,
          { 'has-error': (inputError === field || errField || hasError) })
      }
      >
        <textarea
          name={field}
          value={value}
          onChange={onChange}
          required={isRequired}
        />
        <label htmlFor="textarea" className="control-label">
          {label}
        </label>
        <i className="bar" />
        {inputError === field &&
          <div className="error-field">{errorMessage}</div>
        }
        {
          errField &&
          <div className="error-field">{errField}</div>
        }
        {
          hasError &&
          <div className="error-field">{hasError}</div>
        }
      </div>
    );
  }
  return (
    <div className={
      classnames(formField,
        { 'has-error': (inputError === field || errField || hasError) })
    }
    >
      <input
        type={type}
        value={value}
        required={isRequired}
        name={field}
        onBlur={checkExists}
        onChange={onChange}
      />
      <label className="control-label" htmlFor="input">{label}</label>
      <i className="bar" />
      {inputError === field &&
        <div className="error-field">{errorMessage}</div>
      }
      {
        errField &&
        <div className="error-field">{errField}</div>
      }
      {
        hasError &&
        <div className="error-field">{hasError}</div>
      }
    </div >
  );
};

TextField.propTypes = {
  formField: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  inputError: PropTypes.string,
  compoundError: PropTypes.arrayOf(PropTypes.object),
  errField: PropTypes.string,
  errorMessage: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkExists: PropTypes.func,
};

TextField.defaultProps = {
  type: 'text',
  inputError: 'crap',
  errField: null,
  compoundError: [],
  errorMessage: 'nothing',
  checkExists: null,
};

export default TextField;
