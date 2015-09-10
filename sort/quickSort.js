/**
 * 快速排序：在数组的起点和终点设置路标，并保存起点数值为基准数，从数组终点开始路标往前遍历，如有比起点小的数则赋值给起点，
 * 赋值后反从起点路标向后遍历，如有比终点路标大的数则赋值给终点路标，然后依次进行。
 * 当起点路标和终点路标重合时则完成一次排序，把基准数赋值给两个路标重合的位置，然后以这个位置为分割，
 * 左右两边重复进行这种排序，直到每个需要排序的数组长度为1.
 */

/**
 * 快速排序快的原因：类似于二分查找，每一次排序都把数组分成两份，而且能保证左边所有数比右边小，
 * 左边数组的数不会再跟右边数组的数对比。
 */


var arr = [];
for(var i = 0 ; i<6 ; i++) arr[i] = Math.round(Math.random()*100);

console.log('init :',arr);

function quickSort(arr,start,end){
    var len = arr.length;
    /*判断初次进入*/
    if(start == undefined || end == undefined){
        start = 0;
        end = len-1;
    }
    /*如果已经是排序完的数组了。这里由于递归时传入的值影响要使用>=判断*/
    if(start >= end) return;

    /*把起点值赋值给基准数*/    
    var point = arr[start];
console.log('point',point)

    /*起点路标和终点路标*/
    var i = start;
    var j = end;

/*此次排序前的数组*/
console.log('before',arr);

    /*此次排序进行的条件，起点路标<终点路标*/
    while( i < j ){

        /*如果起点路标的值小于等于终点路标的值，则一直让终点路标向前*/
        while( i < j && point <= arr[j] ){  //如果不是<=和>=，且有相同大小元素，会死循环
            j--;
        }

        /*如果起点路标的值大于终点路标的值，或者两个路标重合*/
        arr[i] = arr[j];
        /*反让起点路标向后移动*/
        while( i< j && point >= arr[i]){
            i++;
        }

        arr[j] = arr[i];
    }

    /*此时i=j，把基准数赋值给结束位置*/
    arr[i] = point;

/*此次排序后的数组*/
console.log('after',arr);

    /*以结束位置为分割，进行递归*/
    quickSort(arr,start,i-1);
    quickSort(arr,i+1,end);

}



var start = (new Date()).getTime();
quickSort(arr);
var end = (new Date()).getTime();

console.log( 'result',arr );
console.log( 'time',end-start );
