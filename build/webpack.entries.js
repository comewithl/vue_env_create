/**
 * Created by fuzl on 2017/3/3.
 * webpack多入口页面配置
 */
/**
 * Created by fuzl on 2017/5/23.
 */
const Path = require('path');
const Fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const destDir = '';
const cwd = Path.resolve(__dirname, '../src');
const defaultTemplateFile = Path.resolve(cwd, 'layout.pug');
// export
module.exports = (options={})=>{
    let entries = readPageEntries('page');
    let entry = {};
    let htmlGeneratorPlugins = [];
    for (let name in entries) {
        let instance = entries[name];
        entry[name] = instance.path;
        htmlGeneratorPlugins.push(new HtmlWebpackPlugin({
            filename: Path.join(destDir, `${name}.html`),
            template: instance.template,
            chunks: ['vendor', 'manifest', name],
            title: instance.title
        }));
    }
    return {
        entry,
        plugins: htmlGeneratorPlugins
    };
}

/**
 * @param {string} src
 * @return {Object}
 * @internal
 * */
function readPageEntries(src){
    let fileList = Fs.readdirSync(Path.resolve(cwd, src));
    let entry = {};
    fileList.forEach((name)=>{
        let dirPath = Path.resolve(cwd, src, name);
        if (Fs.statSync(dirPath).isDirectory()) {
            let fileList = Fs.readdirSync(dirPath);
            let jsFileName = name + '.js';
            let templateName = name + '.pug';
            let title = Fs.existsSync(Path.resolve(dirPath, "package.json")) ? require(Path.resolve(dirPath, "package.json")).title : ""
            if (fileList.indexOf(jsFileName) >= 0) {
                entry[name] = {
                    path: Path.resolve(dirPath, jsFileName),
                    template: fileList.indexOf(templateName) >= 0 ? Path.resolve(dirPath, templateName): defaultTemplateFile,
                    title
                }
            }
        } else if (/\.js$/.test(dirPath)) {
            let filename = Path.basename(dirPath)
            entry[filename.slice(0, filename.lastIndexOf("."))] = {
                path: dirPath,
                template: defaultTemplateFile
            }
        }
    });
    return entry;
}