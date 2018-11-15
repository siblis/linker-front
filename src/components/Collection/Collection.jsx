import './Collection.scss';
import data from './demo_data.json';

import React, {PureComponent, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../images/logo.png';

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
        this.setState({
            data: data
        })
    }
    
    render() {
        const {data} = this.state;
        return (
            <Fragment>
                <div className="header">
                    <div className="logo"><Link to={'/'}><img src={Logo}/></Link></div>
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
                                    <img src={'https://api.letsvalidate.com/v1/thumbs?size=og&url=' + link.url}/>
                                </div>
                            </Fragment>
                        )
                    }
                </div>
            </Fragment>
        );
    }
}
