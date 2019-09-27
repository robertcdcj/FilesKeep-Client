import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import * as actionTypes from "../store/actions";
import * as constants from "../Constants";
import axios from "axios";
import Spinner from "../components/Spinner/Spinner";

const getAuth = (ComponentToProtect) => {

    const withAuthClass = class extends Component {
        componentDidMount() {
            let props = this.props;
            if (this.props.initialLaunch) {
                axios.get(constants.ROOT_URL + "/checkToken", {
                    withCredentials: true
                })
                    .then((res) => {
                        if (res.status === 200) {
                            props.onAuthenticated();
                        } else {
                            props.onNotAuthenticated();
                        }
                    })
                    .catch((err) => {
                        props.onNotAuthenticated();
                    });
            }
        }

        render() {
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    };

    const mapStateToProps = (state) => {
        return {
            auth: state.auth,
            initialLaunch: state.initialLaunch
        };
    };

    const mapDispatchToProps = (dispatch) => {
        return {
            onAuthenticated: () => { return dispatch({ type: actionTypes.AUTHENTICATED }) },
            onNotAuthenticated: () => { return dispatch({ type: actionTypes.NOT_AUTHENTICATED }) }
        };
    };

    return connect(mapStateToProps, mapDispatchToProps)(withAuthClass);
};

export default getAuth;
