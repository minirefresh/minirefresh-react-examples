import React, {
    Component,
} from 'react';
import {
    Router,
    Route,
    Switch,
} from 'react-router-dom';

import App from './app';
import history from './components/history';
import Tab1 from './pages/tab1';
import Tab2 from './pages/tab2';
import List from './pages/list';

export default class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    {
                        /**
                         * 这里可以公共的样式,比如 头部, 尾部, 等.
                         */
                    }
                    <h2>This is a roster page!</h2>
                    <Switch>
                        <Route path="/tab1" component={Tab1} />
                        <Route exact path="/" component={Tab1} />
                        <Route path="/tab2" component={Tab2} />
                        <Route path="/list" component={List} />
                    </Switch>
                    <App />
                </div>
            </Router>
        );
    }
}