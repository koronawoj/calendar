import React from 'react';
import moment from 'moment';
import Week from './Week'

class Calendar extends React.Component {
    state = {
        month: {
            from: moment(),
            to: moment().add(7, 'days'),
        },
        selected: {
            from: moment().startOf('day'),
            to: moment().add(7, 'days').startOf('day'),
        },
        direction: null,
        today: '',
        nextWeek: '',
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (e) => {
        if (!this.node.contains(e.target)) {
            this.setState({direction: null});
        }
    };

    changeMonth = (type) => {
        let {month, direction} = this.state;
        this.setState({
            month: {
                ...month,
                [direction]: month[direction][type](1, 'month'),
            }
        });
    }

    select = (day, direction) => {
        let {selected, month} = this.state;
        if(day.date.format('YYYYMMDD') < selected.from.format('YYYYMMDD')) {
            direction = 'from'
        }
        if(selected.to.format('YYYYMMDD') < day.date.format('YYYYMMDD')) {
            direction = 'to'
        }

        this.setState({
            direction,
            selected: {...selected, [direction]: day.date},
            month: {...month, [direction]: day.date.clone()},
        });
    }

    renderWeeks = () => {
        const {selected, month, direction} = this.state;

        let weeks = [];
        let done = false;
        let date = month[direction].clone().startOf("month").add("w" - 1).day("Sunday");
        let count = 0;
        let monthIndex = date.month();

        while (!done) {
            weeks.push(
                <Week key={date}
                      date={date.clone()}
                      month={month[direction]}
                      select={(day) => this.select(day, direction)}
                      range={this.state.selected}/>
            );
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }
        return weeks;
    };

    renderMonthLabel = () => {
        const {month, direction} = this.state;
        return <span className="month-label">{month[direction].format("MMMM YYYY")}</span>;
    }

    renderDayNames = () => {
        let daysList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        return (
            <div className="row day-names">
                {daysList.map(elem => <span key={elem} className="day">{elem}</span>)}
            </div>
        );
    }

    changeDirection = (direction) => {
        const {month, selected} = this.state;
        this.setState({
            direction,
            month: {...month, [direction]: selected[direction].clone()},

        })
    }

    renderDataInput = (direction) => (
        <div className="input-wrapper">
            <input
                onClick={() => this.changeDirection(direction)}
                type="text"
                value={this.state.selected[direction].format("DD/MM/YY")}
                readOnly
            />
        </div>
    )

    render() {
        return (
            <div className="data-picker-container" ref={node => this.node = node}>
                <div className="data-picker-wrapper">
                    <div className="label">Dates</div>
                    <div className="data-picker">
                        {this.renderDataInput('from')}
                        <div className="arrow">
                            <div/>
                        </div>
                        {this.renderDataInput('to')}
                    </div>
                </div>
                {this.state.direction !== null ? (
                    <div className="calendar-wrapper">
                        <div className="pointer" style={{left: this.state.direction === 'from' ? '30px' : '265px'}}>
                            <div className="pointer-empty"/>
                        </div>
                        <section className="calendar">
                            <header className="header">
                                <div className="month-display row">
                                    <div className="arrow arrow-left" onClick={() => this.changeMonth('subtract')}/>
                                    {this.renderMonthLabel()}
                                    <div className="arrow arrow-right" onClick={() => this.changeMonth('add')}/>
                                </div>
                                {this.renderDayNames()}
                            </header>
                            <div className="weeks-container">
                                {this.renderWeeks()}
                            </div>
                        </section>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Calendar;