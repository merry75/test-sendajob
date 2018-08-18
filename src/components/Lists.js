import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";

import ListTableHead from "./ListTableHead";

/* Importing actions */
import { getListsAsync } from "../actions/lists";

/* Sorting all data by column clicks */
function getSorting(order, orderBy) {
  return order === "asc"
    ? (a, b) => {
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        return 0;
      }
    : (a, b) => {
        if (b[orderBy] < a[orderBy]) {
          return 1;
        }
        if (b[orderBy] > a[orderBy]) {
          return -1;
        }
        return 0;
      };
}

/* Filter by username search */
function filterUsers(searchText) {
  return el => el.username.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
}

/* Style like object )) */
const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    width: "100%"
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

/* List comment that show All data after Add new Item */
class Lists extends Component {
  constructor(props) {
    /* Constructor, always constructor get props as Parameters */
    super(props);

    /* After binding function, You can call function without create object like this.searchTextChange() */
    this.searchTextChange = this.searchTextChange.bind(this);
  }

  /* Default values */
  state = {
    order: "asc",
    orderBy: "date",
    searchText: ""
  };

  /* In componentWillMount we get all Data from Redux */
  componentWillMount() {
    this.props.getLists();
  }

  /* Works before the sorting Table */
  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  /* On each typing works */
  searchTextChange(e) {
    this.setState({ searchText: e.target.value });
  }

  /* Rendering Template */
  render() {
    const { lists, classes } = this.props;
    const { order, orderBy } = this.state;
    const data = lists;

    return (
      <Paper className={classes.root}>
        <Toolbar>
          <TextField
            label="Search"
            name="searchText"
            value={this.state.searchText}
            onChange={this.searchTextChange}
            margin="normal"
          />
        </Toolbar>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <ListTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .filter(filterUsers(this.state.searchText))
                .map(n => (
                  <TableRow
                    hover
                    onClick={event => this.handleClick(event, n.id)}
                    tabIndex={-1}
                    key={n.id}
                  >
                    <TableCell component="th" padding="default">
                      {n.username}
                    </TableCell>
                    <TableCell numeric>{n.date}</TableCell>
                    <TableCell numeric>{n.start}</TableCell>
                    <TableCell numeric>{n.end}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

/* propTypes need to specify data type */
Lists.propTypes = {
  classes: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
  getLists: PropTypes.func.isRequired
};

/* mapDispatchToProps connects with Global redux and always listening */
const mapDispatchToProps = dispatch => ({
  getLists() {
    dispatch(getListsAsync());
  }
});

/* Here we gets data that needs from Redux (Global state) */
const mapStateToProps = state => state.lists;

/* Exporting class */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Lists));
