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
import CommodityTypesTable from "../Common/Table";
import CommodityTypesModal from "./CommodityTypesModal";

class CommodityTypes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
            .getCommodityTypes({ limit: 10, offset: 0 })
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

  onNextPage = (newPage) => {
    const { limit, offset, count, total_count } = this.props.commodityTypes.pagination;

    if ((newPage + 1) * 10 > count && count !== total_count)
      this.props.getCommodityTypes({ limit: 10, offset: limit + offset })
  }

  onEditClick = (id, name) => {
    this.setState({
      commodityType: {
        id: id,
        name: name,
      }
    })

    this.props.openCommodityTypeModal();
    
  };

  onModalCloseClick = () => {
    this.setState({
      commodityType: {
        id: null,
        name: null,
      },
    }, this.props.closeCommodityTypeModal)
  };

  onConfirmClick = ({ id, name }) => {
    const { createCommodityType, updateCommodityType } = this.props;

    {
      id && name && updateCommodityType({ id, commodity_type: { name: name } })
    }

    {
      !id && name && createCommodityType({ commodity_type: { name: name } })
    }

    this.onModalCloseClick();
  };

  onDeleteClick = (id) => {
    const { commodityTypes, getCommodityTypes, deleteCommodityType, closeCommodityTypeModal } = this.props;

    const { limit, offset, count, total_count } = commodityTypes.pagination;

    deleteCommodityType(id).then(() => {
      if (total_count > count)
        getCommodityTypes({ limit: 1, offset: limit + offset })
    })

    closeCommodityTypeModal();
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
    const { data, pagination } = this.props.commodityTypes;
    const { commodityTypeModal } = this.props;
    const { id, name } = this.state.commodityType;

    return (
      <div>
        <AppHeader />
        {data && (
          <CommodityTypesTable
            rows={data}
            total_count={pagination.total_count}
            onEditClick={this.onEditClick}
            onCreateClick={this.onCreateClick}
            onNextPage={this.onNextPage}
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
