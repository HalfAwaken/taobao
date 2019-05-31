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
	
	$.ajax({
		type:"post",
		url:"https://api.ymduo.com/Interface/recommendlists",
		async:true,
		success:function(res){
			var dataArr = res.result.data;
			var lumpStr = "";
			var stripStr = "";
			$.each(dataArr, function(dataIndex,dataEle) {
				lumpStr += '<li pid="'+dataEle.goods_id+'">'
								+'<img src="'+dataEle.image+'"/>'
								+'<p>'+dataEle.goods_name+'</p>'
								+'<div class="shop-price">￥'+dataEle.price+'</div>'
								+'<div class="salesVolume">'
									+'<span>月销 '+dataEle.pay_num+' 笔</span>'
									+'<span>免邮费</span>'
								+'</div>'
							+'</li>';
				stripStr += '<li pid="'+dataEle.goods_id+'">'
								+'<div class="strip-img">'
									+'<img src="'+dataEle.image+'"/>'
								+'</div>'
								+'<div class="strip-bottom">'
									+'<p>'+dataEle.goods_name+'</p>'
									+'<div class="shop-price">￥'+dataEle.price+'</div>'
									+'<div class="salesVolume">'
										+'<span>月销 '+dataEle.pay_num+' 笔</span>'
										+'<span>免邮费</span>'
									+'</div>'
								+'</div>'
							+'</li>'
			});
			$("#youlike .lump").html(lumpStr);
			$("#youlike .strip").html(stripStr);
			var showFalg = true;
			$("#classification").click(function(){
				if(showFalg){
					$("#youlike .strip").show();
					$("#youlike .lump").hide();
					showFalg = false;
				}else{
					$("#youlike .strip").hide();
					$("#youlike .lump").show();
					showFalg = true;
				}
			});
			$("#youlike ul li").click(function(){
				var pid = $(this).attr("pid");
				location.href = "commodityDatiles.html#"+pid;
			});
			//轮播图初始化
			var mySwiper = new Swiper ('.swiper-container', {
			    direction: 'horizontal', // 垂直切换选项
			    loop: true, // 循环模式选项
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