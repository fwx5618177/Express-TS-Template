# HTTP API 测试套件

这个目录包含了完整的 HTTP API 测试文件，用于测试 Express-TS-Template 项目中的各种接口。

## 测试文件说明

### 基础测试文件

-   **`auth.http`** - 基础认证接口测试（登录、注册、登出）
-   **`users.http`** - 基础用户管理接口测试（CRUD 操作）

### 完整测试套件

-   **`auth-complete.http`** - 完整的认证测试，包含各种边界情况和错误场景
-   **`users-complete.http`** - 完整的用户管理测试，包含各种 CRUD 操作和验证
-   **`graphql.http`** - GraphQL 接口测试，包含查询和变更操作
-   **`api-general.http`** - 通用 API 测试，包含健康检查、CORS、内容协商等
-   **`error-scenarios.http`** - 错误场景测试，专门测试各种错误情况
-   **`performance.http`** - 性能和负载测试

## 使用说明

### 环境变量

所有测试文件使用统一的基础 URL：

```
@baseURL = http://localhost:3000
```

### 如何运行测试

#### 使用 VS Code REST Client 插件

1. 安装 REST Client 插件
2. 打开任意 `.http` 文件
3. 点击请求上方的 "Send Request" 按钮

#### 使用 IntelliJ IDEA HTTP Client

1. 打开任意 `.http` 文件
2. 点击请求左侧的绿色箭头图标

#### 使用命令行工具

可以使用 `httpie` 或 `curl` 来执行请求：

```bash
# 使用 httpie
http GET localhost:3000/users

# 使用 curl
curl -X GET http://localhost:3000/users
```

## 测试分类

### 1. 功能测试 (auth.http, users.http, graphql.http)

-   验证 API 的基本功能是否正常
-   测试正常的业务流程

### 2. 边界测试 (auth-complete.http, users-complete.http)

-   测试输入参数的边界值
-   验证数据验证逻辑

### 3. 错误处理测试 (error-scenarios.http)

-   测试各种 HTTP 错误状态码
-   验证错误响应格式
-   测试安全相关的错误处理

### 4. 性能测试 (performance.http)

-   负载测试
-   并发测试
-   响应时间测试

### 5. 通用测试 (api-general.http)

-   CORS 测试
-   内容协商测试
-   HTTP 方法支持测试

## 测试数据

### 默认测试账号

```json
{
    "email": "test-user@example.com",
    "password": "Test123456"
}
```

### 测试用户 ID

-   存在的用户 ID: `1`
-   不存在的用户 ID: `99999`

## 重要注意事项

1. **测试顺序**: 某些测试有依赖关系，建议按照文件中的顺序执行
2. **数据清理**: 测试可能会创建测试数据，建议在测试环境中运行
3. **环境隔离**: 不要在生产环境中运行这些测试
4. **数据库状态**: 某些测试假设数据库处于特定状态

## 常见测试场景

### 认证流程测试

1. 注册新用户 → 登录 → 访问受保护资源 → 登出
2. 错误登录尝试 → 检查错误响应
3. Token 过期处理

### 用户管理测试

1. 创建用户 → 查询用户 → 更新用户 → 删除用户
2. 输入验证测试
3. 权限检查

### GraphQL 测试

1. 简单查询 → 复杂查询 → 变更操作
2. 错误查询处理
3. Schema 验证

## 扩展测试

如果需要添加新的测试，建议：

1. 在相应的文件中添加测试用例
2. 遵循现有的命名约定
3. 添加适当的注释说明
4. 考虑错误场景和边界情况

## 自动化测试

可以将这些 HTTP 文件集成到 CI/CD 流程中：

```bash
# 使用 newman 运行 Postman 集合（需要转换格式）
# 或使用其他 HTTP 测试工具
```

## 监控和报告

建议记录以下指标：

-   响应时间
-   成功率
-   错误类型分布
-   性能基准

---

**提示**: 在运行测试之前，请确保：

1. 服务器正在运行（`make dev` 或 `npm run dev`）
2. 数据库连接正常
3. 必要的环境变量已设置
