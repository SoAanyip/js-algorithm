/**
 * 堆排序
 * 堆排序基于完全二叉树。完全二叉树：除了最后一层可以不满，其它层必须都满节点、
 * 完全二叉树一般用数组表示，第一个节点记为1.
 * 堆：根据排列方式（从小到大），树中任何一个非叶子节点的值均不大于其左右孩子（如有）的值（反之亦然）
 * [10,15,56,25,30,70]满足
 * 
 *  --               10(1)
 *  --       15(2)           56(3)      
 *  --  25(4)   30(5)     70(6) 
 *
 * Math.floor(i/2)为父节点，2*i 2*i+1为子节点（如有）
 *
 * 解决经典问题：一个长度为n的乱序数组中找出最大的m个数
 */

var arr=[];
for(var i = 0 ; i<10 ; i++) arr[i] = Math.round(Math.random()*100);

function heapSort(arr){
    console.log('init',arr);

    var len = arr.length,i;


    /*进行首轮排序，此时（如果想要从小到大排列）最大值在首位，作为大根堆*/
    for( i = Math.floor(len/2)-1 ; i>=0  ; --i ){
        heapAdjust(i,len)
    }
    console.log('first sort',arr,'\n');

    /*进行排序。每一次排序前把首位跟末位数据交换，然后按照大根堆进行排序。排序过后由于堆顶的数最大，*/
    /*下一轮把首位跟末位交换时最大的数就会在末位，进入有序区。然后数组长度减一，继续作为无序区。*/
    for( i = len-1 ; i>0 ; --i ){
        /*利用异或交换数据*/
        arr[i] = arr[0] ^ arr[i];
        arr[0] = arr[0] ^ arr[i];
        arr[i] = arr[0] ^ arr[i];
        console.log('change',arr[0],arr[i])
        heapAdjust(0,i);
        console.log('ev',arr);

    }

    return arr;

    function heapAdjust(i,len){
        var nChild;
        /*如果一个节点跟它的子节点进行了交换，则继续对它的子节点进行判断是否可以交换*/
        for( ; 2*i+1<len ; i = nChild ){
            /*左节点*/
            nChild = 2*i+1;

            /*如果有右节点并且右节点比左节点大，则跟右节点交换*/
            if( (nChild < len-1) && (arr[nChild+1] > arr[nChild]) ) ++nChild;

            if( arr[i]<arr[nChild] ){
                arr[i] = arr[nChild] ^ arr[i];
                arr[nChild] = arr[nChild] ^ arr[i];
                arr[i] = arr[nChild] ^ arr[i];
                console.log('change',arr[nChild],arr[i])
            }else{
                break;
            }
        }
    }
}


/*找最大m个数的问题下，如果数组长度不算大，下面的方法也比较有优势*/
function cng(arr){
    var save = [],len = arr.length,j,sm;
    save.push(arr[0]);
    save.push(arr[1]);
    save.push(arr[2]);
    for(var i = 3; i<len; i++){
        sm=[0,save[0]];
        for(j = 1 ; j<3 ; j++){
            if(save[j]<sm[1]){
                sm[0]=j;
                sm[1]=arr[j];
            }
        }
        if(arr[i]>sm[1]) save[sm[0]] = arr[i];
    }
    return save;
}


var start = (new Date()).getTime();

console.log('finish heap sort',heapSort(arr));

console.log('time',(new Date()).getTime()-start);

/*start = (new Date()).getTime();
console.log('finish set',cng(arr));
console.log('time',(new Date()).getTime()-start);*/