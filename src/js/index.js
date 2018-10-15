(function() {
    var oLi = document.getElementsByTagName('li'),
        itemWidth = 200,
        page = 1,
        flag = false;

    function getData() {
        if (!flag) {
            flag = true; //加载完一次再请求
            ajax('GET', 'data.txt', addDom, 'cpage=' + page, true); //加载一次算一页
            page++;
        }
    }
    getData();

    function addDom(data) {
        var dataList = JSON.parse(data); //将json格式转换位对象
        // console.log(dataList);
        // 获取资源
        dataList.forEach(function(ele, index) {
            var oItem = document.createElement('div'), //第一层div
                oBox = document.createElement('div'), //第二层div
                oImg = new Image(), //第二层div里的img
                oP = document.createElement('p'), //第一层div里的p
                minIndex = getMinList(oLi); //最短那列

            oItem.className = 'item';
            oBox.className = 'boxsmall';

            oImg.width = itemWidth;
            oImg.Height = ele.height * itemWidth / ele.width;

            oImg.src = ele.preview;
            oP.innerText = ele.title;


            //加载失败图片去边框
            oImg.onerror = function() {
                this.style.width = '202px';
                this.style.height = ele.height / ele.width * itemWidth;
                this.style.margin = '-1px';
            }

            //按照dom结构插入
            oItem.appendChild(oBox);
            oItem.appendChild(oP);
            oBox.appendChild(oImg);
            oLi[minIndex].appendChild(oItem); //将新创建的元素插入在最短列之后
        })
        flag = false; //本次数据加载完
    }


    // 查找最短的li(列)
    function getMinList(dom) {
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
    // console.log(getMinList(oLi));

    // 判断是否滚动到底部
    window.onscroll = function() {
        // 获取最短列的高度和滚动条的高度
        var minValue = oLi[getMinList(oLi)].offsetHeight,
            scrollHeight = document.documentElement.scrollTop || document.body.scrollTop, //兼容性写法,获取垂直滚动像素值
            pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
        if (minValue < scrollHeight + pageHeight) {
            getData();
        }
    }
})()