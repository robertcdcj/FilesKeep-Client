import React, { Component } from "react";
import axios from "axios";

class ErrorAlert extends Component {
    state = {
        errorMessage: ""
    }

    responseErrorInterceptor = (err) => {
        if (err.response.status === 400) {
            let errorMessage;
            if (typeof err.response.data === "object" && err.response.data.error) {
                errorMessage = err.response.data.error.toString();
            } else {
                errorMessage = err.response.data.toString();
            }
            this.setState({ errorMessage: errorMessage });
        }
        return Promise.reject(err);
    }

    responseInterceptor = (res) => {
        if (res.status === 200) {
            this.removeErrorMessage();
        }
        return res;
    }

    removeErrorMessage = () => {
        if (this.state.errorMessage !== "") {
            this.setState({ errorMessage: "" });
        }
    }

    componentDidMount() {
        axios.interceptors.response.use(this.responseInterceptor, this.responseErrorInterceptor);
    }

    componentWillUnmount() {
        axios.interceptors.response.eject(this.responseInterceptor, this.responseErrorInterceptor);
    }

    render() {
        let errorAlert = <div></div>;
        if (this.state.errorMessage !== "") {
            errorAlert = (
                <div class="alert alert-danger alert-dismissible">
                    <button class="close" aria-label="close" onClick={this.removeErrorMessage}>&times;</button>
                    {this.state.errorMessage}
                </div>
            );
        }
        return (
            <React.Fragment>
                {errorAlert}
            </React.Fragment>
        );
    }
}

export default ErrorAlert;