import React from "react";
import { sessionService } from "redux-react-session";

import history from "../../history";
import { connect } from "react-redux";

import {
  getCommodityTypes,
  createCommodityType,
  updateCommodityType,
  deleteCommodityType,
} from "../../actions/commodityTypesActions";
import { setError } from "../../actions/errorsAction";
import {
  openCommodityTypeModal,
  closeCommodityTypeModal,
} from "../../actions/modalsAction";

import AppHeader from "../AppHeader/AppHeader";
import CommodityTypesTable from "./CommodityTypesTable";
import CommodityTypesModal from "./CommodityTypesModal";

class CommodityTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      total_count: 0,
      count: 0,
      limit: 0,
      offset: 0,
      commodityType: {
        id: null,
        name: null,
      },
    };
  }

  componentDidMount = () => {
    sessionService
      .loadSession()
      .then((current_session) => {
        if (current_session.token) {
          this.props
            .getCommodityTypes({ limit: 20, offset: 0 })
            .then(() => {
              // console.log(this.props.commodityTypes);

              const {
                count,
                total_count,
                offset,
                limit,
              } = this.props.commodityTypes.pagination;

              this.setState({
                data: this.props.commodityTypes.data,
                total_count: total_count,
                count: count,
                limit: limit,
                offset: offset,
              });

              if (this.state.total_count > this.state.count) {
                this.loadMoreData(this.state.data);
              }
            })
            .catch((error) => {
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

  loadMoreData = (current_data) => {
    const { limit, offset } = this.state;

    this.props
      .getCommodityTypes({ limit: 20, offset: limit + offset })
      .then(() => {
        const new_data = current_data.concat(this.props.commodityTypes.data);

        this.setState({
          data: new_data,
          count: offset + this.props.commodityTypes.pagination.count,
        });
      });
  };

  onEditClick = (id, name) => {
    this.props.openCommodityTypeModal();

    this.setState({
      commodityType: {
        id: id,
        name: name,
      },
    });
  };

  onModalCloseClick = () => {
    this.props.closeCommodityTypeModal();

    this.setState({
      commodityType: {
        id: null,
        name: null,
      },
    });
  };

  onConfirmClick = ({ id, name }) => {
    {
      id &&
        name &&
        this.props
          .updateCommodityType({ id, commodity_type: { name: name } })
          .then(() => {
            let data = this.state.data;
            let new_data = [];
            data.map((pair) => {
              if (pair.id !== id) {
                new_data.push(pair);
              } else {
                new_data.push({ id, name });
              }
            });
            this.setState({
              data: new_data,
            });
          });
    }

    {
      !id &&
        name &&
        this.props
          .createCommodityType({ commodity_type: { name: name } })
          .then(() => {
            let new_data = this.state.data;
            let new_total_count = this.state.total_count + 1;
            new_data.push(this.props.commodityTypes.data);
            this.setState({
              data: new_data,
              total_count: new_total_count,
            });
          });
    }

    this.props.closeCommodityTypeModal();
  };

  onDeleteClick = (id) => {
    this.props.deleteCommodityType(id).then(() => {
      let data = this.state.data;
      let new_data = [];

      data.map((pair) => {
        if (pair.id !== id) {
          new_data.push(pair);
        }
      });

      let new_total_count = this.state.total_count - 1;

      this.setState({
        data: new_data,
        total_count: new_total_count,
      });
    });

    this.props.closeCommodityTypeModal();
  };

  onCreateClick = () => {
    this.setState({
      commodityType: {
        id: null,
        name: null,
      },
    });

    this.props.openCommodityTypeModal();
  };

  render() {
    const { data, total_count } = this.state;
    const { commodityTypeModal } = this.props;
    const { id, name } = this.state.commodityType;

    return (
      <div>
        <AppHeader />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        <hr />
        {data && (
          <CommodityTypesTable
            rows={data}
            total_count={total_count}
            onEditClick={this.onEditClick}
            onCreateClick={this.onCreateClick}
          />
        )}
        <CommodityTypesModal
          open={commodityTypeModal}
          onCloseClick={this.onModalCloseClick}
          onConfirmClick={this.onConfirmClick}
          onDeleteClick={this.onDeleteClick}
          id={id}
          name={name}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    commodityTypes: state.commodityTypes,
    error: state.error,
    commodityTypeModal: state.modals.commodityTypeModal,
  };
};

export default connect(mapStateToProps, {
  getCommodityTypes,
  createCommodityType,
  updateCommodityType,
  deleteCommodityType,
  setError,
  openCommodityTypeModal,
  closeCommodityTypeModal,
})(CommodityTypes);
