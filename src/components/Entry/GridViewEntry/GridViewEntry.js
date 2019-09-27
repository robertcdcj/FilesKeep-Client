import React, { Component } from "react";
import classes from "./GridViewEntry.module.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import EditEntryNameModal from "../../Modal/EditEntryNameModal";
import DeleteEntryModal from "../../Modal/DeleteEntryModal";
import ShareEntryModal from "../../Modal/ShareEntryModal";

import * as constants from "../../../Constants";
import "./react-contextmenu.css";

import * as helper from "../helper";

class GridViewEntry extends Component {

    render() {
        const entry = this.props.entry;
        const [id, name, type, parentId, userId] = [entry._id, entry.name, entry.type, entry.parentId, entry.userId];

        // file-only properties
        const [fileSize, mimeType] = [entry.fileSize, entry.mimeType];
        let fileSizeComponent;
        if (type === "file" && fileSize) {
            fileSizeComponent = (
                <div>
                    hi
                </div>
            );
        }

        let containerClasses = [classes.GridViewEntry];
        if (entry.selected) {
            containerClasses.push(classes.Selected)
        }
        containerClasses = containerClasses.join(" ");

        let downloadMenuItem;
        if (type === "file") {
            if (!(this.props.shared === true)) {
                downloadMenuItem = (
                    <MenuItem onClick={() => { window.location.href = constants.ROOT_URL + "/files/" + id; }}>
                        Download
                    </MenuItem>
                );
            } else {
                downloadMenuItem = (
                    <MenuItem onClick={() => { window.location.href = constants.ROOT_URL + "/files/shared/" + id; }}>
                        Download
                    </MenuItem>
                );
            }
        }

        let authenticatedItems;
        if (!(this.props.shared === true)) {
            authenticatedItems = (
                <React.Fragment>
                    <MenuItem onClick={() => { window.jQuery(`#${deleteEntryModalId}`).modal("show") }} >
                        Delete
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem onClick={() => { window.jQuery(`#${editEntryModalId}`).modal("show") }}>
                        Edit Name
                    </MenuItem>
                    <MenuItem onClick={() => { window.jQuery(`#${shareEntryModalId}`).modal("show") }}>
                        Share
                    </MenuItem>
                </React.Fragment>
            );
        }

        const editEntryModalId = "editModal" + id;
        const deleteEntryModalId = "deleteModal" + id;
        const shareEntryModalId = "shareModal" + id;

        return (
            <React.Fragment>

                <div
                    draggable
                    key={id}
                    className={[containerClasses, "col-6 col-sm-4 col-md-3 col-lg-2"].join(" ")}
                    onClick={() => { this.props.toggleSelected(entry) }}
                    onDoubleClick={() => { this.props.doubleClick(entry) }}
                    onDragStart={this.props.dragStart ? this.props.dragStart(entry) : null}
                    onDragOver={(event) => { event.preventDefault() }}
                    onDrop={type === "folder" ? (this.props.entryDrop ? this.props.entryDrop(entry) : null) : null}
                >
                    <ContextMenuTrigger
                        id={id + "_menu"}
                        collect={entry}
                        holdToDisplay="-1"
                    >
                        {helper.getIconByMimeType(mimeType, name, type, "5rem")}
                        <div className={classes.FileSize}>
                            {helper.getFileSizeString(fileSize)}
                        </div>
                        <div className={classes.FileName} title={name}>{name}</div>
                    </ContextMenuTrigger>



                </div>

                <ContextMenu id={id + "_menu"}>
                    {downloadMenuItem}
                    {authenticatedItems}
                </ContextMenu>

                <DeleteEntryModal
                    ref={this.deleteModalRef}
                    modalId={deleteEntryModalId}
                    modalTitle={`Do you want to delete ${name}?`}
                    bodyText={name}
                    confirm={() => { this.props.delete(entry); }}
                />
                <EditEntryNameModal
                    modalId={editEntryModalId}
                    modalTitle={`Rename ${type}`}
                    bodyText={name}
                    save={(value) => { this.props.save(entry, value) }}
                    useAppend={type === "file" ? "true" : "false"}
                />
                <ShareEntryModal
                    modalId={shareEntryModalId}
                    entry={entry}
                    addShare={this.props.addShare}
                    removeShare={this.props.removeShare}
                    setPublicShare={this.props.setPublicShare}
                />


            </React.Fragment>
        );
    }
}

export default GridViewEntry;