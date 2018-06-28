import React from "react";
import Calendar from '../calendar/Calendar';
import Header from "./Header";
import GuestPicker from "./GuestPicker";

export default class Dashboard extends React.Component {
    state = {
        dropdown: false,
        guests: {
            adults: 1,
            children: 0,
            infants: 0
        }
    }

    handleOnDropdown = (dropdown) => {
        this.setState({
            dropdown
        })
    }

    render() {
        return (
            <div className="dashboard-container">
                <Header/>
                <hr/>
                <Calendar/>
                <GuestPicker dropdown={this.state.dropdown} onDropdown={this.handleOnDropdown}/>
                <div className="button-wrapper">
                    <div>Request to Book</div>
                </div>
                <div className="card-footer-info">
                    You won't be charged yet
                </div>
                <hr/>
                <div className="card-footer">
                    <div className="text">
                        <div>This home in on people's minds.</div>
                        <div>It's been viewed 318 times in the past week.</div>
                    </div>
                    <div className="ico"/>
                </div>
            </div>
        );
    }
}