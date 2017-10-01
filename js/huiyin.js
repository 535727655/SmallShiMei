$(function(){
	var filterStrs = [',','，','。','.'];
	
	$("#generate").click(function(){
		var old_str = $("#old_str").val();
		old_str = replaceStr(old_str, filterStrs);
		generate(old_str);
	});
	
	$(".sel").on('click',function(event){
		event.select(); // 选择对象
		document.execCommand("Copy"); // 执行浏览器复制命令
		console.log("已复制好，可贴粘。");
		//mui.toast("已复制好，可贴粘。",duration: 'long',type: 'div');
	});
	
	
	function replaceStr(old_str, filter_strs){
		if(old_str != null && old_str != undefined && old_str.length > 0){
			old_str = old_str.trim();
			console.log("trim 之后的值为 "+ old_str);
		}
		if(filter_strs != null){
			$.each(filter_strs, function(i,v) {
				old_str.replace(new RegExp(v,'g'), "");
			});
			console.log("replace之后为"+old_str);
		}
		return old_str;
	}
	
	function generate(old_str){
		var newStrs=new Array();
		if(isNotNull(old_str)){
			for(i = 0; i < old_str.length; i ++) {
				var new_str = old_str.substring(i, old_str.length);
				var prefix = "";
				var len = chkstrlen(old_str.substring(0,i));
				for(j = 0; j <= len; j++){
					prefix += "  ";
				}
				new_str = prefix + new_str;
				var array_length = newStrs.push(new_str);
				console.log("生成新回音元素，当前元素数量为"+array_length);
			}
		}
		var html = "";
		var str = newStrs.toString();
		console.log("生成的回音array字符串 = "+str);
		str = str.replace(new RegExp(',','g'),"\n");
		console.log("replace之后的回音array字符串 = "+str);
		$("#new_str").val(str);
		for(i = 0; i < newStrs.length; i++){
			html += '<li class="mui-table-view-cell sel">'+newStrs[i]+'</li>';
		}
		$("#sel_str").html(html);
	}
	
	function isNotNull(old_str){
		if(old_str != null && old_str != undefined && old_str.length > 0){
			return true;	
		}
		return false;
	}
	
	
	//根据是否汉字返回字符数
	　function chkstrlen(str){
	　　　　var strlen = 0;
	　　　　for(var i = 0;i < str.length; i++) {
	　　　　　　if(str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
	　　　　　　　　strlen += 2;
	　　　　　　else  
	　　　　　　　　strlen++;
	　　　　}
	　　　　return strlen;
　　	}
	
})