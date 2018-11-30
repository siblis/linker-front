import './Collection.scss';

import React, {PureComponent, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../images/logo.png';
import config from '../../config';

export default class Collection extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {name: '', comment: '', links: []}
        };
    }
    
    componentDidMount() {
        const {match} = this.props;
        const hash = match.params.hash;
        if (hash === undefined) {
            fetch('/resources/data/demo-collection.json')
                .then(response => response.json())
                .then(demoData => this.setState({
                    data: demoData
                }));
        } else {
            // Запрос коллекции
            fetch(`${config.api}/collection/${hash}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.statusText);
                }
                return response.json();
            }).then((data) => this.setState({
                data: data
            })).catch(() => {
                this.props.history.push('/');
            });
        }
        
    }
    
    render() {
        const {data} = this.state;
        return (
            <Fragment>
                <div className="header">
                    <div className="logo"><Link to={'/'}><img src={Logo} alt="logo"/></Link></div>
                </div>
                <div className="collection">
                    <div className="collection-header">
                        <h1>{data.name}</h1>
                        <p>{data.comment}</p>
                    </div>
                    {
                        Array.from(data.links).map((link, idx) =>
                            <Fragment key={idx}>
                                <div className="url-content">
                                    <h2>{link.name}</h2>
                                    <a href={link.url} target="_blank">{link.url}</a>
                                    <p>{link.comment}</p>
                                    <img src={config.thumbs + link.url} alt="thumb"/>
                                </div>
                            </Fragment>
                        )
                    }
                </div>
            </Fragment>
        );
    }
}
