import React, { Component } from "react";
import classes from "./UploadingView.module.css";
import ListViewUploadableFile from "../UploadableFile/ListView/UploadableFile";

class UploadingView extends Component {
    state = {
        minimized: false
    }

    toggleMinimizedState = () => {
        this.setState({ minimized: !this.state.minimized });
    }

    render() {

        let containerState = [classes.UploadingView];
        if (this.state.minimized) {
            containerState.push(classes.minimized);
        }

        let minimizeButtonClass = this.state.minimized ? "fas fa-angle-up" : "fas fa-angle-down";

        const numberOfFiles = Object.entries(this.props.files).length;
        const numberOfUploadingFiles = Object.entries(this.props.files).reduce((accumulator, [id, file]) => {
            if (file.uploading) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);
        const numberOfUploadedFiles = Object.entries(this.props.files).reduce((accumulator, [id, file]) => {
            if (!file.cancelled && !file.uploading && file.uploadProgress === 100) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);
        const numberOfAbortedFiles = Object.entries(this.props.files).reduce((accumulator, [id, file]) => {
            if (file.cancelled) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);

        let titleString = "";
        if (numberOfUploadingFiles > 0) {
            titleString = `${numberOfUploadedFiles}/${numberOfFiles} upload${numberOfUploadingFiles > 1 ? "s" : ""} complete`;
        } else {
            titleString = `${numberOfUploadedFiles} upload${numberOfFiles > 1 ? "s" : ""} complete`;
        }
        if (numberOfAbortedFiles > 0) {
            titleString += ` (${numberOfAbortedFiles} cancelled)`;
        }

        return (
            <div className={containerState.join(" ")}>
                <div className={[classes.InfoBar, "d-flex align-items-center justify-content-between"].join(" ")}>
                    <span>{titleString}</span>
                    <span className={classes.buttonHolder}>
                        <button
                            onClick={this.toggleMinimizedState}
                            title="Minimize"
                        >
                            <i className={minimizeButtonClass}></i>
                        </button>
                        <button
                            onClick={this.props.closeView}
                            title="Close"
                        >
                            <i class="fas fa-times"></i>
                        </button>
                    </span>
                </div>
                <div className={classes.ItemContainer}>
                    {
                        Object.entries(this.props.files).map(([id, file]) => {
                            return (
                                <ListViewUploadableFile key={id} file={file} cancelUpload={() => {this.props.cancelUpload(id)}}/>
                                // <div style={{ border: "1px solid black" }}>
                                //     <div>id: {file._id}</div>
                                //     <div>size: {file.fileSize}</div>
                                //     <div>mime: {file.mimeType}</div>
                                //     <div>name: {file.originalFileName}</div>
                                //     <div>progress: {file.uploadProgress}</div>
                                // </div>
                            );
                        })
                    }
                </div>

            </div>
        );
    }
}

export default UploadingView;