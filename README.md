# ng-include-loader
angular ng-include loader for webpack
```
把ng-include的模板打到当前html

if you use webpack and angular ng-include directive, you may need this loader

install:
```
npm install angular-include-loader -S
```
```
### 示例
```
{test: /formtpl\.html$/, loader: 'raw!ng-include-loader'},
```
