import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormHelperText from "@material-ui/core/FormHelperText";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class CommodityTypesModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: {
        value: null,
        error: null,
      }
    };
  }

  onConfirmClick = () => {
    const { name } = this.state;
    let hasError = false;

    if(!name.value) {
      this.setState({
        name: { ...name, error: "Name can't be blank!" },
      });
      hasError = true;
    }
    if (name.value && name.value.trim().length <= 2) {
      this.setState({
        name: { ...name, error: "Name is too short(minimum is 3 characters)" },
      });
      hasError = true;
    }

    if (hasError) return;
    else {
      this.setState({
        name: {
          ...name, error: null
        }
      })

      this.props.onConfirmClick({
        id: this.props.id,
        name: name.value,
      });
    }
  };

  render() {
    const { name } = this.state;

    return (
      <div>
        <Dialog
          open={this.props.open.open}
          onClose={() => {
            this.props.onCloseClick();
          }}
          aria-labelledby="customized-dialog-title"
          fullWidth={true}
        >
          <DialogTitle
            id="form-dialog-title"
            onClose={() => {
              this.props.onCloseClick();
            }}
          >
            Type of Commodity
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Update type of commodity:</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="commodity_type"
              variant="outlined"
              label="Type of Commodity:"
              defaultValue={this.props.name}
              type="string"
              fullWidth
              onChange={({ target: { value } }) => {
                this.setState({ name: { ...name, value } });
              }}
            />
            {!!name.error && <FormHelperText style={{color: 'red'}}>{name.error}</FormHelperText>}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.onCloseClick();
              }}
              color="primary"
            >
              Cancel
            </Button>
            {this.props.name && (
              <Button
                onClick={() => {
                  this.props.onDeleteClick(this.props.id);
                }}
                color="secondary"
                variant="contained"
              >
                Delete
              </Button>
            )}
            <Button
              onClick={this.onConfirmClick}
              color="primary"
              variant="contained"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CommodityTypesModal;
