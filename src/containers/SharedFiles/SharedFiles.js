import React, { Component } from "react";
import axios from "axios";
import * as constants from "../../Constants";
import 'react-contexify/dist/ReactContexify.min.css';
import classes from "./SharedFiles.module.css";
import Spinner from "../../components/Spinner/Spinner";

import GridViewEntryList from "../../components/EntryList/GridViewEntryList/GridViewEntryList";
import BreadcrumbNav from "../../components/BreadcrumbNav/BreadcrumbNav";

class SharedFiles extends Component {
    initialFolderId = (this.props.match ? this.props.match.params.folderId : null) || "";

    state = {
        files: [],
        folders: [],
        initialFetch: true,
        folderLevels: [{ name: "Home Folder", _id: this.initialFolderId, type: "folder" }]
    };

    currentFolderId = this.initialFolderId;

    retrieveSharedFilesHandlerTimer = null;
    retrieveSharedFilesHandlerRequestFlag = false;

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

    componentDidMount() {
        this.setState({ initialFetch: true });
        this.retrieveSharedFilesHandler();
    }

    createId = () => {
        return Math.random().toString(36).substr(2, 9);
    }

    retrieveSharedFilesHandler = () => {
        // this.setState({ initialFetch: true });

        if (this.retrieveSharedFilesHandlerTimer !== null) {
            this.retrieveSharedFilesHandlerRequestFlag = true;
            return;
        } else {
            this.retrieveSharedFilesHandlerTimer = setTimeout(() => {
                if (this.retrieveSharedFilesHandlerRequestFlag) {
                    this.retrieveSharedFilesHandlerRequestFlag = false;
                    this.retrieveSharedFilesHandler();
                }
                this.retrieveSharedFilesHandlerTimer = null;
            }, 200);
        }

        let requestURL;
        if (this.currentFolderId === "" && this.props.sharedWithMe === true) {
            requestURL = constants.ROOT_URL + `/entries/sharedWithMe`;
        } else {
            requestURL = constants.ROOT_URL + `/entries/shared/${this.currentFolderId}`;
        }

        axios.get(requestURL, {
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

    entryDoubleClickHandler = (entry) => {
        if (entry && entry.type === "folder") {
            this.enterFolder(entry)
        }
    }

    enterFolder = (folder) => {
        if (folder._id && folder.name) {
            const newFolderLevels = [...this.state.folderLevels];
            newFolderLevels.push(folder);
            this.setState({ folderLevels: newFolderLevels });
            // fetch stuff
            this.setState({ initialFetch: true });
            this.currentFolderId = folder._id;
            this.retrieveSharedFilesHandler();
        }
    }

    goToFolderAtIndex = (index) => {
        if (index >= 0) {
            const newFolderLevels = this.state.folderLevels.slice(0, index + 1);
            this.setState({ folderLevels: newFolderLevels });
            // fetch stuff
            this.setState({ initialFetch: true });
            this.currentFolderId = newFolderLevels[index]._id;
            this.retrieveSharedFilesHandler();
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
                            setPublicShare={this.setPublicShareStateHandler}
                            shared={true} />
                        <GridViewEntryList
                            entries={this.state.files}
                            dragStart={this.handleEntryDragStart}
                            doubleClick={this.entryDoubleClickHandler}
                            delete={this.deleteEntry}
                            toggleSelected={this.toggleSelected}
                            save={this.updateEntryName}
                            addShare={this.addSharePersonHandler}
                            removeShare={this.removeSharePersonHandler}
                            setPublicShare={this.setPublicShareStateHandler}
                            shared={true} />
                    </React.Fragment>
                );
            } else {
                uploadedEntries = <p>No files here</p>;
            }
        }

        return (
            <div>
                <BreadcrumbNav
                    folderLevels={this.state.folderLevels}
                    clicked={this.goToFolderAtIndex}
                    createFolder={this.createFolder}
                />

                <h1>Shared files</h1>

                <div className={["row container", classes.container].join(" ")} >
                    {uploadedEntries}
                </div>

            </div>
        );
    }
}

export default SharedFiles;
