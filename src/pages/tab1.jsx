import React, {
    Component,
} from 'react';
import {
    bindActionCreators,
} from 'redux';
import {
    connect,
} from 'react-redux';

import * as actionList from '../actions/index';
import mapStateToProps from '../reducers/data';

import bg from '../style/images/bg4.jpg';
import readme from '../static/README.md';
import '../style/index.less';

class Tab1 extends Component {
    constructor(props) {
        super(props);
        this.changeTab1 = this.changeTab1.bind(this);
        this.changeTab2 = this.changeTab2.bind(this);
    }
    changeTab1() {
        this.props.actionChangeTab1(`haha1${Math.random()}`);
    }
    changeTab2() {
        this.props.actionChangeTab2(`haha2${Math.random()}`);
    }
    render() {
        return (
            <div>
                <img src={bg} alt="" />
                <div>
                    React+Webpack+ES6从环境搭建到HelloWorld
                </div>
                <div>
                    {this.props.contentTab1}
                </div>
                <div style={{ width: '100%' }} onClick={this.changeTab1} >
                    改变tab1数据
                </div>
                <div style={{ width: '100%' }} onClick={this.changeTab2} >
                    改变tab2数据
                </div>
                <div style={{ height: 400 }} className="bg2" />
                <a href={readme} >README.md</a>
                <div style={{ height: 200 }} className="bg1" />
            </div>
        );
    }
}

// 作用：
// 1.将action和dispatch绑定，效果是action就等于dispatch(action)
// 2.再将action映射成props属性，可以通过this.props.action访问
function bindActionWithDispatchToProps(dispatch) {
    return bindActionCreators(actionList, dispatch);
}

export default connect(mapStateToProps, bindActionWithDispatchToProps)(Tab1);