'use strict'

/**
 * 该文件主要是利用 nodemailer 插件，邮寄收发测试
 */
const util = require('../utils/util');

let emailObj = {
    senderOptions: {
        user: `jessechiu@foxmail.com`,
        password: `xxxxx`
    },
    mailOptions: {
        to: ['jessechiu@foxmail.com', 'xxxxx@qq.com'],
        subject: 'Hello NodeMailer',
        text: 'One today is worth two tomorrows!',
        html: '<p>One today is worth two tomorrows!</p><p> <img src="cid:001"></p>',
        attachments: [{
            // 创建一个文本文件作为附件
            filename: 'HelloNodeMailer.md',
            content: 'One today is worth two tomorrows!'
        },{
            filename: 'scenery.jpg',
            // 支持本地文件和网络文件
            path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513761286&di=bd825ca63f37690549ef4588f9974895&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F32fa828ba61ea8d35e5c44059d0a304e251f58b0.jpg'
        }, {
            filename: 'girl.jpg',
            // 本地图片,嵌入到 html 内容页面中
            path: './asserts/girl.jpg',
            cid: '001'
        }]
    }

}

// 发送邮件
// util.sendEmail(emailObj)
// .then(console.log)
// .catch(console.error)