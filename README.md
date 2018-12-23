# Bipibipi

bilibili api 项目 (开发中)

## 使用说明

### 安装

`npm i bipibipi` 或者 `yarn add bipibipi`

### 使用

本项目同时提供了接口封装和业务逻辑封装

#### Demo

该 Demo 包含了登录、扫码验证并关注作者B站的一系列操作

```bash
./dev/demo.ts
```

### 说明

## 开发准备

下列说明将帮助你开发和测试本项目，如果你只是本项目用户，可以忽略以下部分

### 环境依赖

本项目的开发依赖以下软件，请先完成安装：

`node`, `npm`, `yarn`

PS：本项目开发流程目前仅在 Linux 上跑过，如果您使用 MacOS 遇到问题，欢迎提交 PR

### 安装开发依赖

`yarn install`

## 项目设计简述

项目采用 TypeScript 开发，并提供完整的类型文件

### 目录规划

`src/api` 下为每个接口的封装实现，以及每个接口的测试用例
`src/lib` 为本项目对业务逻辑的封装，它提供对业务实体的抽象
`src/utils` 为项目的工具库，它提供各类函数工厂和测试函数等

### 对原系统的修改

本项目并不只是简单的 API 调用器，本项目会将所有数据统一为 camcalCase，并修改原不规范的命名，或不合理的类型设计，力求同一数据实体在本项目内所有出现的地方命名方式相同

## 测试

因为本项目是针对第三方平台的 API 封装，所以测试设计稍显复杂。

### 测试准备

大量接口需要用户登录才能访问，所以运行测试前要准备好测试用帐号的 ID/Session/Token，最简单的做法是直接使用本项目提供的工具生成，运行 `./dev/generate-env.ts`，项目将自动生成二维码，用手机客户端对打开的图片进行扫码，即可完成登录，并自动将登录信息写入项目根目录的 `.env` 文件，后续测试会自动载入该文件完成验证，您也可以手动编写该文件，格式为：

```bash
USER_ID=xxxxxxxx
SESSION_DATA=xxxxxxxx,xxxxxxxxxx,xxxxxxxx
CSRF_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 测试设计概述

对于每个接口，单元测试将覆盖到所有字段的类型，目标是跟踪B站的 API 修改
对于每个业务逻辑封装 [TODO]

### 代码风格测试

本项目同时进行 prettier 和 tslint 代码风格检查，只需运行 `yarn run test:lint` 即可完成代码风格测试，或者直接运行 `yarn run fix` 自动完成代码风格修正

## 合作开发指南

请点击 [CONTRIBUTING.md](./.github/CONTRIBUTING.md) 查看具体的代码规范

## 作者

* **GeekTR** - *Initial work* - [GeekTR](https://github.com/geektheripper)

## 许可证

本项目采用 MSP 许可证 (MIKU SAIMOE PUBLIC LICENSE)
该许可证源自 WTFPL，它只要求你说一句 “初音最萌”，然后就可以以任意形式使用本项目了
 - 点击 [LICENSE.md](LICENSE.md) 查看详情
