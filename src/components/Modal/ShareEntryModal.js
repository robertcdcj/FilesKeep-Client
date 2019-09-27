import React, { Component } from "react";

import classes from "./ShareEntryModal.module.css";

import * as constants from "../../Constants";

class ShareEntryModal extends Component {

    newShareEmailRef = React.createRef();
    publicShareTextboxRef = React.createRef();

    componentDidMount() {
        window.jQuery(`#${this.props.modalId}`).on("hidden.bs.modal", (e) => {
            this.clearText();
        });
    }

    clearText = () => {
        this.newShareEmailRef.current.value = "";
    }

    copyPublicShareTextboxValue = () => {
       this.publicShareTextboxRef.current.select();
        document.execCommand("copy");
    }

    setPublicShare = (newValue) => {
        this.props.setPublicShare(this.props.entry._id, this.props.entry.type, newValue);
    }

    addSharePerson = () => {
        this.props.addShare(this.props.entry._id, this.props.entry.type, this.newShareEmailRef.current.value);
        this.newShareEmailRef.current.value = "";
    }

    removeSharePerson = (email) => {
        this.props.removeShare(this.props.entry._id, this.props.entry.type, email);
    }

    render() {
        let shareURL;
        if (this.props.entry.type === "folder") {
            shareURL = `${constants.APP_ROOT_URL}/sharedFiles/${this.props.entry._id}`;
        } else if (this.props.entry.type === "file") {
            shareURL = `${constants.ROOT_URL}/files/shared/${this.props.entry._id}`;
        }

        let turnOnPublicShareButtonClasses = "btn btn-outline-success";
        let turnOffPublicShareButtonClasses = "btn btn-outline-danger";
        let publicShareLink;
        if (this.props.entry.publicShare === true) {
            turnOnPublicShareButtonClasses = "btn btn-success";
            publicShareLink = (
                <div class="input-group mb-3">
                    <input ref={this.publicShareTextboxRef} type="text" class="form-control" value={shareURL} aria-label="Recipient's username" aria-describedby="basic-addon2" />
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" onClick={this.copyPublicShareTextboxValue}>Copy</button>
                    </div>
                </div>
            );
        } else {
            turnOffPublicShareButtonClasses = "btn btn-danger";
        }

        let sharedWith;
        if (this.props.entry.privateShare && this.props.entry.privateShare.length > 0) {
            sharedWith = this.props.entry.privateShare.map((email, index) => {
                return (
                    <div key={index}>                        
                        <span><i class="fas fa-user"></i> {email}</span>
                        <button className="ml-3" onClick={() => { this.removeSharePerson(email) }}><i class="fas fa-minus-circle"></i> Delete</button>
                    </div>
                );
            });
        }

        return (
            <div class="modal fade" id={this.props.modalId} tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title">Share {this.props.entry.name}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body">
                            <div class="input-group mb-3 d-flex">
                                <div class="input-group-prepend flex-grow-1">
                                    <label class="input-group-text flex-grow-1">Share Publicly</label>
                                </div>
                                <div class="input-group-append">
                                    <button
                                        class={turnOffPublicShareButtonClasses}
                                        type="button"
                                        onClick={() => { this.setPublicShare(false); }}>Off</button>
                                    <button
                                        class={turnOnPublicShareButtonClasses}
                                        type="button"
                                        onClick={() => { this.setPublicShare(true); }}>On</button>
                                </div>
                            </div>
                            {publicShareLink}

                            <hr />

                            <p className="text-left">Share With:</p>

                            <form class="input-group mb-3" onSubmit={(e) => {e.preventDefault();this.addSharePerson();}}>
                                <input ref={this.newShareEmailRef} type="text" class="form-control" placeholder="Enter email address" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <div class="input-group-append">
                                    <button class="btn btn-success" type="button" onClick={this.addSharePerson}>Add</button>
                                </div>
                            </form>

                            {sharedWith}
                            <div>

                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShareEntryModal;