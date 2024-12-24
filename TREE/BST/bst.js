//needed variables
let BSTleftDistance = [];
let BST = [];
var height = 50;
let strArr = "";
let fBST = null;
let isChange = false;
let strDel = [];
//back-end code of Binary tree
// Node class
class NodeCreate {
  constructor(data, data2) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.ld = data2;
    this.height = 50;
    this.stepStr = [];
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(data, data2) {
    //Creating new Node
    const newNode = new NodeCreate(data, data2);

    if (this.root === null) {
      this.root = newNode;
      newNode.stepStr.push(newNode.data + " is inserted as root node.");
    } else {
      this.insertNode(this.root, newNode);
    }
  }
  insertNode(node, newNode) {
    //go in left sub tree
    if (newNode.data < node.data) {
      newNode.stepStr.push(
        newNode.data + " is less than " + node.data + ". So go to left subtree "
      );
      if (node.left === null) {
        newNode.height += 50;
        node.left = newNode;
        newNode.stepStr.push(newNode.data + " inserted successfully");
      } else {
        newNode.height += 50;
        this.insertNode(node.left, newNode);
      }
    }
    //go in right sub tree
    else {
      newNode.stepStr.push(
        newNode.data +
        " is Greater than " +
        node.data +
        ". So go to right subtree"
      );
      if (node.right === null) {
        newNode.height += 50;
        node.right = newNode;
        newNode.stepStr.push(newNode.data + " inserted successfully");
      } else {
        newNode.height += 50;
        this.insertNode(node.right, newNode);
      }
    }
  }
  preOrder(node) {
    strArr = strArr + " " + Number.parseInt(node.data);
    if (node.left !== null) {
      this.preOrder(node.left);
    }
    if (node.right !== null) {
      this.preOrder(node.right);
    }
  }

  inOrder(node) {
    if (node.left !== null) {
      this.inOrder(node.left);
    }
    strArr = strArr + " " + Number.parseInt(node.data);
    if (node.right !== null) {
      this.inOrder(node.right);
    }
  }

  postOrder(node) {
    if (node.left !== null) {
      this.postOrder(node.left);
    }
    if (node.right !== null) {
      this.postOrder(node.right);
    }
    strArr = strArr + " " + Number.parseInt(node.data);
  }

  delete(a, node) {
    strDel = [];
    let pred = node;
    strDel.push("[Delete " + a + " From Binary Tree]");
    while (true) {
      if (a == node.data) {
        break;
      } else if (a < node.data) {
        pred = node;
        node = node.left;
      } else if (a > node.data) {
        pred = node;
        node = node.right;
      }
    }

    if (node === this.root) {
      if (node.right === null && node.left === null) {
        strDel.push("Deleted Root Node");
        this.root = null;
      } else if (node.right !== null) {
        strDel.push("Making right node " + node.right.data + " as a root Node");
        this.root = node.right;
        node = node.right;

        while (node.left !== null) {
          node = node.left;
        }

        strDel.push(
          "Link root's right tree's Leftmost node to the root node's left tree"
        );
        node.left = pred.left;
        pred.left = null;
        node = null;
      } else {
        strDel.push("Making Left node " + node.left.data + " as a root Node");
        this.root = node.left;
      }
    } else {
      if (node.left === null && node.right === null) {
        if (pred.left === node) {
          pred.left = null;
        } else {
          pred.right = null;
        }
        strDel.push("Node" + node.data + " is a leaf Node so unlink it");
      } else if (node.left === null) {
        if (pred.left === node) {
          strDel.push("Link Node " + pred.data + " to Node " + node.right.data);
          pred.left = node.right;
        } else {
          strDel.push("Link Node " + pred.data + " to Node " + node.right.data);
          pred.right = node.right;
        }
      } else if (node.right === null) {
        if (pred.left === node) {
          strDel.push("Link Node " + pred.data + " to Node " + node.left.data);
          pred.left = node.left;
        } else {
          strDel.push("Link Node " + pred.data + " to Node " + node.left.data);
          pred.right = node.left;
        }
      } else {
        let save = node;

        if (pred.right === node) {
          strDel.push("Link Node " + pred.data + " to Node " + node.right.data);
          pred.right = node.right;
        } else {
          strDel.push("Link Node " + pred.data + " to Node " + node.right.data);
          pred.left = node.right;
        }

        node = node.right;

        while (node.left !== null) {
          node = node.left;
        }
        strDel.push("Link Node" + node.data + " to Node " + save.left.data);
        node.left = save.left;

        node = null;
      }
    }
    console.log("are re aa to jo");
    console.log(strDel);
  }

  setBST(node) {
    BST.push(Number.parseInt(node.data));

    if (node.left !== null) {
      this.setBST(node.left);
    }
    if (node.right !== null) {
      this.setBST(node.right);
    }
  }

  setDistance(arr, distance) {
    for (let i = 0; i < arr.length; i++) {
      let save = this.root;

      while (true) {
        if (arr[i] == save.data) {
          save.ld = distance[i];
          break;
        } else if (Number.parseInt(arr[i]) < Number.parseInt(save.data)) {
          save = save.left;
        } else if (Number.parseInt(arr[i]) > Number.parseInt(save.data)) {
          save = save.right;
        }
      }
    }
  }

  setHeight() {
    for (let i = 0; i < BST.length; i++) {
      let h = 50;
      let save = this.root;

      while (true) {
        if (BST[i] == save.data) {
          save.height = h;
          break;
        } else if (BST[i] < save.data) {
          save = save.left;
          h += 50;
        } else if (BST[i] > save.data) {
          save = save.right;
          h += 50;
        }
      }
    }
  }
}
//creatin tree function
function CreateBinaryTree() {
  isChange = true;
  let inputvalue = document.getElementById("inputBox").value;

  if (inputvalue == "") {
    popup(false,"The Box is Empty!");
    fBST = null;
    return;
  }
  //creating new Object
  const b1 = new BinarySearchTree();
  BST = filterdata(inputvalue);
  BSTleftDistance = setLeftDistance(BST);

  for (let a = 0; a < BST.length; a++) {
    b1.insert(Number.parseInt(BST[a]), Number.parseInt(BSTleftDistance[a]));
  }
  fBST = b1;

  PrintTree(fBST.root, BST);
}

// set distance of node from left
function setLeftDistance(a) {
  let lDistance = [];
  let i, j, n;
  n = a.length;

  for (i = 0; i < n; i++) {
    lDistance[i] = 600;
  }

  for (i = 1; i < n; i++) {
    if (parseInt(a[i]) < parseInt(a[0])) {
      for (j = 0; j < i; j++) {
        if (Number.parseInt(a[j]) > Number.parseInt(a[0])) {
        } else if (Number.parseInt(a[i]) < Number.parseInt(a[j])) {
          lDistance[i] -= 50;
        } else if (Number.parseInt(a[i]) > Number.parseInt(a[j])) {
          lDistance[j] -= 50;
        }
      }
    } else {
      for (j = 0; j < i; j++) {
        if (Number.parseInt(a[j]) < Number.parseInt(a[0])) {
        } else if (Number.parseInt(a[i]) > Number.parseInt(a[j])) {
          lDistance[i] += 50;
        } else if (Number.parseInt(a[i]) < Number.parseInt(a[j])) {
          lDistance[j] += 50;
        }
      }
    }
  }

  let min = Number.parseInt(0);

  for (i = 0; i < n; i++) {
    if (lDistance[i] < min) {
      min = lDistance[i];
    }
  }
  if (min <= 0) {
    min -= 50;

    for (i = 0; i < n; i++) {
      lDistance[i] += min * -1;
    }
  }

  return lDistance;
}
