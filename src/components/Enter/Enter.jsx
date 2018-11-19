import './Enter.scss';

import React, {Component} from 'react';

export default class Enter extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            txtEnter: '',
            txtRegistration: '',
            txtUserName: '',
            txtEmail: '',
            txtPassword: '',
            txtRepeatPassword: '',
            txtNoMatchPassword: '',
            txtButtonEnter: '',
            txtButtonRegistration: '',
            txtInvalidEmail: '',
            txtEmptyUserName: '',
            txtEmptyPassword: '',
            errorMessageEnter: '',
            errorMessageRegistration: '',
            enterUserName: '',
            enterPassword: '',
            regEmail: '',
            regPassword: '',
            regRepeatPassword: ''
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
                this.authorization(this.state.enterUserName, this.state.enterPassword);
                break;
            case 'registration':
                this.registration(this.state.regEmail, this.state.regPassword, this.state.regRepeatPassword);
                break;
        }
    };
    
    validateAuthParams = (userName, password) => {
        if (!userName.trim().length) {
            return this.state.txtEmptyUserName;
        }
        if (!password.trim().length) {
            return this.state.txtEmptyPassword;
        }
        return '';
    };
    
    validateRegParams = (email, password, repeatPassword) => {
        if (!/([a-zA-Z0-9-_\\.]+)(@)([a-zA-Z0-9-_\\.]+)\.([a-z]{2,})/.test(email)) {
            return this.state.txtInvalidEmail;
        }
        if (!password.trim().length || !repeatPassword.trim().length) {
            return this.state.txtEmptyPassword;
        }
        if (password !== repeatPassword) {
            console.log('Ok');
            return this.state.txtNoMatchPassword;
        }
        return '';
    };
    
    authorization = (userName, password) => {
        const errors = this.validateAuthParams(userName, password);
        if (errors === '') {
            // Запрос авторизации
        } else {
            this.setState({
                errorMessageEnter: errors
            });
        }
    };
    
    registration = (email, password, repeatPassword) => {
        const errors = this.validateRegParams(email, password, repeatPassword);
        if (errors === '') {
            // Запрос регистрации
        } else {
            this.setState({
                errorMessageRegistration: errors
            });
        }
    };
    
    render() {
        const {enterUserName, enterPassword, regEmail, regPassword, regRepeatPassword} = this.state;
        return (
            <div>
                <div className="enter-section">
                    <div className="title-block">
                        {this.state.txtEnter}
                    </div>
                    <div className="input-blocks">
                        <input name="enterUserName"
                               type="text"
                               value={enterUserName}
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
                        <input name="regEmail"
                               type="text"
                               value={regEmail}
                               onChange={this.handleInputChange}
                               placeholder={this.state.txtEmail}/>
                        <input name="regPassword"
                               type="text"
                               value={regPassword}
                               onChange={this.handleInputChange}
                               placeholder={this.state.txtPassword}/>
                        <input name="regRepeatPassword"
                               type="text"
                               value={regRepeatPassword}
                               onChange={this.handleInputChange}
                               placeholder={this.state.txtRepeatPassword}/>
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
