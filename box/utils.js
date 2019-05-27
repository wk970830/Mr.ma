var utils = (function () {
    // 类数组转数组，
    // 参数 likeAry  类数组
    function toArray(likeAry) {
        var newAry = [];
        try {
            newAry = Array.prototype.slice.call(likeAry)
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                newAry.push(obj[i]);
            }
        }
    }
    // 获取、设置浏览器窗口得某个属性
    // 只有一个实参，获取窗口得某个属性
    // 两个参数，表示设置
    function win(attr, val) {
        if (attr && val === undefined) {
            // 对象得属性名，如果是变量，只能用中括号去使用
            return document.documentElement[attr] || document.body[attr];
        } else {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
    }

    // 获取元素距离body的偏移量
    function offset(ele) {
        var obj = {
            left: ele.offsetLeft,
            top: ele.offsetTop
        };
        var oParent = ele.offsetParent;
        // 如果父级参照物不是body
        while (oParent !== null) {
            // 将父级参照物的左偏移量和左border加到 obj的left值上
            obj.left += (oParent.offsetLeft + oParent.clientLeft);
            // 将父级参照物的上偏移量和上border加到 obj的left值上
            obj.top += (oParent.offsetTop + oParent.clientTop);
            // 取父级参照物的父级参照物，重新判断
            oParent = oParent.offsetParent;
        }
        return obj
    };

    // 获取元素设置的样式，既兼容ie又兼容谷歌
    function getCss(ele, attr) {
        // 1、首先试一下getComputedStyle()能不能用
        // 2、不能用使用currentStyle
        // 3、width、height、marginLeft、marginTop、left、top、opacity...如果获取的是这些属性，将属性值转成数字
        var res = null;

        try {
            res = getComputedStyle(ele)[attr]
        } catch (e) {
            res = ele.currentStyle[attr]
        }

        if (/width|height|opacity|left|top|bottom|right|marginLeft|marginTop|marginRight|marginBottom/.test(attr)) {
            res = parseFloat(res)
        }
        return res;
    };

    // 设置css样式：
    function setCss(ele, attr, val){
        // 判断设置的属性是下面这些属性，并且值val没有单位需要给val拼接px
        if(/width|height|left|top|bottom|right|marginLeft|marginTop|marginRight|marginBottom/.test(attr)){
            if(Number(val)){
                val += "px"
            }
        }
        ele.style[attr] = val;
    };

    function lazyLoad(ele){
        // 1、获取卷起的高度 + 浏览器可视区域高度
        // 2、获取当前图片的高度 + 图片距离body的上偏移量
        var nWinT = utils.win("scrollTop");
        var nWinH = utils.win("clientHeight");
        var nPicH = ele.clientHeight;
        var nPicT = utils.offset(ele).top;

        // 判断图片加载的标志，如果有load属性，return
        if(ele.load){
            return;
        }
        if (nWinT + nWinH >= nPicH + nPicT) {
            // 条件成立，表示图片已经完全进入可视区域
            var strImgPath = ele.getAttribute("data-src");
            // 替换真是路径之前需要先把真是路径的图片请求回来（能请求回来就表示没问题）
            var eImg = document.createElement("img"); // var eImg = new Image()
            // 不管图片有没有放到页面中，只要图片的src属性等于某个路径时，他就会请求图片
            eImg.src = strImgPath;

            // 图片加载完成
            eImg.onload = function () {
                // 一旦图片加载完成就会触发onload事件，表示图片加载完成
                ele.src = strImgPath;
                // 一旦图片加载完成给图片添加load属性为true
                ele.load = true;
                fadeIn(ele);
            }
        }
    }

    // 渐显动画
    function fadeIn(ele) {
        // 渐显
        var nOpacity = .5;
        // 让当前图片的透明度变成0.3；
        ele.style.opacity = nOpacity;
        var timer = setInterval(function () {
            nOpacity += .05;
            ele.style.opacity = nOpacity;
            if (nOpacity >= 1) {
                ele.style.opacity = 1;
                clearInterval(timer)
            }
        }, 30);
    }
    // 在es6中设置对象时，属性名盒属性值如果相等，可以把属性值和冒号一块省略
    return {
        toArray: toArray,
        win: win,
        offset: offset,
        getCss: getCss,
        setCss: setCss,
        lazyLoad: lazyLoad
    }
})();
