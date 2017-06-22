## vue最新稳定版
npm install vue

## 全局安装 vue-cli
$ npm install --global vue-cli

## 创建一个基于 webpack 模板的新项目
$ vue init webpack know-how

## 安装依赖
$ cd know-how
$ npm install

## 启动项目
$ npm run dev

## 安装iview组件
$ npm install iview --save

## 安装 vue-video-player组件
$ npm install vue-video-player --save

## 安装 axios HTTP 客户端
$ npm install axios --save


main.js 增加：

import iView from 'iview'
import 'iview/dist/styles/iview.css'


Vue.use(iView);
