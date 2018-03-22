import React from 'react';
import {
    render,
} from 'react-dom';
import {
    Provider,
} from 'react-redux';

import Routers from './routers';
import store from './stores';

import './style/libs/mui/mui.css';

render(
    <Provider store={store} >
        <Routers />
    </Provider>,
    document.getElementById('content'),
);