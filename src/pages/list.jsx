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

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listData: [],
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
            
            this.setState({
                listData: this.createTestData(10, true),
            });
            this.minirefresh.endDownLoading(true);
        }, 500);
    }
    onPullingUp() {
        setTimeout(() => {
            console.log(`pulling up and load data: ${this.state.listData.length}`);
            
            const newList = this.createTestData(4, false, this.state.listData);
            
            this.setState({
                listData: newList,
            });
            
            console.log(`pulling up end: ${newList.length}`);
            this.minirefresh.endUpLoading(newList.length >= 20);
        }, 500);
    }
    createTestData(count, isReset, oldData) {
        if (isReset) {
            this.count = 0;
        }
        this.count = this.count || 0;
        
        let res = [];
        const dateStr = (new Date()).toLocaleString();
        
        for (let i = 0; i < count; i++) {
            res.push({
                title: `测试第【${this.count++}】条新闻标题`,
                date: dateStr,
            });
        }
        oldData && (res = oldData.concat(res));
        
        return res;
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

export default connect(mapStateToProps, bindActionWithDispatchToProps)(List);