$(function(){
	function Rem(doc,win){
		var remEle = doc.documentElement;
		var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
		function recalc(){
			var clientWidth = remEle.clientWidth;
			if(!clientWidth){return}
			if(clientWidth>=750){
				remEle.style.fontSize = '100px';
			}else{
				remEle.style.fontSize = 100*(clientWidth/403)+'px';
			}
		};
		if(!doc.addEventListener){return};
		win.addEventListener(resizeEvt,recalc,false);
		doc.addEventListener('DOMContentLoaded',recalc,false);
		recalc();
	}
	Rem(document,window);
	
	var has = location.hash.substr(1);
	console.log(has);
	$.ajax({
		type:"post",
		url:"https://api.ymduo.com/item/index",
		data:{
			"gid":has
		},
		async:true,
		success:function(res){
			console.log(res)
			var dataArr = res.result.data;
			var imgStr = "";
			$.each(dataArr.recommend, function(imgIndex,imgEle) {
				imgStr += '<div class="swiper-slide"><img src="'+imgEle.image+'"/></div>'
			});
			$(".swiper-wrapper").html(imgStr);
			$(".price span").eq(0).html("￥"+dataArr.price);
			$(".old_price").html("价格：￥"+dataArr.old_price);
			$(".msg p span").html(dataArr.goods_name);
			$(".msg div span").eq(1).html("月销："+dataArr.is_self);
			//轮播图初始化
			var mySwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal', // 垂直切换选项
			    loop: true, // 循环模式选项
//			    observer:true,
			    autoplay:true,
			    speed:1000,
			    // 如果需要分页器
			    pagination: {
			      el: '.swiper-pagination',
			    },
			    
			    // 如果需要前进后退按钮
			    navigation: {
			      nextEl: '.swiper-button-next',
			      prevEl: '.swiper-button-prev',
			    },
			    
			    // 如果需要滚动条
			    scrollbar: {
			      el: '.swiper-scrollbar',
			    },
			});
		}
	});
})
