import React, { Component } from "react";
import documentImage from "../icon/document.png";
import { Link, Route, Switch, Redirect } from "react-router-dom";
// import videoImage from "../icon/video.jpg";
import axios from "axios";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
import * as constants from "../Constants";


class Navbar extends Component {
    onLogoutHandler = () => {
        axios.get(constants.ROOT_URL + "/logout", {
            withCredentials: true
        })
            .then((res) => {
                // console.log(res.data.files);
                if (res.status === 200) {
                    this.props.onNotAuthenticated();
                    this.props.history.push("/");
                }
            })
            .catch((err) => {
                this.props.onNotAuthenticated();
                this.props.history.push("/");
                console.log(err);
            });

    };

    render() {
        let authOnlyLinks = (
            <React.Fragment>
                {/* <li class="nav-item">
                    <Link className="nav-link" to="/upload">Upload</Link>
                </li> */}
                <li class="nav-item">
                    <Link className="nav-link" to="/myFiles">My Files</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/sharedWithMe">Shared With Me</Link>
                </li>
                <li class="nav-item">
                    <a className="nav-link" onClick={this.onLogoutHandler} style={{ cursor: "pointer" }}>Log Out</a>
                </li>
            </React.Fragment>
        );

        let nonAuthOnlyLinks = (
            <React.Fragment>
                <li class="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li class="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </React.Fragment>
        );

        return (
            <nav class="navbar navbar-expand-lg sticky-top navbar-light bg-light">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <li><Link className="nav-link" to="/" style={{ color: "black" }}><img src={documentImage} height="30"></img> Files Keep</Link></li>
                    </li>
                </ul>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <li><Link className="nav-link" to="/">Home</Link></li>
                        </li>

                        {this.props.auth ? authOnlyLinks : nonAuthOnlyLinks}
                    </ul>
                </div>
            </nav>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
