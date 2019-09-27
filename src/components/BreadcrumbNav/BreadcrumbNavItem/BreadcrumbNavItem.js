import React, { Component } from "react";
import classes from "./BreadcrumbNavItem.module.css";

class BreadcrumbNavItem extends Component {


    render() {
        const folder = this.props.folder;
        const itemClasses = this.props.itemClasses;

        let buttonClasses = [
            "breadcrumb-item",
            classes.Button,
            this.props.isActive ? classes.Active : null
        ].join(" ");


        return (
            <li
                onDragOver={(event) => { event.preventDefault() }}
                onDrop={this.props.dropped}
                className={itemClasses}
                aria-current="page"
            >
                <button
                    className={buttonClasses}
                    onClick={this.props.isActive ? null : this.props.clicked}>
                    {folder.name}
                </button>
            </li>);
    }
}

export default BreadcrumbNavItem;