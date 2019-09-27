import React, { Component } from "react";
import classes from "./UploadableFileMenu.module.css";
import { Menu, Item, Separator, Submenu, MenuProvider, animation, IconFont } from 'react-contexify';
import * as constants from "../../../../../Constants";

class UploadableFileMenu extends Component {
    render() {
        let deleteItem = (
            <Item className={classes.delete} onClick={this.props.deleteFile}>
                <IconFont className="fas fas fa-trash-alt"></IconFont>
                <div>Delete</div>
            </Item>
        );
        
        return (
            <Menu id={this.props.id} animation={animation.zoom}>
                <Item href="#" className={classes.download} onClick={() => { window.open(constants.ROOT_URL + "/downloadFile/" + this.props.id) }}>
                    <IconFont className="fas fa-cloud-download-alt"></IconFont>
                    <div>Download</div>
                </Item>
                {!this.props.uploading ? deleteItem : null}
                <Separator />
                <Item onClick={() => { console.log(this.props.id + "Info") }}>Info</Item>
                <Item disabled>Dolor</Item>
                <Separator />
                <Submenu label="Foobar">
                    <Item onClick={() => { console.log(this.props.id + "Foo") }}>Foo</Item>
                    <Item onClick={() => { console.log(this.props.id + "Bar") }}>Bar</Item>
                </Submenu>
            </Menu>
        );
    }
}

export default UploadableFileMenu;