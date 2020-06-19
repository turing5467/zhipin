

### React项目实战

Boss直聘仿写，实现基本功能



#### 技术栈

- 前端主要使用库：React + React-Router + Redux + axios 
- UI框架：antd
- 后端：Express + mongodb + multer + ws



#### 实现功能

1. 登录、注册
2. 职位/公司展示与筛选
3. 在线编辑简历
4. 简历/头像上传（至服务端）、简历下载
5. 聊天（其实是自动回复，双向聊天还不好实现，因为没获取到招聘人的信息，所以就只做了简单的自动回复）



#### 亮点

1. 对axios进行封装，降低日后维护成本

2. 使用Hooks重构项目（除简历子组件外）

   

#### 性能优化

1. 图片懒加载，提高页面加载速度

2. 使用`React.PureComponent` , `shouldComponentUpdate`来优化渲染（有当组件props状态改变时才会重新渲染）

3. 延迟加载不是立即需要的组件

4. 避免使用匿名函数（每次渲染时都有不同的引用）

   



#### 部分截图展示

主页：

![8](https://ftp.bmp.ovh/imgs/2020/05/7119d32ea4a1c628.png)

职位列表：![6](https://ftp.bmp.ovh/imgs/2020/05/d46f20727a81412a.png)

选择城市：

![3](https://ftp.bmp.ovh/imgs/2020/05/8c708b0b4b6243da.png)

公司列表：![7](https://ftp.bmp.ovh/imgs/2020/05/53eb7ec8c3824f56.png)

简历：

![5](https://ftp.bmp.ovh/imgs/2020/05/642ad7fde122da6c.png)

编辑简历其中一项：

![2](https://ftp.bmp.ovh/imgs/2020/05/8eb5a847a1b115be.png)

聊天：

![1](https://ftp.bmp.ovh/imgs/2020/05/77beba31e1edfafe.png)

设置-修改密码：

![4](https://ftp.bmp.ovh/imgs/2020/05/bb927b62c1432b80.png)