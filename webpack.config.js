const path = require('path');

module.exports = {
    entry: './dist/type/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    }
}
