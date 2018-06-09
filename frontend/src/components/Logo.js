import React from 'react';

export default class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div id="logo">
                <div id="meet">
                    <b>MEET</b>
                </div>
                <div id="my">my</div>
                <div id="type">
                    <b>TYPE</b>
                </div>
            </div>

        )
    }
}