import React, { Component } from "react";
class AddFolderModal extends Component {

    suffixText = null;

    inputRef = React.createRef();

    componentDidMount() {
        window.jQuery(`#addFolderModal`).on("hidden.bs.modal", (e) => {
            this.clearText();
        });
    }

    createFolder = () => {
        this.props.createFolder(this.getInputText());
        window.jQuery(`#addFolderModal`).modal("hide");
    };

    clearText = () => {
        this.inputRef.current.value = "";
    }

    getInputText = () => {
        return this.inputRef.current.value;
    }

    render() {
        return (
            <div class="modal fade" id={this.props.modalId} tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title">{this.props.modalTitle}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); this.createFolder(); }}>
                            <div class="modal-body">
                                <div class="input-group mb-3 d-flex">
                                    <input className="flex-grow-1" ref={this.inputRef} type="text" placeholder="Folder Name" defaultValue="" />
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success" data-dismiss="modal" onClick={this.createFolder}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddFolderModal;