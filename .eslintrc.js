module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "import/no-extraneous-dependencies": 0, // 允许引入devDependencies
    "no-param-reassign": 0, // 允许对函数参数进行重新赋值
    'no-unused-vars': 'off', // 允许定义未使用的变量
    "@typescript-eslint/no-unused-vars": "error",
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'arrow-body-style': 'off', // 箭头函数体风格，off 表示禁用此规则，允许使用非必要的括号
    '@typescript-eslint/no-explicit-any': 'off', // 表示禁用此规则，允许使用 any 类型
    '@typescript-eslint/no-var-requires': 'off', // 禁止使用 require() 导入。off 表示禁用此规则，允许使用 require()。
    "eqeqeq": ['error', 'always'], // 要求使用恒等（===）而不是等于（==）进行比较，否则报错。
    'no-use-before-define': 'error', // 禁止在定义之前使用变量。error 表示将此视为错误
    'guard-for-in': 'error', // 要求在 for-in 循环中使用 hasOwnProperty 方法进行条件过滤，否则报错。
    'consistent-this': ['error', '_this', 'that', 'self'], // 要求在代码中使用指定的别名代替 this（_this、that、self），否则报错。
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
