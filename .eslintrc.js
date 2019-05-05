// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceT8ype: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // Prefer a default export if module exports a single name
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    // 禁止导出使用var或let声明的变量
    'import/no-mutable-exports': 'off',

    'no-restricted-syntax': ['off', 'BinaryExpression[operator=\'in\']'],
    'no-useless-computed-key': 'off',

    'no-undef': 'off',
    'no-use-before-define': 'warn',
    // 禁止扩展原生类型
    'no-extend-native': 'error',
    // 禁用特定的全局变量
    'no-restricted-globals': 'off',
    // 禁止出现空语句块
    'no-empty': ['error',
      { 'allowEmptyCatch': true }
    ],
    // 禁止标识符中有下划线
    'nderscore-dangle': 'off',
    // 禁止对 function 的参数进行重新赋值
    'no-param-reassign': 'off',
    // 禁用一元操作符 ++ 和 --
    'no-plusplus': 'off',
    // 禁用 continue 语句
    'no-continue': 'off',
    // 禁止出现空函数.如果一个函数包含了一条注释，它将不会被认为有问题。
    'no-empty-function': 'off',
    // 禁止在单个语句中使用多个赋值
    'no-multi-assign': 'off',
    // 不允许使用嵌套的三元表达式
    'no-nested-ternary': 'off',
    // 禁止在return语句中使用赋值语句
    'no-return-assign': 'off',
    // 禁止在finally语句中使用return，throw，break，和continue
    'no-unsafe-finally': 'off',
    // 禁止出现未使用过的表达式 allowShortCircuit:允许短路写法 allowTernary:允许三元表达式
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true
    }],
    // 强制行的最大长度
    'max-len': ['error',
      150, {
        'ignoreComments': true,
        'ignoreTrailingComments': true,
        'ignoreUrls': true,
        'ignoreStrings': true,
        'ignoreTemplateLiterals': true,
        'ignoreRegExpLiterals': true
      }
    ],
    // 要求或禁止命名的 function 表达式
    'func-names': 'off',
    // 强制使用一致的换行符风格
    'linebreak-style': 'off',
    // 强制在parseInt()使用基数参数
    'radix': ['error', 'as-needed'],
    // 要求 require() 出现在顶层模块作用域中
    'global-require': 'off',
    // 要求对象字面量属性名称用引号括起来
    'quote-props': ['error', 'as-needed', {
      'unnecessary': false // 如果没有严格要求，允许对象属性名称使用引号 (当 as-needed 时生效)
    }],
    // 优先使用数组和对象解构
    'prefer-destructuring': 'off',
    // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    // 使该规则不那么严格，将括号作为有效防止混淆的语法
    // var x = a => (1 ? 2 : 3);
    'no-confusing-arrow': ['error', { 'allowParens': true }],
    // 要求遵循大括号约定，代码块必须使用大括号
    'operator-linebreak': ['error', 'before', {
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    // 允许使用|, >等操作符
    'no-bitwise': 'off',
    'object-curly-newline': ['error', {
      'ObjectExpression': {
        'multiline': true,
        'minProperties': 2,
        'consistent': true
      },
      'ObjectPattern': {
        'multiline': true,
        'minProperties': 4
      },
      'ImportDeclaration': {
        'multiline': true,
        'minProperties': 4
      },
      'ExportDeclaration': {
        'multiline': true,
        'minProperties': 4
      }
    }],
    // post方法无法return promise
    'consistent-return': 'off',
    // 如果一个类方法没有使用this，那么必须将该方法转换为静态函数
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', {
      arrays: 'ignore',
      exports: 'never',
      functions: 'ignore',
      imports: 'never',
      objects: 'ignore'
    }],
    // 强制所有控制语句使用一致的括号风格
    'curly': ['off', 'multi-or-nest'],
    // 文件末尾强制换行
    'eol-last': 'off',
    // 要求使用箭头函数作为回调
    'prefer-arrow-callback': 'off',
    // 将立即调用函数表达式用括号括起来
    'wrap-iife': ['error', 'inside'],
    'new-cap': 'off',
    'eqeqeq': 'off',
    'no-useless-escape': 'off',
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-mixed-spaces-and-tabs': [0, 'smart-tabs'],
    'no-tabs': [0],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-new': 0,
    'no-console': 'warn',
    'space-before-blocks': 0,
    'space-before-function-paren': 0
  }
}
