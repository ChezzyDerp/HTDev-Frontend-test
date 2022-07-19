const path = require("path");

module.exports = {
    mode:"development",
    entry:"./src/index.tsx",
    devServer:{
        static: path.join(__dirname, 'public'),
        compress:true,
        historyApiFallback: true,
        port: 3000
    },
    module:{
        rules:[
            {
                test: /.(ts|tsx)$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader",
                    options:{
                        presets:[
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
}