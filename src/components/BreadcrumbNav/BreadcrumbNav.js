import React, { Component } from "react";
import BreadcrumbNavItem from "./BreadcrumbNavItem/BreadcrumbNavItem";

import AddFolderModal from "../Modal/AddFolderModal";

import classes from "./BreadcrumbNav.module.css";

class BreadcrumbNav extends Component {

    componentDidMount() {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', this.backButtonClickedListener);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.backButtonClickedListener);
    }

    backButtonClickedListener = () => {
        if (this.props.folderLevels.length >= 2) {
            window.history.pushState(null, document.title, window.location.href);
            this.props.clicked(this.props.folderLevels.length - 2);
        } else {
            window.history.back();
        }
    }

    render() {
        let addFolderButton;

        if (this.props.createFolder) {
            addFolderButton = (
                <button
                    className={classes.AddFolderButton}
                    onClick={() => {
                        window.jQuery(`#addFolderModal`).modal("show")
                    }}
                >
                    <i class="fas fa-folder-plus"></i> Add Folder
                </button>
            );
        }

        return (
            <React.Fragment>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        {this.props.folderLevels.map((folder, index, array) => {
                            let itemClasses = "breadcrumb-item";
                            if (array.length === index + 1) {
                                itemClasses += " active";
                            }
                            return (
                                <BreadcrumbNavItem
                                    itemClasses={itemClasses}
                                    folder={folder}
                                    clicked={() => { this.props.clicked(index) }}
                                    dropped={this.props.dropped ? this.props.dropped(folder) : null}
                                    isActive={array.length === index + 1}
                                />);
                        })
                        }
                        <li class="ml-auto">
                            {addFolderButton}
                        </li>
                    </ol>
                </nav>
                <AddFolderModal
                    modalId="addFolderModal"
                    modalTitle="Create New Folder"
                    createFolder={this.props.createFolder}
                />
            </React.Fragment>

        );
    }
}

export default BreadcrumbNav;