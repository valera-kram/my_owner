import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { withStyles } from "@material-ui/styles";
import styles from "./AppHeader.styles";

import { connect } from "react-redux";
import history from "../../history";


import { clearLocalProfile } from "../../actions/profilesActions";
import { deleteSession } from "../../actions/sessionsActions";

class AppHeader extends React.Component {
  onSignOut = () => {
    this.props.deleteSession().then(() => {
      this.props.clearLocalProfile().then(() => history.push("/signin"));
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              My-Owner
            </Typography>
            <IconButton onClick={this.onSignOut}>
              <ExitToAppRoundedIcon className={classes.iconButton} />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default connect(null, { clearLocalProfile, deleteSession })(
  withStyles(styles)(AppHeader)
);
