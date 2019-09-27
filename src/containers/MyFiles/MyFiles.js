import React, { Component } from "react";
import axios from "axios";
import * as constants from "../../Constants";
import GridViewUploadableFile from "./UploadableFile/GridView/UploadableFile";
import ListViewUploadableFile from "./UploadableFile/ListView/UploadableFile";
import 'react-contexify/dist/ReactContexify.min.css';
import classes from "./MyFiles.module.css";
import FileDropArea from "./FileDropArea/FileDropArea";
import Spinner from "../../components/Spinner/Spinner";
import UploadingView from "./UploadingView/UploadingView";
import qs from "querystring";

import GridViewEntryList from "../../components/EntryList/GridViewEntryList/GridViewEntryList";
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav";

const CancelToken = axios.CancelToken;

const defaultFileObject = {
    fileSize: 0,
    mimeType: "",
    name: "",
    uploadProgress: 100,
    uploading: false,
    cancelled: false,
    _id: "",
    cancelToken: null,
    selected: false
}

class MyFiles extends Component {
    state = {
        files: [],
        folders: [],
        uploadingFiles: {},
        initialFetch: true,
        showUploadingView: false,
        folderLevels: [{ name: "Home Folder", _id: "", type: "folder" }]
    };

    currentFolderId = "";

    retrieveOwnedFilesHandlerTimer = null;
    retrieveOwnedFilesHandlerRequestFlag = false;

    uploadingFilesHolder = {};
    updateUploadingFilesToStateTimer = null;
    updateUploadingFilesToState = () => {
        if (!this.updateUploadingFilesToStateTimer) {
            this.updateUploadingFilesToStateTimer = setTimeout(() => {
                let files = [...this.state.files];

                Object.entries(this.uploadingFilesHolder).forEach(([id, fileObject]) => {
                    if (fileObject.uploadProgress >= 100 && fileObject.uploading === true) {
                        fileObject.uploading = false;
                        fileObject.uploadProgress = 100;

                        files.unshift(fileObject);

                        // delete this.uploadingFilesHolder[id];

                        this.retrieveOwnedFilesHandler();
                    }
                });

                this.setState({
                    uploadingFiles: this.uploadingFilesHolder
                })

                // this.setState({
                //     uploadingFiles: this.uploadingFilesHolder,
                //     files: files
                // });

                this.updateUploadingFilesToStateTimer = null;
            }, 200);
        }
    }

    toggleSelected = (entry) => {
        if (entry.type === "file") {
            let newFiles = [...this.state.files];
            let entryToUpdate = newFiles[newFiles.indexOf(entry)];
            entryToUpdate.selected = !entryToUpdate.selected;

            this.setState({ files: newFiles });
        } else if (entry.type === "folder") {
            let newFolders = [...this.state.folders];
            let entryToUpdate = newFolders[newFolders.indexOf(entry)];
            entryToUpdate.selected = !entryToUpdate.selected;

            this.setState({ folders: newFolders });
        }
    }

    closeUploadingView = () => {
        this.setState({ showUploadingView: false });
    }

    openUploadingView = () => {
        this.setState({ showUploadingView: true });
    }

    componentDidMount() {
        this.setState({ initialFetch: true });
        this.retrieveOwnedFilesHandler();
    }

    createId = () => {
        return Math.random().toString(36).substr(2, 9);
    }

    retrieveOwnedFilesHandler = () => {
        // this.setState({ initialFetch: true });
        if (this.retrieveOwnedFilesHandlerTimer !== null) {
            this.retrieveOwnedFilesHandlerRequestFlag = true;
            return;
        } else {
            this.retrieveOwnedFilesHandlerTimer = setTimeout(() => {
                if (this.retrieveOwnedFilesHandlerRequestFlag === true) {
                    this.retrieveOwnedFilesHandler();
                }
                this.retrieveOwnedFilesHandlerRequestFlag = false;
                this.retrieveOwnedFilesHandlerTimer = null;
            }, 200);
        }

        const queryString = qs.stringify({
            parentId: this.currentFolderId
        });

        axios.get(constants.ROOT_URL + `/entries?${queryString}`, {
            withCredentials: true
        })
            .then((res) => {
                this.setState({
                    files: res.data.files,
                    folders: res.data.folders,
                    initialFetch: false
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ initialFetch: false });
            });
    };

    removeFolderWithId = (folderId) => {
        let newFoldersArray = this.state.folders.filter((item, index, arr) => {
            return item._id != folderId;
        });

        this.setState({
            ...this.state,
            folders: newFoldersArray
        });
    }

    removeFileWithId = (fileId) => {
        let newFilesArray = this.state.files.filter((item, index, arr) => {
            return item._id != fileId;
        });

        this.setState({
            ...this.state,
            files: newFilesArray
        });
    }

    deleteEntry = (entry) => {
        if (entry.type === "file") {
            this.deleteFileWithIdHandler(entry._id);
        } else {
            this.deleteFolderWithIdHandler(entry._id);
        }
    }

    deleteFolderWithIdHandler = (folderId) => {
        axios.delete(constants.ROOT_URL + "/folders/" + folderId,
            {
                withCredentials: true
            })
            .then((res) => {
                if (res.status === 200) {
                    this.removeFolderWithId(folderId);
                } else {
                    throw new Error(res.error);
                }
            })
            .catch((err) => {
                this.removeFolderWithId(folderId);
            });
    };

    deleteFileWithIdHandler = (fileId) => {
        axios.delete(constants.ROOT_URL + "/files/" + fileId,
            {
                withCredentials: true
            })
            .then((res) => {
                if (res.status === 200) {
                    this.removeFileWithId(fileId);
                } else {
                    throw new Error(res.error);
                }
            })
            .catch((err) => {
                this.removeFileWithId(fileId);
            });
    };

    // handleEntryDragStart = (data, event) => {
    //     let from = JSON.stringify({id: "20"});
    //     event.dataTransfer.setData("dragContent", from);
    // };

    updateEntryName = (entry, newName) => {
        const uploadData = new FormData();
        uploadData.append(`type`, entry.type);
        uploadData.append(`newName`, newName);

        axios.put(constants.ROOT_URL + `/entries/${entry._id}`,
            uploadData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            }
        ).then((res) => {
            // console.log(res);
            this.retrieveOwnedFilesHandler();
        }).catch((err) => {
            console.log(err);
        });
    }

    entryDoubleClickHandler = (entry) => {
        if (entry && entry.type === "folder") {
            this.enterFolder(entry)
        }
    }

    handleEntryDragStart = (entry) => {
        return (event) => {
            event.dataTransfer.setData("isentry", "true");
            event.dataTransfer.setData("entry", JSON.stringify(entry));

            // event.dataTransfer.setData("dragContent", from);
        };
    };

    updateEntryShareHandler = (entryId, formData) => {
        axios.put(constants.ROOT_URL + `/entries/${entryId}/share`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            }
        ).then((res) => {
            // console.log(res);
            this.retrieveOwnedFilesHandler();
        }).catch((err) => {
            console.log(err);
        });
    }

    addSharePersonHandler = (entryId, entryType, email) => {
        const uploadData = new FormData();
        uploadData.append(`type`, entryType);
        uploadData.append(`privateShareAdd`, email);

        this.updateEntryShareHandler(entryId, uploadData);
    }

    removeSharePersonHandler = (entryId, entryType, email) => {
        const uploadData = new FormData();
        uploadData.append(`type`, entryType);
        uploadData.append(`privateShareRemove`, email);

        this.updateEntryShareHandler(entryId, uploadData);
    }

    setPublicShareStateHandler = (entryId, entryType, newSetting) => {
        const uploadData = new FormData();
        uploadData.append(`type`, entryType);
        uploadData.append(`publicShare`, newSetting);

        this.updateEntryShareHandler(entryId, uploadData);
    }

    handleEntryDrop = (data) => {
        return (event) => {
            event.preventDefault();

            try {
                let entry = JSON.parse(event.dataTransfer.getData("entry"));

                const entryId = entry._id;
                const newParentId = data._id;

                if (entryId !== null && newParentId !== null && entryId !== newParentId) {
                    const uploadData = new FormData();
                    uploadData.append(`id`, entryId);
                    uploadData.append(`parentId`, newParentId);
                    uploadData.append(`type`, entry.type);

                    axios.put(constants.ROOT_URL + "/entries/move",
                        uploadData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            },
                            withCredentials: true
                        }
                    ).then((res) => {
                        // console.log(res);
                        this.retrieveOwnedFilesHandler();
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            } catch (err) {
            } finally {
                return false;
            }
        };
    }

    handleDrop = (event) => {
        let dt = event.dataTransfer;
        // console.log(dt.files);
        // console.log(dt.items);
        // let fileList = { ...this.uploadingFilesHolder };
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
                ...defaultFileObject,
                file: file,
                _id: id,
                uploadProgress: 0,
                uploading: false,
                name: file.name,
                fileSize: file.size,
                mimeType: file.type
            };
            this.uploadingFilesHolder[id] = fileObject;
        }
        this.updateUploadingFilesToState();

        Object.entries(this.uploadingFilesHolder).forEach(([id, fileObject]) => {
            if (!this.state.showUploadingView) {
                this.setState({ showUploadingView: true });
            }
            if (fileObject.uploading === false && fileObject.uploadProgress === 0) {
                fileObject.uploading = true;
                this.uploadFileHandler(id);
            }
        });
    }

    uploadFileHandler = (fileId) => {
        if (this.uploadingFilesHolder) {
            let fileToUpload = this.uploadingFilesHolder[fileId];

            if (fileToUpload) {
                // create and sttach cancelToken so request can be cancelled if needed
                const cancelToken = CancelToken.source();
                fileToUpload.cancelToken = cancelToken;

                // add the file to be uploaded into form data
                const uploadData = new FormData();
                uploadData.append(`file`, fileToUpload.file);
                uploadData.append(`parentId`, this.currentFolderId);

                axios.post(constants.ROOT_URL + "/files",
                    uploadData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        withCredentials: true,
                        cancelToken: cancelToken.token,
                        onUploadProgress: (progressEvent) => {
                            // update upload progress in percentage
                            fileToUpload.uploadProgress = (100.0 * progressEvent.loaded / progressEvent.total);

                            // queue the state update
                            this.updateUploadingFilesToState();
                        }
                    }
                ).then((res) => {
                    // console.log(res);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    }

    cancelUploadFileHandler = (fileId) => {
        if (this.uploadingFilesHolder) {
            let fileToUpload = this.uploadingFilesHolder[fileId];

            if (fileToUpload && fileToUpload.cancelToken) {
                fileToUpload.cancelToken.cancel();

                fileToUpload.uploading = false;
                fileToUpload.cancelled = true;

                // queue the state update
                this.updateUploadingFilesToState();
            }
        }
    }

    createFolder = (folderName) => {
        const uploadData = new FormData();
        uploadData.append(`name`, folderName);
        uploadData.append(`parentId`, this.currentFolderId);
        axios.post(constants.ROOT_URL + "/folders",
            uploadData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            }
        ).then((res) => {
            // console.log(res);
            this.retrieveOwnedFilesHandler();
        }).catch((err) => {
            // console.log(err);
        });
    }

    enterFolder = (folder) => {
        if (folder._id && folder.name) {
            const newFolderLevels = [...this.state.folderLevels];
            newFolderLevels.push(folder);
            this.setState({ folderLevels: newFolderLevels });
            // fetch stuff
            this.setState({ initialFetch: true });
            this.currentFolderId = folder._id;
            this.retrieveOwnedFilesHandler();
        }
    }

    goToFolderAtIndex = (index) => {
        if (index >= 0) {
            const newFolderLevels = this.state.folderLevels.slice(0, index + 1);
            this.setState({ folderLevels: newFolderLevels });
            // fetch stuff
            this.setState({ initialFetch: true });
            this.currentFolderId = newFolderLevels[index]._id;
            this.retrieveOwnedFilesHandler();
        }
    }

    changeFolderHandler = (folder) => {
        let folderIndexInArray = this.state.folderLevels.indexOf(folder);
        let newFolderLevels = [...this.state.folderLevels];
        if (folderIndexInArray > -1) {
            newFolderLevels.slice(0, folderIndexInArray + 1);
        } else {
            newFolderLevels.push(folder);
        }

        this.setState({ folderLevels: newFolderLevels });
        // refetch stuff
    }

    render() {

        let uploadedEntries = null;
        if (this.state.initialFetch) {
            uploadedEntries = (
                <Spinner />
            );
        } else {
            if (this.state.files.length > 0 || this.state.folders.length > 0) {
                uploadedEntries = (
                    <React.Fragment>
                        <GridViewEntryList
                            entries={this.state.folders}
                            entryDrop={this.handleEntryDrop}
                            dragStart={this.handleEntryDragStart}
                            doubleClick={this.entryDoubleClickHandler}
                            delete={this.deleteEntry}
                            toggleSelected={this.toggleSelected}
                            save={this.updateEntryName}
                            addShare={this.addSharePersonHandler}
                            removeShare={this.removeSharePersonHandler}
                            setPublicShare={this.setPublicShareStateHandler} />
                        <GridViewEntryList
                            entries={this.state.files}
                            dragStart={this.handleEntryDragStart}
                            doubleClick={this.entryDoubleClickHandler}
                            delete={this.deleteEntry}
                            toggleSelected={this.toggleSelected}
                            save={this.updateEntryName}
                            addShare={this.addSharePersonHandler}
                            removeShare={this.removeSharePersonHandler}
                            setPublicShare={this.setPublicShareStateHandler} />
                    </React.Fragment>
                );
            } else {
                uploadedEntries = <p>No files here. Drag and drop to upload your first file!</p>;
            }
        }

        return (
            <div>
                <BreadcrumbNav
                    folderLevels={this.state.folderLevels}
                    clicked={this.goToFolderAtIndex}
                    dropped={this.handleEntryDrop}
                    createFolder={this.createFolder}
                />

                <h1>My files</h1>

                <FileDropArea handleDrop={this.handleDrop}>
                    {/* {uploadedFiles} */}
                    <div className={["row container", classes.container].join(" ")} >
                        {uploadedEntries}
                    </div>
                </FileDropArea>

                {this.state.showUploadingView ? <UploadingView closeView={this.closeUploadingView} files={this.state.uploadingFiles} cancelUpload={this.cancelUploadFileHandler} /> : null}
            </div>
        );
    }
}

export default MyFiles;
