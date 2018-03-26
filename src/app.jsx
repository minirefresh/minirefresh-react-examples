import React, {
    Component,
} from 'react';
import {
    Link,
} from 'react-router-dom';

export default class App extends Component {
    render() {
        return (
            <header>
                <nav>
                    <h2>This is a roster page!</h2>
                    <ul>
                        <li><a><Link to="/">Home</Link></a></li>
                        <li><a><Link to="/tab1">Tab1</Link></a></li>
                        <li><a><Link to="/tab2">Tab2</Link></a></li>
                        <li><a><Link to="/list">list</Link></a></li>
                    </ul>
                </nav>
                
            </header>
        );
    }
}