import React, { Component } from "react";
class ConfirmModal extends Component {
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

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.props.confirm}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ConfirmModal;