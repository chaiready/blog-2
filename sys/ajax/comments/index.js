﻿/**
 * @author bh-lay
 * 
 * /ajax/user
 * /ajax/user/signup
 * /ajax/user/login
 * /ajax/user/list
 * demo $.post('/ajax/user',{
	
	});
 */

var parse = require('../../lofox/parse.js');
var add = require('./add.js');
var list = require('./list.js');

//二分钟限制十个回复
var time_limit = 2 * 60 * 1000;
var count_limit = 10;

//增加回复/评论
exports.add = function (connect,app){

	parse.request(connect.request,function(err,data){
		connect.session(function(session_this){
			//检测认证信息
			var comment_auth = session_this.get('comment_auth');
			if(comment_auth != 'ready'){
				//不是正常用户，阻止评论
				connect.write('json',{
					'code' : 201
				});
				return
			}
			//获取评论计数
			var comment_count = session_this.get('comment_count') || 0;
			//上次清除评论计数的时间
			var comment_last_clear_time = session_this.get('comment_last_clear_time') || new Date().getTime() - time_limit * 2;
			
			var now = new Date().getTime();
			//时间间隔在限制之外
			if(now - comment_last_clear_time > time_limit){
				//评论计数置为一
				session_this.set({
					'comment_count' : 1,
					'comment_last_clear_time' : now
				});
			}else{
				//指定时间内 评论数超过上限
				if(comment_count >= count_limit){
					connect.write('json',{
						'code' : 403,
						'msg' : '评论频率过快，请歇息片刻！'
					});
					return;
				}else{
					//评论计数加一
					session_this.set({
						'comment_count' : comment_count + 1
					});
				}
			}
		
		
			data.uid = session_this.get('uid');
			add(data,function(err,data){
				var json = {
					'code' : 200
				}
				if(err){
					json.code = 201
				}else{
					json.data = data;
				}
				connect.write('json',json);
			});
		});
	});
}

//接口
exports.list = function (connect,app){
	var data = connect.url.search;
	list(data,function(err,jsonData){
		var json = {
			'code' : 200
		}
		if(err){
			json.code = 201
		}else{
			json.data = jsonData;
		}
		connect.write('json',json);
	});
};