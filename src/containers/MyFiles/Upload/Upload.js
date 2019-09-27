import React, {Component} from "react";
import FileDropArea from "../FileDropArea/FileDropArea";
import UploadItem from "../../../components/UploadItem/UploadItem";
import axios from "axios";
import classes from "./Upload.module.css";
import * as constants from "../../../Constants";

class Upload extends Component {
    state = {
        files: {}
    };

    componentDidMount() {

    }

    createId = () => {
        return Math.random().toString(36).substr(2, 9);
    }

    handleDrop = (event) => {
        let dt = event.dataTransfer;
        // console.log(dt.files);
        // console.log(dt.items);
        let fileList = {...this.state.files};
        for (var i = 0; i < dt.files.length; i++) {
            let itemEntry = dt.items[i].webkitGetAsEntry();
            let isDirectory = itemEntry && itemEntry.isDirectory;
            let file = dt.files[i];

            if (!file.name || isDirectory) {
                continue;
            }
            // console.log(file.isFile);
            // console.log(file.isDirectory);
            let id = this.createId();
            let fileObject = {
                file: file,
                uploadProgress: 0,
                isUploading: false
            };
            fileList[id] = fileObject;
        }
        this.setState({ files: fileList });
    }

    uploadFilesHandler = () => {
        if (this.state.files && this.state.files !== {}) {
            const uploadData = new FormData();
            let idsToUpload = [];
            let i = 0;
            Object.entries(this.state.files).forEach(([id, fileObject]) => {
                if (!fileObject.isUploading) {
                    uploadData.append(`files[${i}]`, fileObject.file);
                    i++;
                    idsToUpload.push(id);
                }
            })

            if (idsToUpload.length > 0) {
                axios.post(constants.ROOT_URL + "/uploadFile", uploadData, {
                    withCredentials: true,
                    onUploadProgress: (progressEvent) => {
                      // console.log(progressEvent.loaded + " " +progressEvent.total);
                      let fileList = {...this.state.files};
                      for (let i = 0; i < idsToUpload.length; i++) {
                          fileList[idsToUpload[i]].uploadProgress = (100.0 * progressEvent.loaded / progressEvent.total);
                          fileList[idsToUpload[i]].isUploading = true;
                      }
                      this.setState({ files: fileList });
                    }
                })
                .then((res) => {
                    // console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            }

        }
    }

    render() {
        return (
            <div>
                <FileDropArea handleDrop={this.handleDrop}>
                    <div className={["row", classes.dropArea].join(" ")} id="dropArea">
                    {
                        Object.entries(this.state.files).map(([id, fileObject]) => {
                            return (
                                <UploadItem key={id} fileObject={fileObject}></UploadItem>
                            );
                        })
                    }
                    </div>
                </FileDropArea>

                <button className={classes.uploadButton} onClick={this.uploadFilesHandler}>Upload</button>
            </div>
        );
    }
}

export default Upload;
