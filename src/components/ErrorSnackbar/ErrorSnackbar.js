import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import withStyles from "@material-ui/styles/withStyles";
import styles from "./ErrorSnackbar.styles";

import { connect } from "react-redux";
import { hideError } from "../../actions/errorsAction.js";

class ErrorSnackbar extends React.Component {
  handleSnackbarClose = () => {
    this.props.hideError();
  };

  render = () => {
    const { classes, error } = this.props;

    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={error.isOpen}
        autoHideDuration={2000}
        onClose={this.handleSnackbarClose}
      >
        <SnackbarContent
          className={classes.error}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <ErrorIcon className={classes.icon} />
              {error.message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  };
}

const mapStateToProps = (state) => {
  return { error: state.error };
};

export default connect(mapStateToProps, { hideError })(
  withStyles(styles)(ErrorSnackbar)
);
