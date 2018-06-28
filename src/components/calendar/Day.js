import React from "react";

export default class Day extends React.Component {
    render() {
        const {
            day,
            day: {
                date,
                isCurrentMonth,
                number
            },
            select,
            selected
        } = this.props;


        return (
            <span
                key={date.toString()}
                className={isCurrentMonth ? "day" + (date.isSame(selected) ? " selected" : "") : "different-month"}
                onClick={isCurrentMonth ? () => select(day) : null}>
                {isCurrentMonth ? number : ''}
                </span>
        );
    }
}