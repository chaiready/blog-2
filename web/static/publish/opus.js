/*! bh-lay.com 2014-06-07 */
define&&define(function(a){function b(a,b){var c=a.replace(/\{(\w*)}/g,function(){return b[arguments[1]]||""});return c}function c(a,b){a||b&&b("missing arguments"),$.ajax({url:"/ajax/opus",type:"GET",data:{act:"get_detail",id:a},success:function(a){1!=a.code?b&&b("data error"):b&&b(null,a.detail)}})}function d(a,d){if(!d){var f=b(e,{});return a.html(f),void admin.formToAjax(a,{onSubmit:function(){UI.prompt("正在提交分享修改！")},onResponse:function(){UI.prompt("分享发布完毕"),admin.push("/admin/"),admin.refresh()}})}c(d,function(c,d){if(c)return void a.html("数据异常！");var f=b(e,d);a.html(f),admin.formToAjax(a,{onSubmit:function(){UI.prompt("正在提交作品修改！")},onResponse:function(){UI.prompt("作品修改完毕"),admin.push("/admin/"),admin.refresh()}})})}a("/frontEnd/publish/publish.css"),a("/frontEnd/mditor/mditor.js"),a("/frontEnd/gallery/index.js");var e=['<div class="pub_opus">','<form action="/ajax/add_edit" method="post" target="_self">','<div class="pub_row_input"><input type="text" name="title" value="{title}" placeholder="标题"/></div>','<div class="pub_row_input"><input type="text" name="work_range" value="{work_range}" placeholder="开发范围" /></div>','<div class="pub_row_input"><input type="text" name="online_url" value="{online_url}" placeholder="在线地址" /></div>','<div class="pub_row_input">','<textarea name="intro" cols="50" rows="5" placeholder="作品简介">{intro}</textarea>',"</div>",'<div class="pub_row_input">','<textarea class="mditor" name="content" cols="50" rows="10" placeholder="作品详细信息" >{content}</textarea>',"</div>",'<div class="">','<input type="text" name="cover" value="{cover}" placeholder="缩略图"/>','<input type="text" name="opus_pic" value="{opus_pic}" placeholder="作品大图" />','<input type="text" name="tags" value="{tags}" placeholder="标签" />','<input type="text" name="opus_time_create" value="{opus_time_create}" placeholder="创作时间" />',"</div>","<div>",'<input type="hidden" name="id" value="{id}" />','<input type="hidden" name="category" value="opus" />','<button type="submit" class="btn btn-primary">提交</button>',"</div>","</form>","</div>"].join("");return d});