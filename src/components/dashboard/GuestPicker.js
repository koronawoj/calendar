import React, {Component} from 'react';
import ControlsCounter from './ControlsCounter'

class GuestPicker extends Component {
    state = {
        guests: {
            adults: 1,
            children: 0,
            infants: 0
        }
    }

    renderGuestOptionList = () => {
        let list = [
            {
                name: 'Adults',
                description: '',
                type: 'adults'
            },
            {
                name: 'Children',
                description: 'Ages 2-12',
                type: 'children'
            },
            {
                name: 'Infants',
                description: 'Under 2',
                type: 'infants'
            }
        ];

        return list.map(elem => (
            <div key={elem.type} className="menu-row">
                <div className="menu-person">
                    <div>{elem.name}</div>
                    <div>{elem.description}</div>
                </div>
                <ControlsCounter
                    countGuests={this.countGuests}
                    type={elem.type}
                >
                    {this.state.guests[elem.type]}
                </ControlsCounter>
            </div>
        ))
    }

    countGuests = (type, val) => {
        if (
            (this.state.guests.adults + this.state.guests.children < 2 ||
                type === 'infants' ||
                val === -1) &&
            this.state.guests[type] + val >= 0
        ) {
            this.setState({
                guests: {
                    ...this.state.guests,
                    [type]: this.state.guests[type] + val
                }
            })
        }
    }

    render() {
        let {adults, children, infants} = this.state.guests;

        return (
            <div className="guest-picker-wrapper">
                <div className="label">Guests</div>
                <div className="input-wrapper">
                    <div className="dropdown-toggle"
                         onClick={() => this.props.onDropdown(!this.props.dropdown)}>
                        <div>{adults + children + infants} guest</div>
                        <div className={this.props.dropdown ? 'arrow up' : 'arrow'}/>
                    </div>
                    <div className={this.props.dropdown ? "dropdown-menu-show" : "dropdown-menu-hide"}>
                        {this.renderGuestOptionList()}
                        <div className="footer-info">
                                <span style={adults + children === 2 ? {color: '#ff0000'} : null}>
                                    2 guests maximum.
                                </span>
                            Infants don't count toward the number of guests
                        </div>
                        <div className="btn">
                            <div onClick={() => this.props.onDropdown(!this.props.dropdown)}>Close</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default GuestPicker