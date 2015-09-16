/**
 * 反转二叉树
 *
 * 将二叉树及其子树进行镜像
 * before       1
 *           2     3
 *         4   5  6  7
 * after
 *              1
 *           3     2
 *         7   6  5  4
 *
 * 写了纯数组转换的方法，以及构造对象再转换的方法。后者速度远快于前者。
 */


var treeArr = [];
var nodeArr = [];
for(var i = 1; i<21;i++){
    treeArr.push(i);
    nodeArr.push(i);
}

/*Tree node对象*/
function Tree(value,pNode){
    this.value = value;
    this.parent = pNode;
    this.leftChild = undefined;
    this.rightChild = undefined;
}

/*为了方便打印的转成数组的方法。队列原理*/
Tree.prototype.toArray = function(){
    var arr = [],
        queue = [];
    arr.push(this.value);
    /*如果二叉树只有一个节点*/
    if(!this.leftChild && !this.rightChild) return arr;

    /*把左右节点顺序入队*/
    queue.push(this.leftChild);
    queue.push(this.rightChild);

    while(queue.length){

        /*出队*/
        var node = queue.shift();
        /*如果是空节点*/
        if(!node) continue;
        /*把节点的值放进数组*/
        arr.push(node.value);
        /*如果没有子节点了*/
        if(!node.leftChild && !node.rightChild) continue;
        /*把当前节点的子节点入队*/
        queue.push(node.leftChild);
        queue.push(node.rightChild);
    }

    return arr;
}


/*把数组转成对象存储*/
function toTree(arr){

    var nodeArr=[],pos=0;
    /*先构造根节点*/
    var root = new Tree(arr.shift(),null);
    if(!arr.length) return root;
    /*把节点都暂存于一个数组，方便通过下标寻找*/
    nodeArr.push(root);

    childTree();

    /*递归构造子树*/
    function childTree(){
        /*当前需要添加子节点的parent，通过数组下标寻找*/
        var parent = nodeArr[pos];
        /*如果这个父节点已经满员了*/
        if(parent.leftChild && parent.rightChild) parent = nodeArr[++pos];
        /*构造新节点*/
        var node = new Tree(arr.shift(),parent);
        /*把父节点的指针指向子节点*/
        parent.leftChild ? parent.rightChild = node : parent.leftChild = node;

        nodeArr.push(node);
        /*递归*/
        arr.length && childTree();
    }

    /*清空暂存数组*/
    nodeArr = null;

    return root;
}


/*进行反转*/
function invert(tree){
    /*判断是数组反转还是对象反转*/
    if(Object.prototype.toString.call(tree).slice(8,-1) == 'Array'){
        return invertArray(tree);
    }else{
        return invertNode(tree);
    }
    
    /*直接对数组反转方法*/
    /*由于反转二叉树相当于对二叉树进行镜像，所以直接对二叉树每一层进行镜像交换即可*/
    function invertArray(arr){
        /*len用于判断层级，即使交换中发生长度改变也不影响层级*/
        var len = arr.length,
            n = 1,    //层级
            last = Math.pow(2,n-1)-1,   //当前层级第一个节点
            next = Math.pow(2,n)-2,    //当前层级最后一个节点
            tmp;

        /*如果当前层级有有节点*/
        while( last<len ){
            /*让last跟next所指的值交换，然后两个指针向中间靠近直到交换完为止*/
            while( last < next ){
                tmp = arr[last];
                arr[last] = arr[next];
                arr[next] = tmp;
                ++last;
                --next;
            }
            /*移动到下一层级*/
            ++n;
            last = Math.pow(2,n-1)-1;
            next = Math.pow(2,n)-2;
        }
        return arr;
    }


    /*对象的交换方法，递归完成即可*/
    function invertNode(node){
        if( !node || (!node.leftChild && !node.rightChild) ) return;
        var tmp = node.leftChild;
        node.leftChild = node.rightChild;
        node.rightChild = tmp;

        invertNode(node.leftChild);
        invertNode(node.rightChild);

        return node;
    }

}


var root = toTree(nodeArr);

console.log(invert(treeArr).toString());
console.log(invert(root).toArray());