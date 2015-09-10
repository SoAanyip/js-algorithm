/*二分查找：从数组中间开始找，比较中值和待查数的大小，如小则从此次查找分成两边的数组左边递归，反之则从右边。*/

var arr = [];
for(var i = 0 ; i<180 ; i++) arr[i] = i*2;


function bisearch(arr,num,low,high){
    var len = arr.length;
    /*首次进入的检测*/
    if(low == undefined || high == undefined){
        if(Object.prototype.toString.call(arr).slice(8,-1) != 'Array' || !len || !num || num>arr[len-1] || num<arr[0]) return false;
        low = 0;
        high = len-1;
    }
    /*如果数组长度剩下2以下*/
    if(high-low == 0){
        return arr[low] == num ? num : false;
    }else if(high-low == 1){
        return arr[low] == num ? num : (arr[high] == num ? num : false)
    }
    
    //找中间位置，floor处理.5
    var mid = Math.floor((high+low)/2);

console.log('mid',mid,'low',low,'high',high,'arr[mid]',arr[mid]);
    //代表找到
    if(arr[mid] == num) return mid;

    //比较大小查找
    return arr[mid] > num ? bisearch(arr,num,low,mid) : bisearch(arr,num,mid,high)
}



var start = (new Date()).getTime();
var a = bisearch(arr,199);
var end = (new Date()).getTime();
console.log( 'result',a );
console.log( 'time',end-start );
