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
