# gitfuninit
a awesome tool to help you git locally and remotely async

**gitfuninit 是一款基于nodejs的命令行程序，提供git本地和远程同时初始化，大大加快项目版本搭建速度，提升开发效率。

**目前仅支持github平台，后续可以支持gitlab平台。

## 支持Docker

【创建Dockerfile】

<pre>
FROM node:8


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production


COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
</pre>
【创建.dockerignore】

<pre>node_modules
npm-debug.log</pre>

【构建镜像】

<code>docker build -t \<yourusername>/node-web-app .</code>

【查看镜像】

<code>docker images</code>

【运行镜像】
<code>

$ docker run -p 49160:8080 -d <your username>/node-web-app</code>

Tip: -d 表示在容器中运行分离模式，这样可以让容器在后台运行
     -p 表示外部端口到容器内部端口的映射

【进入镜像】
<code>

$ docker exec -it \<container id> /bin/bash
</code>

【测试】

<code>

curl -i localhost:49160
</code>

Tip: 如果没有安装curl，请查询相关资料进行安装