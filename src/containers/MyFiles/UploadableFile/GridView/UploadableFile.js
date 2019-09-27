import React, { Component } from "react";
import Upload from "../../Upload/Upload";
import { Menu, Item, Separator, Submenu, MenuProvider, animation, IconFont } from 'react-contexify';
import classes from "./UploadableFile.module.css";

import UploadableFileMenu from "./UploadableFileMenu/UploadableFileMenu";
import * as helper from "../helper";

class UploadableFile extends Component {

    handleEntryDragStart = event => {
        let from = JSON.stringify({
            id: this.props.file._id,
            type: "file"
        });
        
        event.dataTransfer.setData("isentry", "true");
        event.dataTransfer.setData("entry", from);
        // event.dataTransfer.setData("dragContent", from);
    };

    render() {
        let file = this.props.file;
        let progressBar = null;

        if (file.uploading) {
            let progressBarClasses = "progress-bar bg-success";
            if (file.uploadProgress < 100) {
                progressBarClasses += " progress-bar-striped progress-bar-animated";
            }
            progressBar = (
                <React.Fragment>
                    <div className={["progress", classes.progressBar].join(" ")}>
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
                    </div>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <MenuProvider
                    onDragStart={this.props.onDragStart(file)}
                    draggable="true"
                    data-key={Math.random() * 1000}
                    className={["col-6 col-md-3 col-lg-2 m-0", classes.UploadableFile].join(" ")}
                    key={file._id}
                    id={file._id}
                    uploading={file.uploading}
                    deleteFile={() => { this.props.deleteFile() }}
                    style={{ width: "18rem" }}
                >
                    {helper.getIconByMimeType(file.mimeType, file.name, "5rem")}
                    <div className={classes.fileName} title={file.name}><i class="fas fa-file"></i> {file.name}</div>
                    <div><i class="fas fa-box"></i> {helper.getFileSizeString(file.fileSize)}</div>
                    {progressBar}
                    {file.uploading ? <button>Cancel</button> : null}
                </MenuProvider>
                <UploadableFileMenu
                    id={file._id}
                    deleteFile={() => { this.props.deleteFile() }}
                    uploading={file.uploading}>
                </UploadableFileMenu>
            </React.Fragment>
        );
    }
}

export default UploadableFile;