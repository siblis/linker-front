import './Info.scss';

import React, {PureComponent} from 'react';

export default class Info extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            txtInfoMessageHeader: '',
            txtInfoMessage: ''
        };
    }
    
    componentDidMount() {
        const lang = (navigator.languages ? navigator.languages[0] : navigator.language) === 'ru' ? 'ru' : 'en';
        fetch(`/resources/locale/${lang}/info.json`)
            .then(response => response.json())
            .then(data => this.setState(data));
    }
    
    render() {
        return (
            <div>
                <div className="info-message-header">{this.state.txtInfoMessageHeader}</div>
                <div className="info-message">
                    <div>{this.state.txtInfoMessage}</div>
                </div>
            </div>
        );
    }
}
