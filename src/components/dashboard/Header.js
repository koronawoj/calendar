import React, {Component} from 'react';

class Header extends Component {
    render() {
        return (
            <div className="header-wrapper">
                <div className="costs">
                    <div>298 zł</div>
                    <div>per night</div>
                </div>
                <div className="star-range">
                    <div className="star-ratings">
                        <div className="star-ratings-top" style={{width: '50%'}}>
                            {Array.from(Array(5)).map((x, i) => <span key={i}>★</span>)}
                        </div>
                        <div className="star-ratings-bottom">
                            {Array.from(Array(5)).map((x, i) => <span key={i}>★</span>)}
                        </div>
                    </div>
                    <div>123</div>
                </div>
            </div>
        )
    }
}

export default Header