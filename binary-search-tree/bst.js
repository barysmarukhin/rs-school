// WARNING: replace ... with your code
function Node(key, value) {
    this.key = key;
    this.value = value;

    //please don't rename left, right and root properties
    this._left = null;
    this._right = null;
}

function BinarySearchTree() {
    this._root = null;
}
BinarySearchTree.prototype.constructor = BinarySearchTree;

BinarySearchTree.prototype.root = function () {
    return this._root.value || null;
}

BinarySearchTree.prototype.insert = function () {
    const node = new Node(key, value);
    let current;
    if (!this._root) {
        this._root = node;
    } else {
        current = this._root;
        while(true) {
            if (value < current.value) {
                if(!current._left) {
                    current._left = node;
                    return false;
                } else {
                    current = current._left;
                }
            } else if (value > current.value) {
                if(!current._right) {
                    current._right = node;
                    return false;
                } else {
                    current = current._right;
                }
            } else {
                return false;
            }
        }
        return this;
    }
}

BinarySearchTree.prototype.delete = function () {

}

BinarySearchTree.prototype.search = function (key) {
    let current = this._root;
    let foundItem = false;
    while(!foundItem && current) {
        if (current.key === key) {
            foundItem = true;
        } else {
            if (key > current.key) {
                current = current._right;
            } else if (key < current.key) {
                current = current._left;
            } 
        }
    }
    return foundItem ? current.value : null;
}

BinarySearchTree.prototype.contains = function (value) {
    let current = this._root;
    let foundItem = false;
    while(!foundItem && current) {
        if (current.value === value) {
            foundItem = true;
        } else {
            if (value > current.value) {
                current = current._right;
            } else if (value < current.value) {
                current = current._left;
            } 
        }
    }
    return foundItem;
}

BinarySearchTree.prototype.traverse = function (order) {
    const result = [];
    const rootValue = this.root;
    recourseCall(rootValue);
    function recourseCall(node) {
        if (order) {
            if (node._left) {
                recourseCall(node._left);
            }
            result.push(node.value);
            if (node._right) {
                recourseCall(node._right);
            } 
        } else {
            if (node._right) {
                recourseCall(node._right);
            }
            result.push(node.value);
            if(node._left) {
                recourseCall(node._left);
            }
        }
    }
    return result;
}

BinarySearchTree.prototype.verify = function () {
    const rootValue = this._root;
    let isVerify = true;
    recourseCall(rootValue);
    function recourseCall(node) {
        if (node._left) {
            if (node._left.key < node.key) {
                recourseCall(node._left);
            } else {
                isVerify = false;
                return false;
            }
        } 
        if (node._right) {
            if(node._right.key > node.key) {
                recourseCall(node._right);
            } else {
                isVerify = false;
                return false;
            }
        } 
    }
    return isVerify;
}

// const bst = new BinarySearchTree();
// bst.prototype = Object.create(BinarySearchTree.prototype);

// You can comment this block for testing in the browser but final solution MUST contains this module.exports code
module.exports = {
  BinarySearchTree,
  student: 'https://github.com/barysmaruhin'
};
