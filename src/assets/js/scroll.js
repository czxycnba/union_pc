
export const scroll={

  scrollTopBar(){
    let long=200;

    let box = document.getElementById('root'); //外面的容器。
    let listBox = document.getElementById('list'); //ul列表。主要是移动它的left值
    let list = document.getElementsByClassName('ivu-tag');//所有列表元素
    let width = box.clientWidth /4*3;  //为了判断是左滑还是右滑
    let totalWidth = 0;
    for(let i=0;i<list.length;i++){
      totalWidth = totalWidth + list[i].offsetWidth; //所有列表元素的总宽度
    }
    for(let i=0;i<list.length;i++){
      let _offset = totalWidth - box.clientWidth; //右边的偏移量

      list[i].addEventListener('click', function (e) {

        /*for(let j=0;j<list.length;j++){
         list[j].className = 'off ivu-tag ivu-tag-default ivu-tag-closable ivu-tag-checked';  //移除所有元素的样式
        }
        list[i].className = 'on ivu-tag ivu-tag-red ivu-tag-closable ivu-tag-checked';   //给点击的元素添加样式
*/

        let offset =totalWidth - (Math.abs(listBox.offsetLeft) + box.clientWidth)+100; //右边的偏移量 = 所有元素宽度之和 - （ul容器的左偏移量 + 父容器的宽度）

        //console.log("width "+width )
        //console.log("e.pageX "+e.pageX )
        //console.log("offset "+offset )
        //console.log("listBox.offsetLeft "+listBox.offsetLeft )

        if(e.pageX > width && offset >0){  //点击右侧并且右侧的偏移量大于0，右滑。
          listBox.style.left = (listBox.offsetLeft-long) + 'px';
        }else if(e.pageX > width && offset > long){ //临界位置，，右侧滚动到末尾
          listBox.style.left = -_offset + 'px';
        }
        if(e.pageX < width && listBox.offsetLeft < -200) { //点击左侧并且左侧的偏移量小于0，左滑。
          listBox.style.left = (listBox.offsetLeft + long) + 'px';

        }else if(e.pageX < width && listBox.offsetLeft < 0){ //临界位置，左侧滚到开始的位置
          listBox.style.left = 0
        }

      });

    }
  }



}
