/**
 * by fjywan @xiaoshude.
 */

/**
 *1.找到对应文件，匹配ng-include里面的url,和filename
 *2.读取文件，添加script标签塞到当前文件
 *3.更改ng-include里的url为filename
 */
var path = require('path');
var fs = require('fs');

module.exports = function(content) {
    this.cacheable && this.cacheable();
    var ngIncludeReg = /(ng-include=["']{2}(.+\/(\w+\.\w+))["']{2})/mg;
    var result = content.match(ngIncludeReg);
    var moduleContext = this._module.context;

    content = content.replace(ngIncludeReg, 'ng-include="\'$3\'"');

    function genScriptTpl(arr) {
        if(Array.isArray(arr)){
            var html = '';

            arr.forEach(function (v) {
                var startIndex = v.indexOf('=') + 3;
                var url = v.slice(startIndex, -2)
                var splitedArr = url.split('/');
                var filename = splitedArr[splitedArr.length - 1];
                var absoluteUrl = path.resolve(moduleContext, url);
                var sourceHtml = fs.readFileSync(absoluteUrl);

                html += '<script type="text/ng-template" id="' + filename + '">' + sourceHtml + '</script>'
            });

            return html;
        }
    }

    var html = genScriptTpl(result);

    content += html;

    return content;
};
