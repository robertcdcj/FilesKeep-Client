import React, { Component } from "react";
import axios from "axios";
import qs from "querystring";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import { Link } from "react-router-dom";
import * as constants from "../Constants";
import { Redirect } from 'react-router-dom';

import documentImage from "../icon/document.png";

import classes from "./Register.module.css";

class Register extends Component {
    state = {
        email: "",
        password: ""
    };

    inputChangeHandler = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();

        const uploadData = new FormData();
        Object.entries(this.state).forEach(([name, value]) => {
            uploadData.append(name, value);
        });

        axios.post(constants.ROOT_URL + "/register", qs.stringify(this.state),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                withCredentials: true
            })
            .then((res) => {
                if (res.status === 200) {
                    this.props.onAuthenticated();
                    this.props.history.push("/myFiles");
                } else {
                    throw new Error(res.error);
                }
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    render() {
        return (
            <React.Fragment>
                {this.props.auth ? <Redirect to="/" /> : null}
                <div className={["", classes.Container].join(" ")}>
                    <div className={[classes.Centered].join(" ")}>
                        <form className={["d-flex flex-column justify-content-between", classes.Form].join(" ")} onSubmit={this.onSubmitHandler}>
                            <h1>Register</h1>
                            <img src={documentImage} className={classes.AppIcon} />
                            <div class="form-group">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    class="form-control"
                                    value={this.state.email}
                                    onChange={this.inputChangeHandler}
                                    required />
                            </div>
                            <div class="form-group">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    class="form-control"
                                    value={this.state.password}
                                    onChange={this.inputChangeHandler}
                                    required />
                            </div>
                            <button type="submit" className="btn btn-primary btn-lg btn-block">Register</button>
                            <div className={classes.LinkButton}><Link to="/login">Sign in instead</Link></div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthenticated: () => { return dispatch({ type: actionTypes.AUTHENTICATED }); }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
