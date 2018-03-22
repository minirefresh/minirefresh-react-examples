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

import bg from '../style/images/bg1.jpg';
import '../style/index.less';

class Tab2 extends Component {
    render() {
        return (
            <div>
                <img src={bg} alt="" />
                <div>
                    tab2的内容
                </div>
                <div>
                    {this.props.contentTab2}
                </div>
                <div style={{ height: 400 }} className="bg2" />
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

export default connect(mapStateToProps, bindActionWithDispatchToProps)(Tab2);