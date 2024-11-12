# Task Management Application

一个基于 Next.js 的现代化任务管理应用，支持任务创建、时间追踪、多视图展示等功能。

## 项目概述

该应用旨在提供一个直观的任务管理平台，具备以下特点：

- 用户账户系统（注册、登录、登出）
- 任务管理（CRUD 操作）
- 时间追踪功能
- 多视图支持（列表/看板）
- 响应式设计

## 技术栈

- **前端框架**: Next.js 15.0.3
- **UI 框架**: React 19
- **状态管理**: Zustand 5.0.1
- **样式方案**: Tailwind CSS 3.4.1
- **图标库**: Heroicons 2.1.5
- **日期处理**: date-fns 4.1.0
- **开发语言**: TypeScript

## 项目结构

src/
├── app/
│ ├── (auth)/ # 认证相关路由
│ │ ├── login/
│ │ └── register/
│ ├── dashboard/ # 主面板
│ │ ├── board/ # 看板视图
│ │ └── list/ # 列表视图
│ ├── api/ # API 路由
│ │ ├── auth/
│ │ └── tasks/
├── components/ # 共享组件
│ ├── auth/ # 认证相关组件
│ ├── tasks/ # 任务相关组件
│ └── ui/ # UI 组件
├── lib/ # 工具函数
├── types/ # TypeScript 类型定义
└── store/ # Zustand 状态管理

## 核心功能

### 用户系统

- [ ] 用户注册
- [ ] 用户登录
- [ ] 用户资料管理

### 任务管理

- [ ] 创建任务
- [ ] 编辑任务
- [ ] 删除任务
- [ ] 任务状态更新
- [ ] 任务优先级设置
- [ ] 任务标签管理

### 时间追踪

- [ ] 任务计时
- [ ] 暂停/继续
- [ ] 时间统计

### 视图功能

- [ ] 列表视图
- [ ] 看板视图
- [ ] 视图切换
- [ ] 响应式布局

### 数据持久化

- [ ] 本地存储
- [ ] API 集成

## 开发指南

### 环境要求

- Node.js 18+
- pnpm 8+

### 安装 pnpm

```bash
npm install -g pnpm
```

### 安装依赖

```bash
pnpm install
```

### 开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建部署

```bash
pnpm build
pnpm start
```

### 代码格式化

```bash
# 运行 ESLint 检查
pnpm lint

# 修复 ESLint 问题
pnpm lint:fix

# 格式化代码
pnpm format

# 运行 Stylelint 检查
pnpm stylelint

# 修复 Stylelint 问题
pnpm stylelint:fix
```

### 清理项目

```bash
# 清理所有构建文件和依赖
pnpm clean

# 只清理构建文件
pnpm clean:build

# 只清理依赖
pnpm clean:deps
```

## 数据模型

### Task（任务）

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  timeTracking: {
    starts: Date[];
    pauses: Date[];
    completed?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
```

### User（用户）

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    defaultView: 'list' | 'board';
    theme: 'light' | 'dark' | 'system';
  };
}
```

## 开发进度

### 第一阶段 - 基础架构

- [x] 项目初始化
- [x] 依赖安装
- [ ] 基础组件开发
- [ ] 路由设置

### 第二阶段 - 核心功能

- [ ] 用户认证系统
- [ ] 任务 CRUD
- [ ] 时间追踪
- [ ] 数据持久化

### 第三阶段 - UI/UX

- [ ] 响应式设计
- [ ] 深色模式
- [ ] 动画效果
- [ ] 性能优化

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 许可证

[MIT License](LICENSE)
