import React, {Component} from "react";
import axios from "axios";

class Secret extends Component {
    state = {
        message: "loading..."
    };

    componentDidMount() {
        axios.get("http://localhost:3000/secret", {
            withCredentials: true
        })
        .then((res) => {
            // console.log(res);
            this.setState({message: res.data})
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <h1>Secret</h1>
                <p>{this.state.message}</p>
            </div>
        );
    }
}

export default Secret;
