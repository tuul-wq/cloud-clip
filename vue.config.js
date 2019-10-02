const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: { '@': path.resolve('src') }
        }
    },
    css: {
        loaderOptions: {
            sass: { data: `@import "~@/assets/styles/fonts.scss";` }
            // @import "~@/styles/colors.scss"
        }
    }
}
