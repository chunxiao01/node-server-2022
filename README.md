### 说明

#### 基于 bilibili API，本地搭建测试服务器

### 1. 安装

```shell
npm install
```

### 2. 启动服务

```shell
node index.js
```

### 3. bilibili 本地测试接口说明

#### 3.1 热门视频

```javascript
url: "http://127.0.0.1:8000/api/bilibili_hot",
method:'GET',
params: {
  ps: 40,//每页视频数
  pn: 1 //页码
}
```
