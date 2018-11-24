import './Cabinet.scss';

import React, {Component, Fragment} from 'react';
import Cookies from 'js-cookie';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import Logo from '../../images/logo.png';
import ArrowLeft from '../../images/arrow-left.png';
import Plus from '../../images/plus.png';
import config from '../../config';

export default class Cabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtMyCollections: '',
            txtProfile: '',
            txtCollectionLink: '',
            txtBack: '',
            user: Cookies.getJSON('user'),
            collections: [],
            isCollectionFormOpened: false,
            isProfileOpened: false,
            selectedCollection: '0'
        };
    }
    
    componentDidMount() {
        if (this.state.user === undefined) {
            this.props.history.push('/');
            return;
        }
        this.getCollections();
        const lang = (navigator.languages ? navigator.languages[0] : navigator.language) === 'ru' ? 'ru' : 'en';
        fetch(`/resources/locale/${lang}/cabinet.json`)
            .then(response => response.json())
            .then(data => this.setState(data));
    }
    
    getCollections = () => {
        fetch(`${config.api}/collections`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-User-Token': this.state.user.token,
                'X-User-Email': this.state.user.email
            }
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json()
        }).then((collections) => {
            this.setState({
                collections: collections
            })
        }).catch(() => {
            this.props.history.push('/');
        });
    };
    
    toggleProfileModal = () => {
        this.setState({isProfileOpened: !this.state.isProfileOpened})
    };
    
    openCollectionForm = (event) => {
        this.setState({
            selectedCollection: event.currentTarget.getAttribute('data-collection'),
            isCollectionFormOpened: true
        });
    };
    
    // closeCollectionForm = () => {
    //     this.setState({
    //         isCollectionFormOpened: false
    //     });
    //     this.getCollections();
    // };
    
    render() {
        const {collections, selectedCollection} = this.state;
        const collectionFormClass = classNames(
            'collection-form  hidden',
            {'collection-form': this.state.isCollectionFormOpened}
        );
        const profileModalClass = classNames(
            'profile-modal  hidden',
            {'profile-modal': this.state.isProfileOpened}
        );
        const selectedCollectionLink = selectedCollection !== '0' ? config.collectionBaseUrl + (Array.from(collections).find(collection => collection.id === parseInt(selectedCollection))).url : '#';
        if (this.state.user === undefined) {
            return null;
        } else {
            return (
                <div className="cabinet">
                    <div className="header">
                        <div className="logo"><Link to={'/'}><img src={Logo}/></Link></div>
                        <div className="profile-link" onClick={this.toggleProfileModal}>
                            {
                                this.state.isCollectionFormOpened ?
                                    <span>
                                        {
                                            selectedCollectionLink !== '#' ?
                                                <Link to={selectedCollectionLink}>{this.state.txtCollectionLink}</Link>
                                                : ''
                                        }
                                    </span> :
                                    this.state.isProfileOpened ?
                                        <span><img src={ArrowLeft}/>{this.state.txtBack}
                                            <div className="highlighting"/></span> :
                                        <span>{this.state.txtProfile}
                                            <div className="highlighting"/></span>
                            }
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-menu">
                            <span>{this.state.txtMyCollections}</span>
                            <div data-collection="0" onClick={this.openCollectionForm}>
                                <img src={Plus}/>
                            </div>
                        </div>
                        {
                            Array.from(collections).map((collection, idx) =>
                                <Fragment key={idx}>
                                    <div className="collection-block" data-collection={collection.id}
                                         onClick={this.openCollectionForm}>
                                        <div className="collection-name">
                                            {collection.name}
                                        </div>
                                        <div className="collection-comment">
                                            {collection.comment}
                                        </div>
                                        <div className="collection-links">
                                            {
                                                Array.from(collection.links).map((link, idx) =>
                                                    <Fragment key={idx}>
                                                        <div><img src={config.thumbs + link.url}/></div>
                                                    </Fragment>
                                                )
                                            }
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        }
                        <div className={collectionFormClass}>
                            {/*<CollectionForm collection={selectedCollection} onClose={this.closeCollectionForm}/>*/}
                        </div>
                        <div className={profileModalClass}>
                            {/*<Profile/>*/}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
