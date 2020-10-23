import React from "react";
import Box from "@material-ui/core/Box";
import Paper from '@material-ui/core/Paper'
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/styles";
import styles from "./SignIn.styles";

import _trim from "lodash/trim";
import { connect } from "react-redux";
// import { withRouter } from "react-router";

import { createSession } from "../../actions/sessionsActions";
import { setError } from "../../actions/errorsAction";

const checkEmptyString = (str) => {
  return !!str.replace(/\s/g, "").length;
};

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: "",
        error: "",
      },
      password: {
        value: "",
        error: "",
      },
      loading: false,
    };
  }

  onNextClick = () => {
    const { username, password } = this.state;
    let hasError = false;

    if (!checkEmptyString(username.value)) {
      this.setState({
        username: { ...username, error: `Email can't be empty` },
      });
      hasError = true;
    }
    if (!password.value) {
      this.setState({
        password: { ...password, error: `Password can't be empty` },
      });
      hasError = true;
    }
    if (hasError) return;

    this.setState(
      {
        loading: true,
      },
      () => {
        this.props
          .createSession({
            username: _trim(username.value),
            password: password.value,
          })
          .catch((error) => {
            this.setState(
              {
                loading: false,
              },
              () => {
                this.props.setError(error);
              }
            );
          });
      }
    );
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.onNextClick();
    }
  };

  render = () => {
    const { username, password, loading } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Grid container className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper}>
            <Box pl={15} pr={15} pt={25} className={classes.box}>
              <Typography variant="h2">Log In</Typography>
            </Box>
            <Box pl={15} pr={15} pt={5} pb={5} className={classes.box}>
              <FormControl error={!!username.error}>
                <InputLabel htmlFor="username">E-mail or Phone</InputLabel>
                <Input
                  id="username"
                  value={username.value}
                  onChange={({ target: { value } }) =>
                    this.setState({
                      username: {
                        ...username,
                        value: value.toLowerCase(),
                        error: "",
                      },
                    })
                  }
                  onKeyDown={this.handleKeyDown}
                />
                {!!username.error && (
                  <FormHelperText>{username.error}</FormHelperText>
                )}
              </FormControl>
              <FormControl margin="dense" error={!!password.error}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={"password"}
                  value={password.value}
                  onChange={(event) =>
                    this.setState({
                      password: {
                        ...this.state.password,
                        value: event.target.value,
                        error: "",
                      },
                    })
                  }
                  onKeyDown={this.handleKeyDown}
                />
                {!!password.error && (
                  <FormHelperText>{password.error}</FormHelperText>
                )}
              </FormControl>
              <Box pl={10} pr={10} pt={4} pb={5}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  onClick={this.onNextClick}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </>
    );
  };
}

export default connect(null, {
  createSession,
  setError,
})(withStyles(styles)(SignIn));
