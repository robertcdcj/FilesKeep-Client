import React, { Component } from "react";
import { Menu, Item, Separator, Submenu, MenuProvider, animation, IconFont } from 'react-contexify';
import classes from "./UploadableFile.module.css";
import * as helper from "../helper";

class UploadableFile extends Component {

    render() {
        let file = this.props.file;
        let progressBar = null;

        if (file.uploading) {
            let progressBarClasses = "progress-bar bg-success";
            if (file.uploadProgress < 100) {
                progressBarClasses += [" progress-bar-striped progress-bar-animated", classes.uploading].join(" ");
            }
            progressBar = (
                <React.Fragment>
                    <div className={["progress", classes.FullViewProgress].join(" ")}>
                        <div
                            className={[progressBarClasses, classes.FullViewProgressBar].join(" ")}
                            role="progressbar"
                            aria-valuenow={file.uploadProgress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: file.uploadProgress + "%" }} />
                    </div>
                    {/* <div className={["progress", classes.progressBar].join(" ")}>
                        <div
                            className={progressBarClasses}
                            role="progressbar"
                            aria-valuenow={file.uploadProgress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: file.uploadProgress + "%" }}
                        >
                            {file.uploadProgress.toFixed(1)} %
                        </div>
                    </div> */}
                </React.Fragment>
            );
        }

        let uploadStatusButton;
        if (file.cancelled) {
            // upload was cancelled
            uploadStatusButton = (
                <i className={["fas fa-ban", classes.cancelIcon, classes.statusIcon].join(" ")} title="Cancelled"></i>
            );
        } else {
            if (file.uploading) {
                // file is uploading, give user the option to cancel
                uploadStatusButton = (
                    <button
                        className={["", classes.abortButton].join(" ")}
                        title="Cancel Upload"
                        onClick={this.props.cancelUpload}
                    >
                        <i className={["far fa-times-circle", classes.abortedIcon, classes.statusIcon].join(" ")}></i>
                    </button>
                );
            } else {
                // file was uploaded successfully
                uploadStatusButton = (
                    <i className={["fas fa-check-circle", classes.successIcon, classes.statusIcon].join(" ")} title="Uploaded"></i>
                );
            }
        }

        return (
            <div
                className={["d-flex align-items-center", classes.UploadableFile].join(" ")}
                key={file._id}
                id={file._id}
                uploading={file.uploading}
                deleteFile={() => { this.props.deleteFile() }}
            >

                <div className={["justify-content-between", "d-flex align-items-center", classes.Content].join(" ")}>
                    {progressBar}
                    {helper.getIconByMimeType(file.mimeType, file.name, "2rem")}
                    <div>
                        <div><i class="fas fa-box"></i> {helper.getFileSizeString(file.fileSize)}</div>
                        <div className={[classes.fileName].join(" ")} title={file.name}><i class="fas fa-file"></i> {file.name}</div>
                    </div>

                    {uploadStatusButton}

                    {/* {progressBar} */}
                    {file.uploading ? <button>Cancel</button> : null}
                </div>

            </div>
        );
    }
}

export default UploadableFile;