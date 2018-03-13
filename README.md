## 这是一个前后端分离的博客系统，还在完善中，目前实现了前端页面的文章渲染、详情、评论、管理员登录、创建文章、编辑文章等接口和界面交互
> 需要运行的话请按下面的顺序**当前只是前端项目，后端项目下面有写**  

首先打开后端项目https://github.com/iChard/blogBg

1. npm i
2. npm start  这时候启动的是localhost:3000  

然后前端https://github.com/iChard/blogBg

1. npm i
2. npm start 会提示你端口号被占用   
3. 选择y即可
4. 然后启动的是localhost:3001服务



这里前端项目和后端项目都启动了，现在要让前端项目的接口能访问到3000端口

这里我是通过nginx改了一下的:

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


