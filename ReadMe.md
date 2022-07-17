# TypeScript + Prisma + Express API Server 系统
1. 一键化使用
2. Docker的应用
3. Graphql

# 基于Express的一键搭建模板
- [x] Makefile
- [x] docker
- [x] husky
- [x] eslint
  - [x] lint-staged
- [x] prettier
- [x] TypeScript
  - [x] ts-node
  - [x] tsconfig-paths
- [x] Express
- [x] nginx
- [x] swagger
- [x] nodemon
- [x] swc
- [x] cross-env
- [x] jest
  - [x] ts-jest
- [x] pm2
- [x] cross-env
- [x] dotenv
  - [x] env.local
- [x] cors
- [x] supertest - 用于测试 HTTP 服务器的 SuperAgent 驱动库
- [x] class-transformer - 允许使用基于装饰器和非装饰器的验证，将普通对象转换为类的某个实例，允许根据标准序列化/反序列化对象
- [x] bcrypt - 散列密码的库
- [x] compression - Node.js 压缩中间件
- [x] helmet - 中间件，通过设置各种header来为express应用提供安全保护
- [x] hpp - 用于防止 HTTP 参数污染攻击的Express中间件
- [x] jsonwebtoken - JSON Web Token 实现（对称和非对称）
- [x] swagger-jsdoc - 该库读取您的JSDoc 注释源代码并生成OpenAPI (Swagger) 规范
- [x] swagger-ui-express - 此模块允许您基于文件提供从 express自动生成的swagger-uiswagger.json生成的 API 文档。结果是通过路由从 API 服务器托管的 API 的实时文档。
- [x] winston - 简单且通用的日志库，支持多种传输
- [x] morgan - node.js 的 HTTP 请求记录器中间件
- [ ] oss
- [x] prisma
- [x] envalid - Envalid 是一个小型库，用于验证和访问 Node.js（v8.12 或更高版本）程序中的环境变量
- [x] graphql - graphql传输方式
- [x] apollo-server-express - graphql在线测试接口平台

# 功能介绍

TODO

## 1. Graphql
- 新增Graphql
- 新增'http://localhost:3000/graphql', 'http://localhost:3000/graphql/mock'

0. 运行docker测试数据库: `docker-compose -f docker-compose-dev.yml up --force-recreate`, 运行`npm run prisma:migrate`
1. 打开: `http://localhost:3000/graphql`，可以访问在线测试graphql平台
2. CRUD:
```graphql
mutation {
    createPost(post: {
    id: "12",
    title: "12",
    content: "12",
  }) {
        id,
        title,
        content
    }
}

query {
  listPosts {
        id,
        title,
        content
  }
}

query {
  getPostById(postId: "8") {
        id,
        title,
        content
  }
}
```


