/*
 * author bh-lay
 * demo 
 */

var fs = require('fs')
var utils = require('../../../core/utils/index.js')
var assetPath = '../static/'

exports.file = function (req,callback){
	utils.parse.request(req,function(err,fields){
		var path = fields.path || ''
		// 消除参数中首尾的｛/｝
		path = path.replace(/^\/|\/$/g,'')
		if(err || path.length == 1){
			callback && callback('参数不完整')
		}else{
			var Path = assetPath + path
			fs.unlink(Path,function(err){
				if(err){
					callback && callback(err)
				}else{
					callback && callback(null)
				}
			})
		}
	})
}