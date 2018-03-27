// http://eslint.org/docs/user-guide/configuring

module.exports = {
    'root': true,
    'extends': "airbnb",
    "parser": "babel-eslint",
    'parserOptions': {
        // ECMAScript 版本
        "ecmaVersion": 7,
        'sourceType': 'module',
        'ecmaFeatures': {
            // 允许在全局作用域下使用 return 语句
            "globalReturn": true,
            "jsx": true
        }
    },
    'env': {
        'browser': true,
        'es6': true,
        'mocha': true,
        "node": true
    },
    'globals': {
        'Babel': true,
        "dd": true,
        "ejs": true,
    },
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    // add your custom rules here
    'rules': {
        // 关闭react拓展
        'jsx-a11y/href-no-hash': 0,
        'react/require-extension': 0,
        'import/no-extraneous-dependencies': 0,
        // 允许不使用this
        'class-methods-use-this': 0,
        "no-mixed-operators": [0, {
            "groups": [
                ["+", "-", "*", "/", "%", "**"],
                ["%", "**"],
                ["&", "|", "^", "~", "<<", ">>", ">>>"],
                ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
                ["&&", "||"],
                ["in", "instanceof"]
            ],
            "allowSamePrecedence": true,
        }],
        // 只允许对ejs这个参数的属性二次赋值
        // 'no-param-reassign': [2, { 'props': true, 'ignorePropertyModificationsFor': ['ejs'] }],
        // 强制一行的最大长度
        //"max-len": [2, 100],
        // 允许一个变量或多个变量的声明
        //'one-var': 0,
        // 允许++和--
        'no-plusplus': 0,
        // 文件末尾强制换行，目前暂时放弃，考虑到一些Idle的格式化问题
        'eol-last': 0,
        //强制使用一致的缩进，4个空格
        'indent': [2, 4, {
            'SwitchCase': 1
        }],
        // 允许特殊的_开头属性，目前关闭，使用_命名规则代表不公开函
        'no-underscore-dangle': [0, {
            "allow": ["_handleMessageFromNative"]
        }],
        // 允许位操作
        'no-bitwise': 0,

        // 以下是一些与airbnb无关的修改配置
        // recommend的修改
        // 花括号换行的一致性
        // 关闭这个规则
        "object-curly-newline": [0, {
            "ObjectExpression": {
                "multiline": true,
            },
            "ObjectPattern": {
                "multiline": true,
            },
            "ImportDeclaration": {
                "multiline": true,
            },
            "ExportDeclaration": {
                "multiline": true,
            }
        }],
        //  禁用行尾空格,允许空行使用空白符
        'no-trailing-spaces': [2, {
            'skipBlankLines': true
        }],
        // 其它的重写
        // 允许逻辑与短路语句，不重写会报错，应该是拓展规则里的
        'no-unused-expressions': [2, {
            'allowShortCircuit': true
        }],
        // 禁用 console，目前console变为警告级别
        'no-console': 0,
        // 函数的()前可以没有空格
        // 'space-before-function-paren': [0, 'always'],
        // allow paren-less arrow functions
        // 箭头函数必须使用圆括号，如 (a) => {}
        //'arrow-parens': 2,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        // react相关
        // jsx语法之间的单词indent，采用4个空格
        "react/jsx-indent": [2,
            4
        ],
        "react/jsx-indent-props": [2,
            4
        ],
        // 关闭纯函数使用的限制
        "react/prefer-stateless-function": 0,
        // 关闭a标签的验证
        "jsx-a11y/anchor-is-valid": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "react/prop-types": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "new-cap": 0,
    }
}