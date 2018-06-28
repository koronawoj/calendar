import React from "react";

export default class ControlsCounter extends React.Component {
    render() {
        return (
            <div className="menu-buttons">
                <div onClick={() => this.props.countGuests(this.props.type, -1)}>-</div>
                <div>{this.props.children}</div>
                <div onClick={() => this.props.countGuests(this.props.type, 1)}>+</div>
            </div>
        )
    }
}