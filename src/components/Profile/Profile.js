import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

import { withStyles } from "@material-ui/styles";
import styles from "./Profile.styles";

import { sessionService } from "redux-react-session";
import { connect } from "react-redux";

import { getProfile, clearLocalProfile } from "../../actions/profilesActions";
import { deleteSession } from "../../actions/sessionsActions";
import { setError } from "../../actions/errorsAction";
import history from "../../history";

import AppHeader from "../AppHeader/AppHeader";

class Profile extends React.Component {
  componentDidMount = () => {
    sessionService
      .loadSession()
      .then((current_session) => {
        if (current_session.token) {
          this.props.getProfile(current_session.token).catch((error) => {
            this.props.setError(error).then(() => {
              if (this.props.error.type === "access_token_invalid") {
                sessionService.deleteSession().then(() => {
                  this.props.deleteSession().then(() => {
                    this.props.clearLocalProfile().then(() => {
                      history.push("/signin");
                    });
                  });
                });
              }
            });
          });
        }
      })
      .catch(() => {
        history.push("/signin");
      });
  };

  renderProfile = () => {
    const { first_name, last_name, phone } = this.props.profile.manager;
    const { classes } = this.props;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h5">First name: {first_name}</Typography>
            <hr />
            <Typography variant="h5">Last name: {last_name}</Typography>
            <hr />
            <Typography variant="h5">Phone: {phone}</Typography>
          </CardContent>
        </Card>
        <Box pl={6} pr={10} pt={4} pb={5}>
          <Button
            variant="contained"
            color="primary"
            // disabled={loading}
            onClick={()=>{
              history.push('/commodity_types')
            }}
          >
            Types of Commodity
          </Button>
        </Box>
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <AppHeader />
        <Box pl={5} pr={10} pt={4} pb={5}>
          <Typography variant="h3" className={classes.header}>
            Your profile!
          </Typography>
          {this.props.profile.manager.id && this.renderProfile()}
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  getProfile,
  clearLocalProfile,
  deleteSession,
  setError,
})(withStyles(styles)(Profile));
