var titleLeader1 = document.getElementById("titleLeader");
var leaderLi = titleLeader1.getElementsByTagName("li");
var case1 = document.getElementById("case");
var caseLi = case1.getElementsByTagName("li");
var picture1 = document.getElementById("picture");
var pictureImg = picture1.getElementsByTagName("img");
var but1 = document.getElementById("but");
var eJsonUl = document.getElementById("jsonUl");
var jsonImg = eJsonUl.getElementsByTagName("img");
var eAClick=document.getElementById("aClick");
var einput=document.getElementById("input1");
//ajax获取
var xhr = new XMLHttpRequest();
xhr.open("get", "./json/product.json", false);
xhr.onreadystatechange = function () {
   if (xhr.readyState === 4 && xhr.status === 200) {
      var res = xhr.response;
      goodList = JSON.parse(res);
   }
}
xhr.send();
//数据渲染
var str = ``;
for (var i = 0; i < goodList.length; i++) {
   str += `<li id="jsonLi">
           <img src="./img/def.jpg" data-src="${goodList[i].img}" class="item-img">
           <p>名字：${goodList[i].title}</p>
           <p>价格：${goodList[i].price}</p>
           <p>热度：${goodList[i].hot}</p>
</li>`
}
eJsonUl.innerHTML = str;

//导航高亮效果：
for (var i = 0; i < leaderLi.length; i++) {
   leaderLi[i].onmouseover = function () {
      this.style.background = "#adadad";
   }
   leaderLi[i].onmouseout = function () {
      this.style.background = "#d0d0d0";
   }
}
//案列高亮效果：
for (var i = 0; i < caseLi.length; i++) {
   caseLi[i].index = i
   caseLi[i].onmouseover = function () {
      this.style.background = "#97cbff";
      for (var j = 0; j < caseLi.length; j++) {
         pictureImg[j].style.display = "none";
         pictureImg[this.index].style.display = "block";
      }

   }
   caseLi[i].onmouseout = function () {
      this.style.background = "#c4e1ff";
   }
}
//返回顶部
but1.onclick = function () {
   utils.win("scrollTop", 0);
}
window.onscroll = function () {
   var scrollH = utils.win("scrollTop");
   if (scrollH > 500) {
      but1.style.display = "block";
   } else {
      but1.style.display = "none";
   }
}
//懒加载渐显：
window.onscroll = function () {
   for (var i = 0; i < jsonImg.length; i++) {
      ;(function (a) {
         var imgT = utils.offset(jsonImg[i]).top;
         var scrollT = utils.win("scrollTop");//卷起

         var clientH = utils.win("clientHeight");
         console.log(imgT, scrollT, clientH)
         if (jsonImg[i].flag == true) {
            return;
         }
         if (clientH + scrollT >= imgT + 50) {
            var strImgPath = jsonImg[i].getAttribute("data-src");
            var falseImg = document.createElement("img");
            falseImg.src = strImgPath;
            falseImg.onload = function () {
               jsonImg[a].src = strImgPath;
               jsonImg[a].flag = true;
               utils.fadeIn(jsonImg[a]);
            }
         }
      })(i);
   }
}
//验证码：
eAClick.onclick=function(){
   var ary1=[];
   var ary="1234567890abcdefghigklmnopqrstuvwxyz";
   for(var i=0;i<4;i++){
    var num= Math.round(Math.random()*35);
     if(ary1.indexOf(ary[num])==-1){
     ary1.push(ary[num]);
   }else{
      i--;
   }
   }
   einput.value=ary1;
}







