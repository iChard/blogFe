# 基于React的个人博客之前端

> 这是一个前后端分离的博客系统，还在完善中，目前实现了前端页面的文章渲染、详情、评论、管理员登录、创建文章、编辑文章等接口和界面交互
> 有需要的话可以根据以下步骤运行测试（建议配合当前系列的后端项目）

## 依赖环境

mac10.12.6、node7.6.0

## 步骤（这里介绍的是配合后端项目一起）

- 首先打开后端项目https://github.com/iChard/blogBg

1. npm i安装依赖
2. npm start  这时候启动的是localhost:3000

- 然后前端https://github.com/iChard/blogBg

1. npm i
2. npm start 会提示你端口号被占用
3. 选择y即可
4. 然后启动的是localhost:3001服务

正常的话前后端项目都会在本地运行起来，为了让让前端3001端口号访问后端3000端口上的接口可通过以下方式：

1. 设置本地host，随机选一个域名指向你的本地如： `127.0.0.1 www.ichard.cn`
2. 开启nginx并在server里面加上以下设置
3. reload nginx让nginx生效

```nginx
    server {
        listen 8080;
        charset utf-8;
        server_name www.ichard.cn;
        root /;
        index index.html;
        location ~* \.(js|jpg|css|html|png|svg|json|ico)$ {
            proxy_pass http://127.0.0.1:3001;
        }
        location / {
            proxy_set_header Host $http_host;
            proxy_pass http://127.0.0.1:3001;
        }
        location /api/ {
            proxy_pass http://127.0.0.1:3000;
        }
    }
```
