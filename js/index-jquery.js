$(function(){
	var demo = $(".codes");
	var p = $(".codes p");
	var input = $(".codes input");
	var span = $(".codes span");
	var tip = $(".tip");
	var jj = $(".clip");
	var randomNum = function (max,min){
		var min=arguments[1] || 0;
		return Math.floor(Math.random()*(max-min)+1+min);
	};
	var ran;
	var tj = false;
	input.val(0);
	var x = input.val();
	x = 0;
	tip.html(x);
	function yanzhen(){
		input.one(
			"mousedown",function(){
				ran = randomNum(100,900);
				p.html('移动到' + (ran-10) + '-' + (ran+10) + '之间就可以提交了！');
			}
		);
	}
	yanzhen();
	input.on(
		"mousedown",function(){
			jj.css("display","block");
			input.on(
				"mousemove",function(){
					var val = input.val();
					tip.html(val);
					tip.css("left",((val/1000)*364)+"px");
					jj.css("background-color","#333");
					jj.css("clip","rect(0px,"+(((ran/1000)*(400-36))+36)+"px,36px,"+(((ran/1000)*(400-36)))+"px)");
					if (val >= ran - 10 && val <= ran + 10) {
						tip.css("background-color","#333");
						tip.addClass("on");
						input.addClass("ok");
						p.css("background-color","#333");
					}else{
						tip.css("background-color","tomato");
						tip.removeClass("on");
						input.removeClass("ok");
						p.css("background-color","tomato");
					}
				}
			);
		}
	);
	input.on(
		"mouseup",function(){
			var dangVal = input.val();
			if (dangVal >= ran - 10 && dangVal <= ran + 10){
				span.html("可以提交了！");
				span.css("display","block");
				tj = true;
				setTimeout(function(){
					demo.css("display","none");
				},1000);
			}else{
				input.defaultValue = 0;
				input.val(0);
				span.html("");
				span.css("display","none");
				jj.css("display","none");
				p.html("来！重新再来一遍");
				yanzhen();
				tj = false;
			}
		}
	);
});