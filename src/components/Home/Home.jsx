import './Home.scss';
import Logo from '../../images/logo.png';
import ArrowLeft from '../../images/arrow-left.png';

import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import canvasApp from './canvasApp';
import Enter from '../Enter/Enter';
import Info from '../Info/Info';

export default class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            txtLogin: '',
            txtAbout: '',
            txtTitle: '',
            txtInfo: '',
            txtBack: '',
            txtDemo: '',
            isInfoClosed: true,
            isEnterClosed: true,
        };
    }
    
    toggleInfoMessageModal = () => {
        this.resetPage();
        this.setState({isInfoClosed: !this.state.isInfoClosed})
    };
    
    toggleEnterModal = () => {
        this.resetPage();
        this.setState({isEnterClosed: !this.state.isEnterClosed})
    };
    
    resetPage = () => {
        if (!this.state.isInfoClosed) {
            this.setState({isInfoClosed: true})
        }
        if (!this.state.isEnterClosed) {
            this.setState({isEnterClosed: true})
        }
    };
    
    componentDidMount() {
        const lang = (navigator.languages ? navigator.languages[0] : navigator.language) === 'ru' ? 'ru' : 'en';
        fetch(`/resources/locale/${lang}/home.json`)
            .then(response => response.json())
            .then(data => this.setState(data));
        canvasApp(this.refs.canvas);
    }
    
    render() {
        const infoModalClass = classNames(
            'info-message-modal',
            {'info-message-modal hidden': this.state.isInfoClosed,}
        );
        const enterModalClass = classNames(
            'enter-modal',
            {'enter-modal hidden': this.state.isEnterClosed,}
        );
        return (
            <div className="home">
                <div className="header">
                    <div className="logo"><Link to={'/'}><img src={Logo} alt="logo"/></Link></div>
                    <div className="log-in" onClick={this.toggleEnterModal}>
                        {
                            this.state.isEnterClosed ?
                                <span>{this.state.txtLogin}
                                    <div className="highlighting"/></span> :
                                <span>
                                    <img src={ArrowLeft} alt="back"/>{this.state.txtBack}
                                    <div className="highlighting"/></span>
                        }
                    </div>
                </div>
                <div className="content">
                    <div className="sphere">
                        <canvas ref="canvas" width="368" height="368"/>
                    </div>
                    <div className="text-block">
                        <div className="about">{this.state.txtAbout}</div>
                        <div className="title">{this.state.txtTitle}</div>
                    </div>
                    <div className={infoModalClass}>
                       <Info/>
                    </div>
                    <div className={enterModalClass}>
                        <Enter/>
                    </div>
                </div>
                <div className="footer">
                    <div className="info" onClick={this.toggleInfoMessageModal}>
                        {
                            this.state.isInfoClosed ?
                                <span>{this.state.txtInfo}
                                    <div className="highlighting"/></span> :
                                <span>
                                    <img src={ArrowLeft} alt="back"/>{this.state.txtBack}
                                    <div className="highlighting"/></span>
                        }
                    </div>
                    <div className="demo-collection">
                        <Link to="/collection">{this.state.txtDemo}<div className="highlighting"/></Link>
                    </div>
                </div>
            </div>
        );
    }
}
