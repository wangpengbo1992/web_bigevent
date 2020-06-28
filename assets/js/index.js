$(function() {
    getUserInfo();


    //点击按钮，完成退出的功能
    var layer = layui.layer
    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.comfirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
            //清空本地存储的token
            localStorage.removeItem('token');
            //重新跳转到登录页面
            location.href = '/login.html';

            //关闭询问框
            layer.close(index);
        })
    })
})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers 就是headers配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            };
            //调用renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        },

    })
}

function renderAvatar(user) {
    //1.获取用户的名称 
    var name = user.nickname || user.username;
    //2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    //3.按需渲染用户的头像
    if (user.user_pic !== null) {
        //3.1 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    };

};