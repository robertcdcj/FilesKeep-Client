import React, { Component } from "react";
class EditEntryModal extends Component {

    suffixText = null;

    inputRef = React.createRef();

    saveEdit = () => {
        this.props.save(this.getInputText());
        window.jQuery(`#${this.props.modalId}`).modal("hide");
    }

    getInputText = () => {
        if (this.suffixText !== null) {
            return this.inputRef.current.value + this.suffixText;
        } else {
            return this.inputRef.current.value;
        }
    }

    render() {
        const bodyText = this.props.bodyText;

        let itemText = bodyText;
        let inputAppend = null;


        if (this.props.useAppend === "true") {
            const suffixIndex = this.props.bodyText.lastIndexOf(".");
            if (suffixIndex != -1) {
                itemText = bodyText.substring(0, suffixIndex);
                this.suffixText = bodyText.substring(suffixIndex, bodyText.length);
            }
            if (this.suffixText !== null) {
                inputAppend = (
                    <div class="input-group-append">
                        <span class="input-group-text">{this.suffixText}</span>
                    </div>
                )
            }
        }

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

                        <form onSubmit={(e) => { e.preventDefault(); this.saveEdit(); }}>
                            <div class="modal-body">
                                <div class="input-group mb-3 d-flex">
                                    <input className="flex-grow-1" ref={this.inputRef} type="text" placeholder="New Name" defaultValue={itemText} />
                                    {inputAppend}
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-success" data-dismiss="modal" onClick={this.saveEdit}>Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default EditEntryModal;