import React, { Component } from "react";
import GridViewEntry from "../../Entry/GridViewEntry/GridViewEntry";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class GridViewEntryList extends Component {
    render() {
        const entryList = this.props.entries;
        return (
            <React.Fragment>
                {
                    entryList.map((entry) => {
                        return (
                            <GridViewEntry
                                entry={entry}
                                dragStart={this.props.dragStart}
                                entryDrop={this.props.entryDrop}
                                doubleClick={this.props.doubleClick}
                                delete={this.props.delete}
                                toggleSelected={this.props.toggleSelected}
                                save={this.props.save}
                                addShare={this.props.addShare}
                                removeShare={this.props.removeShare}
                                setPublicShare={this.props.setPublicShare}
                                shared={this.props.shared} />
                        )
                    })
                }
            </React.Fragment>
        );
    }
}

export default GridViewEntryList;