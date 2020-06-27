// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function(res) {
        complete: function(res) {
            //在complete 回电函数中，可以使用res.responseJSON拿到服务器响应回来的数据
            if (res.res.responseJSON.status === 1 && res.res.responseJSON.message === '身份认证失败！') {
                //强制清空token
                localStorage.removeItem('token');
                //强制跳转到登录页面
                location.href = '/login.html';
            }
        }
    }
})