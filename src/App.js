import React, { Component } from 'react';
import logo from './logo.svg';
import classes from './App.module.css';
import axios from "axios";
import { Link, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import MyNavBar from "./components/MyNavBar";
import Footer from "./components/Footer";
// import FileDropArea from "./containers/FileDropArea";
// import UploadItem from "./components/UploadItem/UploadItem";
import Home from "./containers/Home";
import Upload from "./containers/MyFiles/Upload/Upload";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Secret from "./containers/Secret";
import MyFiles from "./containers/MyFiles/MyFiles";
import SharedFiles from "./containers/SharedFiles/SharedFiles";
import ErrorAlert from "./containers/ErrorAlert/ErrorAlert";

import withAuth from "./hoc/withAuth";
import getAuth from "./hoc/getAuth";

import Filler from "./components/Filler";
import * as actionTypes from "./store/actions";
import * as constants from "./Constants";

class App extends Component {
    state = {
        errorMessage: ""
    }

    responseErrorInterceptor = (err) => {
        if (err.response.status === 401) {
            this.props.onNotAuthenticated();
        }
        return Promise.reject(err);
    }

    componentDidMount() {
        let props = this.props;

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

    componentDidMount() {
        axios.interceptors.response.use(null, this.responseErrorInterceptor);
    }

    componentWillUnmount() {
        axios.interceptors.response.eject(null, this.responseErrorInterceptor);
    }

    render() {
        return (
            <div className={classes.App}>
                <Route path="/" component={MyNavBar} />

                <ErrorAlert />

                <div className={classes.content}>
                    <Switch>
                        <Route path="/" exact component={getAuth(Home)} />
                        <Route path="/login" component={getAuth(Login)} />
                        <Route path="/secret" component={withAuth(Secret)} />
                        <Route path="/myFiles" component={withAuth(MyFiles)} />
                        <Route path="/sharedFiles/:folderId" component={getAuth(SharedFiles)} />
                        <Route path="/sharedWithMe" component={getAuth(() => { return <SharedFiles sharedWithMe={true} /> })} />
                        <Route path="/register" component={getAuth(Register)} />
                        <Redirect from="/" to="/" />
                    </Switch>
                </div>

                <Route path="/" component={Footer} />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: () => { return dispatch({ type: actionTypes.AUTHENTICATED }) },
        onNotAuthenticated: () => { return dispatch({ type: actionTypes.NOT_AUTHENTICATED }) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
