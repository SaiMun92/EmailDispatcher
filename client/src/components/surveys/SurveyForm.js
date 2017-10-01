// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form'; //Field is a helper to render any html input
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    // this.props.onSurveySubmit have no () because u don't wamt to call it immediately
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  // if (!values.title) {
  //   errors.title = 'You must provide a title';
  // }
  //
  // if (!values.suject) {
  //   errors.title = 'You must provide a subject';
  // }
  //
  // if (!values.body) {
  //   errors.body = 'You must provide a body';
  // }
  _.each(formFields,  ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  errors.recipients = validateEmails(values.recipients || '');

  return errors;
}

export default reduxForm({
  //validate: validate
  validate,
  form: 'surveyForm',
  destroyOnUnmount: false // don't get rid of the inputs
})(SurveyForm);