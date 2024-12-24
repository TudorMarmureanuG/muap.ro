let HBleftDistance = [];
let AVL = [];
let fHB = null;
let isChange = false;
let strDel = [];

function BalancedTree() {
  isChange = true;
  let inputvalue = document.getElementById("inputBox").value;

  if (inputvalue == "") {
    alert("The Box is Empty!");
    fHB = null;
    return;
  }

  let nArr = [];

  nArr = filterdata(inputvalue);
  Make_HBTree(nArr);

  AVL = [];
  fHB.setAVL(fHB.root);
  HBleftDistance = setLeftDistance(AVL);
  fHB.setDistance(AVL, HBleftDistance);
}

class HBNodeCreate {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.ld = 0;
    this.height = 50;
    this.stepStr = [];
  }
}

class HBTree {
  constructor() {
    this.root = null;
  }

  HBinsert(data) {
    const newNode = new HBNodeCreate(data);
    if (this.root === null) {
      this.root = newNode;
      this.root.stepStr.push(data + " inserted successfully");
    } else {
      this.HBinsertNode(this.root, newNode);
      this.balance(newNode.data, newNode);
    }
  }

  HBinsertNode(node, newNode) {
    //go in left sub tree
    if (newNode.data < node.data) {
      newNode.stepStr.push(
        newNode.data + " is less than " + node.data + ". So go to left subtree"
      );

      if (node.left === null) {
        node.left = newNode;
        newNode.stepStr.push(newNode.data + " inserted successfully");
      } else {
        this.HBinsertNode(node.left, newNode);
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
        node.right = newNode;
        newNode.stepStr.push(newNode.data + " inserted successfully");
      } else {
        this.HBinsertNode(node.right, newNode);
      }
    }
  }

  balance(a, node) {
    let diff = 0,
      temp = 0;
    let critical = null,
      save = this.root,
      parent = null,
      fparent = null;

    while (save.data != a) {
      temp = Number.parseInt(this.difference(save));

      if (temp < -1 || temp > 1) {
        fparent = parent;
        critical = save;
        diff = temp;
      }

      if (a < save.data) {
        parent = save;
        save = save.left;
      } else if (a > save.data) {
        parent = save;
        save = save.right;
      }
    }

    if (diff < -1 || diff > 1) {
      node.stepStr.push("After insertion of " + a + " tree became unbalanced.");
      node.stepStr.push(critical.data + " became critical node");
    }

    if (diff < -1) {
      if (a > critical.right.data) {
        node.stepStr.push(
          a +
          " is inserted in " +
          critical.data +
          "'s right child's right subtree."
        );
        node.stepStr.push(
          "So leftRotation of " + critical.data + " is performed."
        );

        this.leftRotate(critical, fparent);
      } else {
        node.stepStr.push(
          a +
          " is inserted in " +
          critical.data +
          "'s right child's left subtree."
        );
        node.stepStr.push(
          "So rightRotation of " +
          critical.data +
          "'s right child is performed."
        );
        node.stepStr.push(
          "And leftRotation of " + critical.data + " is performed."
        );

        this.rightRotate(critical.right, critical);
        this.leftRotate(critical, fparent);
      }
    } else if (diff > 1) {
      if (a < critical.left.data) {
        node.stepStr.push(
          a +
          " is inserted in " +
          critical.data +
          "'s left child's left subtree."
        );
        node.stepStr.push(
          "So righttRotation of " + critical.data + " is performed."
        );

        this.rightRotate(critical, fparent);
      } else {
        node.stepStr.push(
          a +
          " is inserted in " +
          critical.data +
          "'s left child's right subtree."
        );
        node.stepStr.push(
          "So lefttRotation of " + critical.data + "'s left child is performed."
        );
        node.stepStr.push(
          "And rightRotation of " + critical.data + " is performed."
        );

        this.leftRotate(critical.left, critical);
        this.rightRotate(critical, fparent);
      }
    }
  }

  difference(node) {
    if (node === null) {
      return -1;
    }

    return this.getMax(node.left) - this.getMax(node.right);
  }

  getMax(node) {
    if (node === null) {
      return -1;
    }

    let leftLength = Number.parseInt(this.getMax(node.left));
    let rightLength = Number.parseInt(this.getMax(node.right));

    return Math.max(leftLength, rightLength) + 1;
  }

  rightRotate(node, parent) {
    if (node.data == this.root.data) {
      parent = null;
    }

    let detach = null,
      newParent;

    detach = node.left.right;
    newParent = node.left;
    newParent.right = node;
    newParent.right.left = detach;

    if (this.root.data == node.data) {
      this.root = newParent;
    } else if (newParent.data < parent.data) {
      parent.left = newParent;
    } else {
      parent.right = newParent;
    }
  }

  leftRotate(node, parent) {
    if (node.data == this.root.data) {
      parent = null;
    }

    let detach = null,
      newParent;

    detach = node.right.left;
    newParent = node.right;
    newParent.left = node;
    newParent.left.right = detach;

    if (this.root.data == node.data) {
      this.root = newParent;
    } else if (newParent.data < parent.data) {
      parent.left = newParent;
    } else {
      parent.right = newParent;
    }
  }

  HBdelete(a, node) {
    strDel = [];
    let pred = node;

    strDel.push("[Delete Node " + a + " From AVL Tree]");
    if (a == node.data) {
      strDel.push("Delete Root Node");
      if (node.left === null && node.right === null) {
        this.root = null;
        return;
      }
    }

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

    if (node.right === null) {
      if (this.root === node) {
        strDel.push(
          "Delete Root Node and Making Node " +
          node.left.data +
          " as a Root Node"
        );
        this.root = node.left;
      } else if (pred.left === node) {
        strDel.push("Change the Link For Node " + pred.data);
        pred.left = node.left;
      } else {
        strDel.push("Change the Link For Node " + pred.data);
        pred.right = node.left;
      }
    } else {
      while (true) {
        let save = node;
        pred = node;
        node = node.right;
        while (node.left !== null) {
          pred = node;
          node = node.left;
        }
        //node here is left most of right's node
        strDel.push(
          "Replace the Node " +
          save.data +
          " by its successor Node " +
          node.data
        );

        save.data = node.data;

        strDel.push("Delete the Node " + save.data);
        if (node.right === null) {
          if (pred.left === node) {
            pred.left = null;
          } else {
            pred.right = null;
          }
          break;
        }
      }
    }

    AVL = [];
    this.setAVL(this.root);

    this.balanceAfterDelete();
  }

  balanceAfterDelete() {
    while (true) {
      let l, r, critical, fparent, diff;
      critical = this.getCritical(this.root, this.root);

      if (critical === undefined) {
        break;
      }
      l = Number.parseInt(this.difference(critical.left));
      r = Number.parseInt(this.difference(critical.right));

      if (l < -1 || l > 1) {
        diff = l;
        fparent = critical;
        critical = critical.left;
        strDel.push(
          "After deletion Node " + critical.data + " became Critical Node"
        );
      } else if (r < -1 || r > 1) {
        diff = r;
        fparent = critical;
        critical = critical.right;
        strDel.push(
          "After deletion Node " + critical.data + " became Critical Node"
        );
      } else {
        diff = Number.parseInt(this.difference(critical));
        critical = this.root;
        fparent = this.root;
        strDel.push(
          "After deletion Node " + critical.data + " became Critical Node"
        );

        if (diff > 1) {
          l = Number.parseInt(this.difference(critical.left.left));
          r = Number.parseInt(this.difference(critical.left.right));
          l = Math.abs(l);
          r = Math.abs(r);

          if (critical.left.left === null) {
            l = -1;
          } else if (critical.left.right === null) {
            r = -1;
          }

          if (l < r) {
            strDel.push("There is more weight in left child's right subtree");
            if (critical.left !== null) {
              strDel.push(
                "So perform left rotation of  node " + critical.left.data
              );
            }
            strDel.push(
              "And then perform right rotation of node " + critical.data
            );
            this.leftRotate(critical.left, critical);
            this.rightRotate(critical, fparent);
          } else {
            strDel.push("There is more weight in left child's left subtree");
            strDel.push("So perform right rotation of node " + critical.data);
            this.rightRotate(critical, fparent);
          }
        } else if (diff < -1) {
          l = Number.parseInt(this.difference(critical.right.left));
          r = Number.parseInt(this.difference(critical.right.right));
          l = Math.abs(l);
          r = Math.abs(r);

          if (critical.right.left === null) {
            l = -1;
          } else if (critical.right.right === null) {
            r = -1;
          }

          if (l > r) {
            strDel.push("There is more weight in right child's left subtree");
            if (critical.right !== null) {
              strDel.push(
                "So perform right rotation of  node " + critical.right.data
              );
            }
            strDel.push(
              "And then perform left rotation of node " + critical.data
            );
            this.rightRotate(critical.right, critical);
            this.leftRotate(critical, fparent);
          } else {
            strDel.push("There is more weight in right child's right subtree");
            strDel.push("So perform left rotation of node " + critical.data);
            this.leftRotate(critical, fparent);
          }
        }

        AVL = [];
        this.setAVL(this.root);
        continue;
      }

      if (diff > 1) {
        l = Number.parseInt(this.difference(critical.left.left));
        r = Number.parseInt(this.difference(critical.left.right));
        l = Math.abs(l);
        r = Math.abs(r);

        if (critical.left.left === null) {
          l = -1;
        } else if (critical.left.right === null) {
          r = -1;
        }

        if (l < r) {
          strDel.push("There is more weight in left child's right subtree");
          if (critical.left !== null) {
            strDel.push(
              "So perform left rotation of  node " + critical.left.data
            );
          }
          strDel.push(
            "And then perform right rotation of node " + critical.data
          );
          this.leftRotate(critical.left, critical);
          this.rightRotate(critical, fparent);
        } else {
          strDel.push("There is more weight in left child's left subtree");
          strDel.push("So perform right rotation of node " + critical.data);
          this.rightRotate(critical, fparent);
        }
      } else if (diff < -1) {
        l = Number.parseInt(this.difference(critical.right.left));
        r = Number.parseInt(this.difference(critical.right.right));
        l = Math.abs(l);
        r = Math.abs(r);

        if (critical.right.left === null) {
          l = -1;
        } else if (critical.right.right === null) {
          r = -1;
        }

        if (l > r) {
          strDel.push("There is more weight in right child's left subtree");
          if (critical.right !== null) {
            strDel.push(
              "So perform right rotation of  node " + critical.right.data
            );
          }
          strDel.push(
            "And then perform left rotation of node " + critical.data
          );
          this.rightRotate(critical.right, critical);
          this.leftRotate(critical, fparent);
        } else {
          strDel.push("There is more weight in right child's right subtree");
          strDel.push("So perform left rotation of node " + critical.data);
          this.leftRotate(critical, fparent);
        }
      }

      AVL = [];
      this.setAVL(this.root);
    }
  }

  getCritical(node, parent) {
    let diff, lcritical, rcritical;

    diff = Number.parseInt(this.difference(node));

    if (node.left !== null) {
      lcritical = this.getCritical(node.left, node);
    }
    if (node.right !== null) {
      rcritical = this.getCritical(node.right, node);
    }
    if (lcritical !== undefined) {
      return lcritical;
    } else if (rcritical !== undefined) {
      return rcritical;
    }
    if (diff < -1 || diff > 1) {
      return parent;
    }

    return rcritical;
  }

  setAVL(node) {
    if (node === null) {
      return;
    }
    AVL.push(Number.parseInt(node.data));

    if (node.left !== null) {
      this.setAVL(node.left);
    }
    if (node.right !== null) {
      this.setAVL(node.right);
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
    for (let i = 0; i < AVL.length; i++) {
      let h = 50;
      let save = this.root;

      while (true) {
        if (AVL[i] == save.data) {
          save.height = h;
          break;
        } else if (AVL[i] < save.data) {
          save = save.left;
          h += 50;
        } else if (AVL[i] > save.data) {
          save = save.right;
          h += 50;
        }
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
}

function Make_HBTree(arr) {
  const HB = new HBTree();
  current = 20;

  const draw = document.getElementById("myAvlCanvas");
  const ctx = draw.getContext("2d");
  ctx.clearRect(0, 0, 20000, 6000);

  for (let i = 0; i < arr.length; i++) {
    HB.HBinsert(Number.parseInt(arr[i]));

    PrintHB(HB, arr[i], i);
  }

  fHB = HB;
}
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

function printPre() {
  strArr = "";
  fHB.preOrder(fHB.root);
  popup(true,strArr);
  strArr = "";
}

function printIn() {
  strArr = "";
  fHB.inOrder(fHB.root);
  popup(true,strArr);
  strArr = "";
}

function printPost() {
  strArr = "";
  fHB.postOrder(fHB.root);
  popup(true,strArr);
  strArr = "";
}
