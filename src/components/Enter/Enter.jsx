import './Enter.scss';

import React, {PureComponent} from 'react';

export default class Enter extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            txtEnter: '',
            txtRegistration: '',
            txtUserName: '',
            txtEmail: '',
            txtPassword: '',
            txtButtonEnter: '',
            txtButtonRegistration: '',
            errorMessageEnter: '',
            errorMessageRegistration: ''
        };
    }
    
    componentDidMount() {
        const lang = (navigator.languages ? navigator.languages[0] : navigator.language) === 'ru' ? 'ru' : 'en';
        fetch(`/resources/locale/${lang}/enter.json`)
            .then(response => response.json())
            .then(data => this.setState(data));
    }
    
    render() {
        return (
            <div>
                <div className="enter-section">
                    <div className="title-block">
                        {this.state.txtEnter}
                    </div>
                    <div className="input-blocks">
                        <input type="text" placeholder={this.state.txtUserName}/>
                        <input type="password" placeholder={this.state.txtPassword}/>
                        <div className="error-message">{this.state.errorMessageEnter}</div>
                    </div>
                    <button>{this.state.txtButtonEnter}</button>
                </div>
                <div className="registration-section">
                    <div className="title-block">
                        {this.state.txtRegistration}
                    </div>
                    <div className="input-blocks">
                        <input type="text" placeholder={this.state.txtEmail}/>
                        <input type="text" placeholder={this.state.txtPassword}/>
                        <div className="error-message">{this.state.errorMessageRegistration}</div>
                    </div>
                    <button>{this.state.txtButtonRegistration}</button>
                </div>
            </div>
        );
    }
}
