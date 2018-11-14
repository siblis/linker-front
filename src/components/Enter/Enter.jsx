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
            txtInvalidEmail: '',
            txtEmptyPassword: '',
            errorMessageEnter: '',
            errorMessageRegistration: '',
            enterEmail: '',
            enterPassword: '',
            registrationEmail: '',
            registrationPassword: ''
        };
    }
    
    componentDidMount() {
        const lang = (navigator.languages ? navigator.languages[0] : navigator.language) === 'ru' ? 'ru' : 'en';
        fetch(`/resources/locale/${lang}/enter.json`)
            .then(response => response.json())
            .then(data => this.setState(data));
    }
    
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    
    handleButtonClick = (event) => {
        switch (event.target.name) {
            case 'enter':
                this.authorization(this.state.enterEmail, this.state.enterPassword);
                break;
            case 'registration':
                this.registration(this.state.registrationEmail, this.state.registrationPassword);
                break;
        }
    };
    
    validateEmailPassword = (email, password) => {
        if (!/([a-zA-Z0-9-_\\.]+)(@)([a-zA-Z0-9-_\\.]+)\.([a-z]{2,})/.test(email)) {
            return this.state.txtInvalidEmail;
        }
        if (!password.trim().length) {
            return this.state.txtEmptyPassword;
        }
        return '';
    };
    
    authorization = (email, password) => {
        const errors = this.validateEmailPassword(email,password);
        if (errors === '') {
            // Запрос авторизации
        } else {
            this.setState({
                errorMessageEnter: errors
            });
        }
    };
    
    registration = (email, password) => {
        const errors = this.validateEmailPassword(email,password);
        if (errors === '') {
            // Запрос регистрации
        } else {
            this.setState({
                errorMessageRegistration: errors
            });
        }
    };
    
    render() {
        const {enterEmail, enterPassword, registrationEmail, registrationPassword} = this.state;
        return (
            <div>
                <div className="enter-section">
                    <div className="title-block">
                        {this.state.txtEnter}
                    </div>
                    <div className="input-blocks">
                        <input name="enterEmail"
                               type="text"
                               value={enterEmail}
                               onChange={this.handleInputChange}
                               placeholder={this.state.txtUserName}/>
                        <input name="enterPassword"
                               type="password"
                               value={enterPassword}
                               onChange={this.handleInputChange}
                               placeholder={this.state.txtPassword}/>
                        <div className="error-message">{this.state.errorMessageEnter}</div>
                    </div>
                    <button name="enter" onClick={this.handleButtonClick}>
                        {this.state.txtButtonEnter}
                    </button>
                </div>
                <div className="registration-section">
                    <div className="title-block">
                        {this.state.txtRegistration}
                    </div>
                    <div className="input-blocks">
                        <input name="registrationEmail"
                               type="text"
                               value={registrationEmail}
                               onChange={this.handleInputChange}
                               placeholder={this.state.txtEmail}/>
                        <input name="registrationPassword"
                               type="text"
                               value={registrationPassword}
                               onChange={this.handleInputChange}
                               placeholder={this.state.txtPassword}/>
                        <div className="error-message">{this.state.errorMessageRegistration}</div>
                    </div>
                    <button name="registration" onClick={this.handleButtonClick}>
                        {this.state.txtButtonRegistration}
                    </button>
                </div>
            </div>
        );
    }
}
