# API 接口

## 版本信息
- version：v.1.0.1.20171206.1
- [API 文档](http://test.jessechiu.com/api-doc/)

##  获取所有用户
- url: http://test.jessechiu.com/users/
- 请求类型：GET
- 参数

  |  参数   |     意义      |         备注          |
  | :---: | :---------: | :-----------------: |
  | start | 取结果的 offset | 必填 类型 Number 默认值 0  |
  | count |    取结果条数    | 必填 类型 Number 默认值 20 |



- 成功 返回数据
```js
{
	"total": 20,
	"count": 40,
	"start": 0,
	"data": [{
				"_id": "5a27dba65df7de178c88caa2",
				"__v": 0,
				"password": "8888",
				"userId": "kuku"
			}, {
				"_id": "5a27dbcd5df7de178c88caa3",
				"__v": 0,
				"password": "8888",
				"userId ":"kuku "
				}]
}
```
- demo
```js
$.ajax({
    type: 'GET',
    url: url + 'users/',
    data: {
        count:40, // 必填
        start:0 // 必填
    },
    success: function (data) {
        console.log(`get all success: ${JSON.stringify(data)}`);
    },
    error: function(error){
        console.log(`get all error: ${JSON.stringify(error)}`);
    }
})
```

## 获取具体某个用户
- url: http://test.jessechiu.com/users/:userId
- 请求类型：GET
- 参数

  |  参数  |    意义    |      备注      |
  | :--: | :------: | :----------: |
  |  userId  | userId | 必填 类型：String |

- 成功 返回数据
```js
{
	"_id": "5a27dbcd5df7de178c88caa3",
	"__v": 0,
	"password": "8888",
	"userId ":"kuku "
}
```
- demo
```js
$.ajax({
    type: 'GET',
    url: url + 'users/kuku',
    success: function (data) {
        console.log(`get all success: ${JSON.stringify(data)}`);
    },
    error: function(error){
        console.log(`get all error: ${JSON.stringify(error)}`);
    }
})
```
## 添加用户信息
- url: http://test.jessechiu.com/users/
- 请求类型：POST
- 参数

  |   参数    |   意义   |      备注      |
  | :-----: | :----: | :----------: |
  | userId | 用户 ID | 必填 类型 String |
  | password   |  用户密码  | 必填 类型 String |

- 成功 返回数据
```js
{
	"_id": "5a27dbcd5df7de178c88caa3",
	"__v": 0,
	"password": "8888",
	"userId ":"kuku "
}
```
- demo
```js
$.ajax({
  type: 'POST',
  url: url + 'users/',
  data: {
		userId:'kuku',
		password:'8888'
  },
  success: function (data) {
  	console.log(`post success: ${JSON.stringify(data)}`);
  },
  error: function(error){
  	console.log(`post error: ${JSON.stringify(error)}`);
  }
})
```

## 更新用户信息
- url: http://test.jessechiu.com/users/:userId
- 请求类型: PUT

- 参数

  |   参数    |   意义   |      备注      |
  | :-----: | :----: | :----------: |
  | userId | 用户 ID | 必填 类型 String |
  | password   |  用户密码  | 必填 类型 String |

- 成功 返回数据
```js
{
	"_id": "5a27dbcd5df7de178c88caa3",
	"__v": 0,
	"password": "9999",
	"userId ":"kuku "
}
```
- demo
```js
$.ajax({
  type: 'PUT',
  url: url + 'products/kuku',
  data: {
		"password": "9999",
		"userId ":"kuku "
  },
  success: function (data) {
  	console.log(`post success: ${JSON.stringify(data)}`);
  },
  error: function(error){
  	console.log(`post error: ${JSON.stringify(error)}`);
  }
})
```


## 删除某个用户
- url: http://test.jessechiu.com/users/:userId
- 请求类型：DELETE
- 参数

  |  参数  |    意义    |      备注      |
  | :--: | :------: | :----------: |
  |   |  |  |

- 成功 返回数据
```js
空
```
- demo
```js

$.ajax({
  type: 'DELETE',
  url: `${url}users/${userId}`,
  success: function (data) {
  	console.log(`delete success: ${JSON.stringify(data)}`);
  },
  error: function(error){
  	console.log(`delete error: ${JSON.stringify(error)}`);
  }
});
```

## CURL 测试代码
curl http://localhost/users
curl http://localhost/users/ -X POST -d "userId=jesse&password=8888"
curl http://localhost/users/kuku
curl http://localhost/users/kuku -X PUT -d "userId=kuku&password=9999"
curl http://localhost/users/kuku -X DELETE