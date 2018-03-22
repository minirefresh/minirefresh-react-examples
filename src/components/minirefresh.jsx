/**
 * react中
 * this.props.children可以实现vue中的slot插槽效果
 */
import React, {
    Component,
} from 'react';

import 'minirefresh/dist/debug/minirefresh.css';
import MiniRefreshTools from 'minirefresh';

class Minirefresh extends Component {
    componentDidMount() {
        this.initMiniRefresh();
    }
    initMiniRefresh() {
        this.options = this.props.options;
        // 暂时处理深复制
        this.miniRefresh = new MiniRefreshTools.theme.defaults(Object.assign(this.options, {
            down: Object.assign(this.options.down || {}, {
                callback: this.props.pullingDown,
            }),
            up: Object.assign(this.options.up || {}, {
                callback: this.props.pullingUp,
            }),
        }));
    }
    endDownLoading(isSuccess, successTips) {
        this.miniRefresh.endDownLoading(isSuccess, successTips);
    }
    endUpLoading(isFinishUp) {
        this.miniRefresh.endUpLoading(isFinishUp);
    }
    render() {
        return (
            <div className="minirefresh-wrap">
                <div className="minirefresh-scroll">
                    {
                        React.Children.map(this.props.children, child => (
                            <div>{child}</div>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default Minirefresh;