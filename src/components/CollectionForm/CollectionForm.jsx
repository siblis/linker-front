import './CollectionForm.scss';

import React, {PureComponent, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import config from '../../config';
import Plus from '../../images/plus.png';
import Delete from '../../images/delete.png';

class CollectionForm extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        onClose: PropTypes.func.isRequired,
    };
    
    constructor(props) {
        super(props);
        this.state = {
            user: Cookies.getJSON('user'),
            collection: {name: '', comment: '', url: '', links: [{name: '', url: '', comment: ''}]},
            txtCollectionName: '',
            txtDescription: '',
            txtLinkName: '',
            txtLinkUrl: '',
            txtSaveCollection: '',
            txtDeleteCollection: '',
            txtNewCollection: '',
            txtSystemError: '',
            errorMessage: ''
        };
    }
    
    componentDidMount() {
        if (this.state.user === undefined) {
            this.props.history.push('/');
            return;
        }
        this.readCollection();
        const lang = (navigator.languages ? navigator.languages[0] : navigator.language) === 'ru' ? 'ru' : 'en';
        fetch(`/resources/locale/${lang}/collection-form.json`)
            .then(response => response.json())
            .then(data => this.setState(data));
    }
    
    setErrorMessage = (error) => {
        this.setState({
            errorMessage: error
        });
    };
    
    createCollection = () => {
        this.setErrorMessage('');
        fetch(`${config.api}/collections`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-User-Token': this.state.user.token,
                'X-User-Email': this.state.user.email
            },
            body: JSON.stringify(this.state.collection)
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json()
        }).then((collection) => {
            this.setState({
                collection: collection
            })
        }).catch(() => {
            this.setErrorMessage(this.state.txtSystemError);
        });
    };
    
    readCollection = () => {
        this.setErrorMessage('');
        if (this.props.id === '0') {
            return;
        }
        fetch(`${config.api}/collections/${this.props.id}`, {
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
        }).then((collection) => {
            this.setState({
                collection: collection
            })
        }).catch(() => {
            this.setErrorMessage(this.state.txtSystemError);
        });
    };
    
    
    updateCollection = () => {
        this.setErrorMessage('');
        fetch(`${config.api}/collections/${this.props.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-User-Token': this.state.user.token,
                'X-User-Email': this.state.user.email
            },
            body: JSON.stringify(this.state.collection)
        }).then((response) => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json()
        }).then((collection) => {
            this.setState({
                collection: collection
            })
        }).catch(() => {
            this.setErrorMessage(this.state.txtSystemError);
        });
    };
    
    deleteCollection = () => {
        fetch(`${config.api}/collections/${this.props.id}`, {
            method: 'DELETE',
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
            this.props.onClose();
        }).catch(() => {
            this.setErrorMessage(this.state.txtSystemError);
        });
    };
    
    handleInputChange = (event) => {
        const parameter = event.target.name;
        const value = event.target.value;
        const collection = {...this.state.collection};
        switch (parameter) {
            case 'collection.name':
                collection.name = value;
                break;
            case 'collection.comment':
                collection.comment = value;
                break;
        }
        const link = parameter.split('-');
        switch (link[0]) {
            case 'link.name':
                collection.links[link[1]].name = value;
                break;
            case 'link.url':
                collection.links[link[1]].url = value;
                break;
            case 'link.comment':
                collection.links[link[1]].comment = value;
                break
        }
        this.setState({
            collection: collection
        });
    };
    
    onAddLink = () => {
        const collection = {...this.state.collection};
        collection.links.unshift({name: '', url: '', comment: ''});
        this.setState({
            collection: collection
        });
    };
    
    onDeleteLink = (event) => {
        const id = event.currentTarget.getAttribute('data-link');
        const collection = {...this.state.collection};
        collection.links.splice(id, 1);
        this.setState({
            collection: collection
        });
    };
    
    onSaveCollection = () => {
        if (this.props.id === '0') {
            this.createCollection();
        } else {
            this.updateCollection();
        }
    };
    
    onDeleteCollection = () => {
        if (this.props.id !== '0') {
            this.deleteCollection();
        } else {
            this.props.onClose();
        }
    };
    
    render() {
        const {collection, errorMessage} = this.state;
        return (
            <Fragment>
                {
                    errorMessage !== '' ?
                        <div className="collection-error-message">
                            {this.state.errorMessage}
                        </div> : ''
                }
                <div className="collection-url">
                    {
                        collection.url !== '' ?
                            config.collectionBaseUrl + collection.url :
                            this.state.txtNewCollection
                    }
                </div>
                <div className="collection-head">
                    <input name="collection.name"
                           type="text"
                           value={collection.name}
                           onChange={this.handleInputChange}
                           placeholder={this.state.txtCollectionName}/>
                    <textarea name="collection.comment"
                              value={collection.comment}
                              onChange={this.handleInputChange}
                              placeholder={this.state.txtDescription}/>
                </div>
                {
                    Array.from(collection.links).map((link, idx) =>
                        <div className="collection-link" key={idx}>
                            <input name={'link.name-' + idx}
                                   type="text"
                                   value={collection.links[idx].name}
                                   onChange={this.handleInputChange}
                                   placeholder={this.state.txtLinkName}/>
                            <input name={'link.url-' + idx}
                                   type="text"
                                   value={collection.links[idx].url}
                                   onChange={this.handleInputChange}
                                   placeholder={this.state.txtLinkUrl}/>
                            <textarea name={'link.comment-' + idx}
                                      value={collection.links[idx].comment}
                                      onChange={this.handleInputChange}
                                      placeholder={this.state.txtDescription}/>
                            <div className="collection-delete-link" data-link={idx} onClick={this.onDeleteLink}>
                                <img src={Delete} alt="Delete link"/>
                            </div>
                        </div>
                    )
                }
                <div className="collection-control">
                    <button onClick={this.onDeleteCollection}>{this.state.txtDeleteCollection}</button>
                    <button onClick={this.onSaveCollection}>{this.state.txtSaveCollection}</button>
                    <div onClick={this.onAddLink}><img src={Plus} alt="Add link"/></div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(CollectionForm);
