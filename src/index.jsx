import './css/main.css';

import React, {PureComponent} from 'react';
import ReactDom from 'react-dom';

import Home from 'components/Home';

class App extends PureComponent {
    render() {
        return (
            <div className="container">
                <Home/>
            </div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('root'));
