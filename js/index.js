var p = document.getElementsByTagName("p")[0];
var clip = document.getElementsByClassName("clip")[0];
var tip = document.getElementsByClassName("tip")[0];
var input = document.getElementsByTagName("input")[0];
var span = document.getElementsByTagName("span")[0];
var obj = {
	p:p,
	clip:clip,
	tip:tip,
	input:input,
	span:span
};

function Demo(){
	this.sub = false;//是否可提交
	this.val = 0;//当前值
	this.pht = "拖动验证";//p默认的文字
	this.nocol = "tomato";//错的颜色,考虑小角不能用原生js改变背景色就先不用这个
	this.okcol = "skyblue";//对的颜色,考虑小角不能用原生js改变背景色就先不用这个
	this.setTime = 5;//拖动成功后几秒有效
	this.low = 0;//随机的最小值
	this.high = 1000;//随机的最大值
	this.ran = 0;//每次点击获取的随机值
	this.bias = 10;//可接受的误差值
	this.random = function (max,min){
		var min=arguments[1] || 0;
		return Math.floor(Math.random()*(max-min)+1+min);
	};//随机数方法
}
Demo.prototype.down = function(obj){
	var self = this;
	obj.input.addEventListener("mousedown",function(){
		self.ran = self.random(self.low,self.high);
		obj.p.innerHTML = "拖动到"+(self.ran-self.bias)+"与"+(self.ran+self.bias)+"之间";
		obj.clip.style.display="block";
		//obj.clip.style.backgroundColor=self.okcol;
		obj.clip.style.backgroundColor="skyblue";
		obj.clip.style.clip="rect(0px,"+(((self.ran/1000)*(400-36))+36)+"px,36px,"+(((self.ran/1000)*(400-36)))+"px)";
		self.move(obj);
	},false);

	obj.input.addEventListener("touchstart",function(){
		self.ran = self.random(self.low,self.high);
		obj.p.innerHTML = "拖动到"+(self.ran-self.bias)+"与"+(self.ran+self.bias)+"之间";
		obj.clip.style.display="block";
		//obj.clip.style.backgroundColor=self.okcol;
		obj.clip.style.backgroundColor="skyblue";
		obj.clip.style.clip="rect(0px,"+(((self.ran/1000)*(400-36))+36)+"px,36px,"+(((self.ran/1000)*(400-36)))+"px)";
		self.move(obj);
	},false);
};
Demo.prototype.move = function(obj){
	var self = this;
	obj.input.addEventListener("mousemove",function(){
		self.val = obj.input.value;
		obj.tip.innerHTML = self.val;
		obj.tip.style.left = self.val/1000*364 + "px";
		if (self.val <= self.ran + self.bias && self.val >= self.ran - self.bias) {
			//obj.tip.style.backgroundColor=self.okcol;
			obj.tip.className = "tip on";
		}else{
			//obj.tip.style.backgroundColor=self.nocol;
			obj.tip.className = "tip";
		}
	},false);

	obj.input.addEventListener("touchmove",function(){
		self.val = obj.input.value;
		obj.tip.innerHTML = self.val;
		obj.tip.style.left = self.val/1000*364 + "px";
		if (self.val <= self.ran + self.bias && self.val >= self.ran - self.bias) {
			//obj.tip.style.backgroundColor=self.okcol;
			obj.tip.className = "tip on";
		}else{
			//obj.tip.style.backgroundColor=self.nocol;
			obj.tip.className = "tip";
		}
	},false);
};
Demo.prototype.up = function(obj){
	var self = this;
	obj.input.addEventListener("mouseup",function(){
		if (self.val <= self.ran + self.bias && self.val >= self.ran - self.bias) {
			//obj.tip.style.backgroundColor = self.okcol;
			obj.tip.className = "tip on";
			obj.span.style.display = "block";
			obj.span.innerHTML = "可以提交了，"+self.setTime+"秒有效！";
			self.sub = true;
			setTimeout(function(){
				self.sub = false;
				obj.input.value = 0;
				obj.tip.innerHTML = obj.input.value;
				obj.tip.style.left = 0 + "px";
				//obj.tip.style.backgroundColor = self.nocol;
				obj.tip.className = "tip";
				obj.clip.style.display="none";
				obj.p.innerHTML = self.pht;
				obj.span.style.display = "none";
			},self.setTime*1000);
		}else{
			self.val = 0;
			obj.input.value = self.val;
			obj.tip.innerHTML = self.val;
			obj.tip.style.left = 0 + "px";
			//obj.tip.style.backgroundColor = self.nocol;
			obj.tip.className = "tip";
			obj.clip.style.display="none";
			obj.p.innerHTML = self.pht;
			setTimeout(function(){
				obj.input.value = 0;//解决firefox浏览器不自动返回到0
			},100);
		}
	});

	obj.input.addEventListener("touchend",function(){
		if (self.val <= self.ran + self.bias && self.val >= self.ran - self.bias) {
			//obj.tip.style.backgroundColor = self.okcol;
			obj.tip.className = "tip on";
			obj.span.style.display = "block";
			obj.span.innerHTML = "可以提交了，"+self.setTime+"秒有效！";
			self.sub = true;
			setTimeout(function(){
				self.sub = false;
				obj.input.value = 0;
				obj.tip.innerHTML = obj.input.value;
				obj.tip.style.left = 0 + "px";
				//obj.tip.style.backgroundColor = self.nocol;
				obj.tip.className = "tip";
				obj.clip.style.display="none";
				obj.p.innerHTML = self.pht;
				obj.span.style.display = "none";
			},self.setTime*1000);
		}else{
			self.val = 0;
			obj.input.value = self.val;
			obj.tip.innerHTML = self.val;
			obj.tip.style.left = 0 + "px";
			//obj.tip.style.backgroundColor = self.nocol;
			obj.tip.className = "tip";
			obj.clip.style.display="none";
			obj.p.innerHTML = self.pht;
			setTimeout(function(){
				obj.input.value = 0;//解决firefox浏览器不自动返回到0
			},100);
		}
	});
};

var x = new Demo();
x.down(obj);
x.up(obj);