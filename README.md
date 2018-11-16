# umi-example-monorepo

## Getting Started

```bash
# build packages/users and copy dist to packages/main/public
$ yarn users:build

# dev for packages/main
$ yarn start
```

## Why this repo?

关于 umi 的分包，我理解分包是指把一个应用的部分拆出去，然后按需引入。拆的部分可以是路由、model、service、组件等等。

**这是个小众的需求，有几个场景会用上，**

一个场景是路由的分包，一个站点会包含很多路由，然后一些场景下，比如 @十条 那边的项目，以及 umi ui 的插件化，或者项目太大了想要拆子系统，都会希望能把其中部分路由拆出去，交给其他人维护，然后拆出去的部分提供 umd 包进行对接。

一个场景是组件的分包，比如云凤蝶的场景，云凤蝶包含 page 和 component，page 是架子，由多个 component 组成，但包含哪些 component 是不确定的。所以做 component 的分包可以让 page 按需引用 component。

**分包的对接方式有多种，**

1. npm 依赖
2. umd 包

各有优劣势。第一种应用场景有限；第二种可以在运行时（html）里灵活组合，但是会有冗余问题。

**关于冗余，我觉得这是分包的最大问题**，

比如包 a 和包 b 都依赖 antd，antd 应该如何处理？

可以想到的方案有，

1. externals（目前用这个）
2. 公用 dll

但会带来额外的问题，

1. 某些原本可以按需加载的包无法按需，比如 antd，只能全量引入
2. 版本同步以及升级问题，比如之后要升级 antd@4，那么所有的分包都需要一起升级

## TODO

* [ ] Support use dva model in sub modules
* [ ] Support hash browser

## LICENSE

MIT
