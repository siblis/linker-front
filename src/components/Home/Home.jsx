import './Home.scss';
import Logo from '../../images/logo.png';
import ArrowLeft from '../../images/arrow-left.png';
import enLocale from '../../locale/en/home.json';
import ruLocale from '../../locale/ru/home.json';

import React, {PureComponent} from 'react';
import classNames from 'classnames';
import canvasApp from './canvasApp';

export default class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            txtLogin: '',
            txtAbout: '',
            txtTitle: '',
            txtInfo: '',
            txtBack: '',
            txtInfoMessageHeader: '',
            txtInfoMessage: '',
            isClosed: true,
        };
    }
    
    toggleInfoMessageModal = () => {
        this.setState({isClosed: !this.state.isClosed})
    };
    
    resetPage = () => {
        if (!this.state.isClosed) {
            this.setState({isClosed: true})
        }
    };
    
    componentDidMount() {
        const lang = (navigator.languages ? navigator.languages[0] : navigator.language) === 'ru' ? 'ru' : 'en';
        switch (lang) {
            case 'ru': this.setState(ruLocale); break;
            default: this.setState(enLocale); break;
        }
        canvasApp(this.refs.canvas);
    }
    
    render() {
        const infoModalClass = classNames(
            'info-message-modal',
            {'info-message-modal hidden': this.state.isClosed,}
        );
        return (
            <div className="home" onClick={this.resetPage}>
                <div className="header">
                    <div className="logo"><img src={Logo}/></div>
                    <div className="log-in">{this.state.txtLogin}<div className="highlighting"/></div>
                </div>
                <div className="content">
                    <div className="sphere">
                        <canvas ref="canvas" width="368" height="368"/>
                    </div>
                    <div className="about">{this.state.txtAbout}</div>
                    <div className="title">{this.state.txtTitle}</div>
                    <div className={infoModalClass}>
                        <div className="info-message-header">{this.state.txtInfoMessageHeader}</div>
                        <div className="info-message"><p>{this.state.txtInfoMessage}</p></div>
                    </div>
                </div>
                <div className="footer">
                    <div className="info" onClick={this.toggleInfoMessageModal}>
                        {
                            this.state.isClosed ?
                                <span>{this.state.txtInfo}<div className="highlighting"/></span> :
                                <span><img src={ArrowLeft}/>{this.state.txtBack}</span>
                        }
                    </div>
                </div>
               
            </div>
        );
    }
}
