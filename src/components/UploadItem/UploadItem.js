import React, {Component} from "react";
import classes from "./UploadItem.module.css";
import documentImage from "../../icon/document.png";
import videoImage from "../../icon/video.jpg";

class UploadItem extends Component {

    state = {
        icon: null
    }

    componentDidMount() {
        this.getIcon(this.props.fileObject.file.type);
    }

    getIcon = (fileType) => {
        let [type, subtype] = fileType.split("/");
        let reader = new FileReader();
        switch (type) {
            case "image":
                reader.onload = (e) => {
                    this.setState({icon: e.target.result});
                }
                reader.readAsDataURL(this.props.fileObject.file);
                break;
            case "text":
                this.setState({icon: documentImage});
                break;
            case "video":
                // let blobURL = URL.createObjectURL(this.props.fileObject.file);
                // this.setState({icon: blobURL});
                this.setState({icon: videoImage});
                break;
            case "application":
            case "audio":
            case "example":
            case "font":
            case "model":
            default:
                this.setState({icon: documentImage});
                break;
        }
    }

    capStringLength = (string) => {
        const charLimit = 15;
        let returnString = string;

        if (string.length > charLimit) {
            returnString = string.slice(0, charLimit) + "...";
        }

        return returnString;
    }
    
    render() {
        let progressBarClasses = "progress-bar bg-success";
        if (this.props.fileObject.uploadProgress < 100) {
            progressBarClasses += " progress-bar-striped progress-bar-animated";
        }
        return (
            <div className={classes.uploadItemContainer}>
                <img src={this.state.icon}></img>
                <div className={classes.itemName}>{this.capStringLength(this.props.fileObject.file.name)}</div>
                <div className={["progress", classes.progressBar].join(" ")}>
                    <div
                        className={progressBarClasses}
                        role="progressbar"
                        aria-valuenow={this.props.fileObject.uploadProgress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                        style={{width: this.props.fileObject.uploadProgress+"%"}}>
                        {this.props.fileObject.uploadProgress.toFixed(1)} %
                    </div>
                </div>
            </div>
        );
    }
}

export default UploadItem;
