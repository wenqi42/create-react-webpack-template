import process from 'process'
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from 'path';
import packageJson from './package.json' assert { type: 'json' };
import dotenv from 'dotenv'
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const dynamicEntry = process.env.WEBPACK_DYNAMIC_ENTRY || 'src/index.tsx'
const mode = process.env.WEBPACK_MODE || 'development'
const projectName = process.env.WEBPACK_PROJECT_NAME || packageJson.name
/**
 * @type {import("webpack").Configuration} 
 */
const webpackConfig = {
    entry: path.resolve(import.meta.dirname,dynamicEntry),
    output:{
        path:process.env.WEBPACK_OUTPUT_PATH || path.resolve(import.meta.dirname,'/dist'),
        filename:'[name]_[hash].js'
    },
    resolve:{
        alias:{
            '@':'src',
            "src/*":path.resolve(import.meta.dirname,'src/*')
        },
        extensions:['.tsx','.jsx','.ts','.js','.html','.css','.json']
    },
    module:{
        rules:[
            {
                test:/\.(tsx|jsx|ts|js)?$/,
                use:'ts-loader',
                exclude: /node_modules/,
                include: [path.resolve(import.meta.dirname,'src')]
            },
            {
                test:/\.(css|scss|sass)?$/,
                use:['style-loader','css-loader',,'postcss-loader'],
            },
            {
                test:/\.(png|jpg|jpeg|gif|svg|ico|webp|bmp|tiff|woff|woff2)?$/,
                type:'asset/resource',
                exclude: /node_modules/,
                include: [path.resolve(import.meta.dirname,'src')]
            }
        ]
    },
    devServer:{
        hot:true,
        port:8080,
        open:true,
        compress:true
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[hash].css',
        }),
        new HtmlWebpackPlugin({
            template:'public/index.html',
            name:projectName,
            //替换 关键字变量字符
        })
    ]
}

export default webpackConfig