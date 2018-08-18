import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

/* Importing our Actions */
import { addListAsync, getListsAsync } from "../actions/lists";

class ListForm extends Component {
  constructor(props) {
    /* Constructor, In constructor comes variable props, the props comes from Global states. */
    super(props);
    /* By default all variables are null or empty */
    this.state = {
      id: new Date(),
      username: "",
      date: "",
      start: "",
      end: "",
      errorDate: false,
      errorUsername: false,
      errorNumbersField: false
    };

    /* Binding all our functions */
    this.handleButton = this.handleButton.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeStartNumber = this.handleChangeStartNumber.bind(this);
    this.handleChangeEndNumber = this.handleChangeEndNumber.bind(this);
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
  }

  /* "componentWillMount" is working before the mounting Components */
  componentWillMount() {
    this.props.getLists();
  }

  /* Works when click Button to send Data to redux */
  handleButton() {
    this.setState({
      errorNumbersField: false,
      errorUsername: false,
      errorDate: false
    });
    if (
      this.validateEmail(this.state.username) &&
      this.state.end > this.state.start &&
      this.state.date.length
    ) {
      /* Adding data to redux (Global state) */
      this.props.addList({
        id: this.state.id,
        date: this.state.date,
        username: this.state.username,
        start: this.state.start,
        end: this.state.end
      });

      this.setState({
        date: "",
        username: "",
        start: "",
        end: "",
        id: new Date(),
        errorDate: false,
        errorUsername: false,
        errorNumbersField: false
      });
    }

    if (this.state.end <= this.state.start) {
      this.setState({ errorNumbersField: true });
    }
    if (!this.validateEmail(this.state.username)) {
      this.setState({ errorUsername: true });
    }
    if (this.state.date.length <= 0) {
      this.setState({ errorDate: true });
    }
  }

  /* Works when changes date value */
  handleChangeDate(e) {
    /* Setting state */
    this.setState({
      date: e.target.value,
      errorDate: false
    });
  }

  /* Works when changes Username value */
  handleChangeUsername(e) {
    this.setState({
      username: e.target.value,
      errorUsername: !this.validateEmail(e.target.value)
    });
  }

  /* Works when changes start number value */
  handleChangeStartNumber(e) {
    if (this.state.end <= Number(e.target.value)) {
      this.setState({ errorNumbersField: true });
    } else {
      this.setState({ errorNumbersField: false });
    }
    this.setState({ [e.target.name]: Number(e.target.value) });
  }

  validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /* Works when changes end number value */
  handleChangeEndNumber(e) {
    if (this.state.start >= Number(e.target.value)) {
      this.setState({ errorNumbersField: true });
    } else {
      this.setState({ errorNumbersField: false });
    }
    this.setState({ [e.target.name]: Number(e.target.value) });
  }

  /* Functions to show error messages */
  showDateErrorMessage() {
    return this.state.errorDate ? (
      <small>Please enter a valid date.</small>
    ) : (
      ""
    );
  }

  showUsernameErrorMessage() {
    return this.state.errorUsername ? (
      <small>Please enter a valid email address.</small>
    ) : (
      ""
    );
  }

  showErrorNumbersField() {
    return this.state.errorNumbersField ? (
      <small>End should be greater than Start.</small>
    ) : (
      ""
    );
  }

  /* Rendering view */
  render() {
    const showDateErrorMessage = this.showDateErrorMessage();
    const showUsernameErrorMessage = this.showUsernameErrorMessage();
    const showErrorNumbersField = this.showErrorNumbersField();

    /* Returns HTML result */
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3 col-medium-3 col-small-12">
            <input
              className="input-type"
              type="date"
              value={this.state.date}
              name="date"
              onChange={this.handleChangeDate}
            />
            {showDateErrorMessage}
          </div>
          <div className="col-3 col-medium-3 col-small-12">
            <input
              className="input-type"
              type="text"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChangeUsername}
            />
            {showUsernameErrorMessage}
          </div>
          <div className="col-3 col-medium-3 col-small-12">
            <input
              className="input-type"
              type="number"
              placeholder="Start"
              name="start"
              value={this.state.start}
              onChange={this.handleChangeStartNumber}
            />
            {showErrorNumbersField}
          </div>
          <div className="col-3 col-medium-3 col-small-12">
            <input
              className="input-type"
              type="number"
              placeholder="End"
              name="end"
              value={this.state.end}
              onChange={this.handleChangeEndNumber}
            />
            {showErrorNumbersField}
          </div>
        </div>
        <div className="row row-right">
          <div className="col-2 col-small-6">
            <button className="button" onClick={this.handleButton}>
              Submit
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

/* To work & connect with actions */
const mapDispatchToProps = dispatch => ({
  addList(list) {
    dispatch(addListAsync(list));
  },
  getLists() {
    dispatch(getListsAsync());
  }
});

/*  propTypes */
ListForm.propTypes = {
  addList: PropTypes.func.isRequired,
  getLists: PropTypes.func.isRequired
};

/* Getting need data from Reducer */
const mapStateToProps = state => state.lists;

/* Exporting class */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListForm);
