import process from 'process'
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from 'path';

const projectName = '__replace__placeholder__name__'
/**
 * @type {import("webpack").Configuration} 
 */
const webpackConfig = {
    entry: path.resolve(import.meta.dirname,'src/index.tsx'),
    output:{
        path:process.env.WEBPACK_OUTPUT_PATH || path.resolve(import.meta.dirname,'/dist'),
        filename:'[name]_[hash].js'
    },
    resolve:{
        alias:{
            '@':'src'
        },
        extensions:['.tsx','.jsx','.ts','.js','.html','.css','.json']
    },
    module:{
        rules:[
            {
                test:/\.(tsx|jsx)?$/,
                use:'ts-loader',
                exclude: /node_modules/,
                include: [path.resolve(import.meta.dirname,'src')]
            },
            {
                test:/\.(css|scss|sass)?$/,
                use:['css-loader','sass-loader'],
                exclude: /node_modules/
            }
        ]
    },
    //@ts-ignore
    devServer:{
        hot:true,
        port:8080,
        open:true,
        compress:true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'public/index.html',
            name:projectName,
            //替换 关键字变量字符
        })
    ]
}

export default webpackConfig