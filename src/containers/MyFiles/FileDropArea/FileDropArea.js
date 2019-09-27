import React, { Component } from "react";
import classes from "./FileDropArea.module.css";

class FileDropArea extends Component {
    state = {
        dragging: false
    }

    dropAreaRef = React.createRef();
    dragDepthCounter = 0;

    changeDefaultEventBehaviour = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    onDragHandler = (e) => {
        if (!e.dataTransfer.types.includes("isentry")) {
            this.changeDefaultEventBehaviour(e);
        }
    }

    onDragInHandler = (e) => {

        if (!e.dataTransfer.types.includes("isentry")) {
            this.changeDefaultEventBehaviour(e);
            this.dragDepthCounter++;
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                this.setState({ dragging: true });
            }
        }

    }

    onDragOutHandler = (e) => {

        if (!e.dataTransfer.types.includes("isentry")) {
            this.changeDefaultEventBehaviour(e);
            this.dragDepthCounter--;
            if (this.dragDepthCounter === 0) {
                this.setState({ dragging: false });
            }
        }

    }

    onDropHandler = (e) => {

        if (!e.dataTransfer.types.includes("isentry")) {
            this.changeDefaultEventBehaviour(e);

            this.dragDepthCounter = 0;
            this.setState({ dragging: false });
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                // this.props.handleDrop(e.dataTransfer.files);
                this.props.handleDrop(e);
                e.dataTransfer.clearData();
            }
        }

    }

    componentDidMount() {
        this.dragDepthCounter = 0;
        let div = this.dropAreaRef.current;
        div.addEventListener('dragenter', this.onDragInHandler);
        div.addEventListener('dragleave', this.onDragOutHandler);
        div.addEventListener('dragover', this.onDragHandler);
        div.addEventListener('drop', this.onDropHandler);
    }
    componentWillUnmount() {
        let div = this.dropAreaRef.current;
        div.removeEventListener('dragenter', this.onDragInHandler);
        div.removeEventListener('dragleave', this.onDragOutHandler);
        div.removeEventListener('dragover', this.onDragHandler);
        div.removeEventListener('drop', this.onDropHandler);
    }

    render() {
        return (
            <div className={"container"} id={classes.dropAreaContainer}
                ref={this.dropAreaRef}>
                {this.state.dragging ?
                    <div id={classes.dropAreaBorder}>
                        <div id={classes.dropAreaOverlay}>
                            <div>Drag and drop files here</div>
                        </div>
                    </div> :
                    null
                }
                {this.props.children}
            </div>
        );
    }
}

export default FileDropArea;
