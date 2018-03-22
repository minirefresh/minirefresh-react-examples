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

import MiniRefresh from '../components/minirefresh';

class Tab2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [{
                title: '标题1',
                data: '2018-03-22',
            }, {
                title: '标题2',
                data: '2018-03-22',
            }, {
                title: '标题3',
                data: '2018-03-22',
            }],
            options: {
                container: '.minirefresh-wrap',
                up: {
                    isAuto: true,
                    loadFull: {
                        isEnable: true,
                    },
                },
            },
        };
        this.onPullingDown = this.onPullingDown.bind(this);
        this.onPullingUp = this.onPullingUp.bind(this);
    }
    onPullingDown() {
        setTimeout(() => {
            console.log('pulling down and load data');
            this.minirefresh.endDownLoading(true);
        }, 500);
    }
    onPullingUp() {
        setTimeout(() => {
            console.log('pulling up and load data');
            this.minirefresh.endUpLoading(true);
        }, 500);
    }
    render() {
        return (
            <div>
                <div>
                    !!!tab2的内容 {this.props.contentTab2}
                </div>
                <MiniRefresh
                    options={this.state.options}
                    pullingDown={this.onPullingDown}
                    pullingUp={this.onPullingUp}
                    ref={(child) => {
                        this.minirefresh = child;
                    }}
                >
                    <ul className="data-list" id="listdata">
                        {
                            this.state.listData.map(item => (
                                <li className="list-item">
                                    <h3 className="msg-title">
                                        {item.title}
                                    </h3>
                                    <span className="msg-fs14 msg-date">
                                        {item.date}
                                    </span>
                                </li>
                            ))
                        }
                    </ul>
                </MiniRefresh>
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