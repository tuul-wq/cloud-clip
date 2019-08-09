const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: { '@': path.resolve('src') }
        }
    },
    css: {
        loaderOptions: {
            sass: { data: `@import "~@/styles/fonts.scss";` }
            // @import "~@/styles/colors.scss"
        }
    }
}
