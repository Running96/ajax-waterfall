(function () {
	var oLi = document.getElementsByTagName('li'),
		itemWidth = 200,
		page = 1,
		flag = false;
	function getData(){
		if (!flag) {
			flag =true;
			ajax('GET', 'data.txt', addDom, 'cpage=' + page, true);
			page++;
		}
	}
	getData();
	function addDom(data) {
		var dataList = JSON.parse(data);
		// console.log(dataList);
		// 获取资源
		dataList.forEach(function (ele,index){
			var oItem = document.createElement('div'),
			    oImg = new Image(),
			    oP = document.createElement('p'),
			    minIndex = getMinList(oLi),
			    oBox = document.createElement('div');

			oItem.className = 'item';
			oBox.className = 'box';

			oImg.width = itemWidth;
			oImg.Height = ele.height/ele.width * itemWidth;

			oImg.src = ele.preview;
			oP.innerText = ele.title;


			//加载失败图片去边框
			oImg.onerror = function(){
				this.style.width = '202px';
                this.style.height = ele.height/ele.width * itemWidth;
                this.style.margin = '-1px';
			}
			oItem.appendChild(oImg);
			oItem.appendChild(oP);
			oItem.appendChild(oBox);
			oLi[minIndex].appendChild(oItem);
		})
		flag = false; //本次数据加载完
	}
	// 查找最短的那列
	function getMinList(dom){
		var minHeight = dom[0].offsetHeight,
		    index = 0;
		for (var i = 1; i < dom.length; i++) {
			 var h = dom[i].offsetHeight;
			 if (h < minHeight) {
			 	minHeight = h;
			 	index = i;
			 }
		}
		return index;
	}
	// 判断是否滚动到底部
	window.onscroll = function() {
		// 获取最短列的高度和滚动条的高度
		var minValue = oLi[getMinList(oLi)].offsetHeight,
		    scrollHeight = document.documentElement.scrollTop || document.body.scrollTop,//兼容性写法
		    pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
		if (minValue < scrollHeight + pageHeight) {
			getData();
		}
	}
})()