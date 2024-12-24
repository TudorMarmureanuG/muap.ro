let lDistance = [];
let preO = [];
let inO = [];
let mainHeight = 10;
let fNode = null;
let level = 0;

class Node {
    constructor(data) {
        this.data = Number.parseInt(data);
        this.left = null;
        this.right = null;
        this.ld = 0;
        this.height = 50;
        this.stepStr = [];
    }

    printIn(n) {
        if (n.left !== null) {
            this.printIn(n.left);
        }
        console.log(n.data);
        if (n.right !== null) {
            this.printIn(n.right);
        }
    }

    printPre(n) {
        console.log(n.data);
        if (n.left !== null) {
            this.printPre(n.left);
        }
        if (n.right !== null) {
            this.printPre(n.right);
        }
    }
}

class TreeFromTraversal {
    constructor(givenPre, givenIn) {
        this.preOrder = givenPre;
        this.inOrder = givenIn;
        this.root = null;
    }

    create() {
        let n = new Node(this.preOrder[0]);

        this.root = n;
        let save = n, i = 0;

        for (i = 1; i < this.preOrder.length; i++) {
            save = n;
            let node = new Node(this.preOrder[i]);

            while (true) {
                if (this.preOrder[i] < save.data && save.left !== null) {
                    save = save.left;
                }
                else if (this.preOrder[i] < save.data && save.left === null) {
                    save.left = node;
                    break;
                }
                else if (this.preOrder[i] > save.data && save.right !== null) {
                    save = save.right;
                }
                else if (this.preOrder[i] > save.data && save.right === null) {
                    save.right = node;
                    break;
                }
                console.log("while ni bar");
            }

            console.log("Its " + i);
        }
        console.log("Tree createddd");
        return n;
    }



    maxLevel(node) {
        if (node === null) {
            return -1;
        }
        let left = this.getMax(node.left);
        let right = this.getMax(node.right);

        console.log(left);
        console.log(right);

        return Math.max(left, right) + 1;
    }

    getMax(node) {
        if (node === null) {
            return -1;
        }

        let leftLength = Number.parseInt(this.getMax(node.left));
        let rightLength = Number.parseInt(this.getMax(node.right));

        return Math.max(leftLength, rightLength) + 1;
    }

}

toggBST = document.getElementById('toggBST');

toggBST.addEventListener('click', () => {
    toggBST.style.backgroundColor = "rgb(0, 218, 150)";
    toggBST.style.color = "rgb(20, 27, 53)";

    let inputIn = document.getElementById("inOrderInput").value;
    let inputOther = document.getElementById("otherInput").value;

    if (inputIn == "" && inputOther == "") {
        popup(false,"The Box is Empty!");
        fNode = null;
        toggBST.style.backgroundColor = "rgb(20, 27, 53)";
        toggBST.style.color = "rgb(0, 218, 150)";
        return;
    }

    if (fNode !== null) {
        if (confirm('Are u sure to make new tree from given traversals')) {
            mainHeight = 10;
            fNode = null;
            clearRect();
            makeNew();
        }
    }
    else {
        makeNew();
    }
})

function makeNew() {
    let inputIn = document.getElementById("inOrderInput").value;
    let inputOther = document.getElementById("otherInput").value;

    inO = inputIn.split(' ');
    preO = inputOther.split(' ');

    if (document.getElementById('selectOrder').value == 'Postorder') {
        preO = preO.reverse();
    }

    console.log(preO);
    console.log(inO);

    for (i = 0; i < preO.length; i++) {
        preO[i] = Number.parseInt(preO[i]);
    }

    for (i = 0; i < inO.length; i++) {
        inO[i] = Number.parseInt(inO[i]);
    }

    console.log(preO);
    console.log(inO);

    let tree = new TreeFromTraversal(preO, inO);

    fNode = tree.create();
    setLeftDistance(preO);
    setNodeLD(fNode);
    setNodeHeight();

    level = tree.maxLevel(fNode) + 1;
    console.log(level);

    fNode.printPre(fNode);

    atheGathe();

    toggBST.style.backgroundColor = "rgb(20, 27, 53)";
    toggBST.style.color = "rgb(0, 218, 150)";
}

function setLeftDistance(a) {
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

    console.log("Set left distance ni barr");
}

function setNodeLD(root) {
    for (i = 0; i < preO.length; i++) {
        n = root;
        console.log(preO[i]);

        while (n.data != preO[i]) {
            console.log(n.data);
            if (preO[i] < n.data) {
                n = n.left;
                console.log("It's left");
                console.log();
            }
            else if (preO[i] > n.data) {
                n = n.right;
                console.log("It's right");
                console.log();
            }
            if (n === null) {
                break;
            }
        }

        n.ld = lDistance[i];
    }

    console.log("Set Node ld ni bar");
}

function setNodeHeight() {
    console.log("Called");
    for (let i = 0; i < preO.length; i++) {
        let h = 50;
        let save = fNode;

        while (true) {
            if (preO[i] == save.data) {
                save.height = h;
                console.log(save.data + " " + save.height);
                break;
            } else if (preO[i] < save.data) {
                save = save.left;
                h += 50;
            } else if (preO[i] > save.data) {
                save = save.right;
                h += 50;
            }
        }
    }
}

function atheGathe() {
    const draw = document.getElementById("myBstCanvas");
    const ctx = draw.getContext("2d");
    clearRect();
    ctx.font = "18px Roman";

    let count = 1, i = 1, tempNode = fNode, leftM = [], rightM = [];

    while (count <= level) {
        save = fNode;

        leftM = [0, inO.indexOf(tempNode.data) - 1];
        rightM = [inO.indexOf(tempNode.data) + 1, inO.length - 1];

        drawNode(tempNode, tempNode, 1, 0, leftM, rightM);

        mainHeight += 50 * (count + 3);
        count++;
    }


    function drawNode(save, pred, num, d, leftArr, rightArr) {

        if (num == 1) {
            ctx.fillText("Step - " + count, 20, save.height + mainHeight - 10);
        }

        ctx.beginPath();
        ctx.arc(save.ld, save.height + mainHeight, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText(save.data, save.ld - 6, save.height + mainHeight);

        if (num != 1) {
            ctx.beginPath();
            if (d == -1) {
                ctx.moveTo(pred.ld - 15, save.height + mainHeight - 35);
                ctx.lineTo(save.ld + 17, save.height + mainHeight - 10);
            } else {
                ctx.moveTo(pred.ld + 15, save.height + mainHeight - 35);
                ctx.lineTo(save.ld - 17, save.height + mainHeight - 10);
            }
            ctx.stroke();
        }

        if (num < count) {
            if (save.left !== null) {
                drawNode(save.left, save, num + 1, -1, [leftArr[0], inO.indexOf(save.left.data) - 1], [inO.indexOf(save.left.data) + 1, inO.indexOf(save.data) - 1]);
            }
            if (save.right !== null) {
                drawNode(save.right, save, num + 1, 1, [inO.indexOf(save.data) + 1, inO.indexOf(save.right.data) - 1], [inO.indexOf(save.right.data) + 1, rightArr[1]]);
            }
        }

        if (num == count) {
            if (save.left !== null) {
                drawRect(leftArr[0], leftArr[1], save.ld - ((leftArr[1] - leftArr[0]) * 50) - 50, save.height + 50, save, -1);
            }
            if (save.right !== null) {
                drawRect(rightArr[0], rightArr[1], save.ld + 50, save.height + 50, save, 1);
            }
        }

        console.log("Completed this round - " + num);
    }

    function drawRect(start, end, ld, height, save, d) {
        let arr = [], i, j = 0, str;

        for (let i = start; i <= end; i++, j++) {
            arr[j] = inO[i];
        }

        console.log(arr);

        str = arr.join(", ");

        ctx.beginPath();
        ctx.rect(ld, height + mainHeight, arr.length * 30, 40);
        ctx.stroke();
        ctx.fillText(str, ld + 7, height + mainHeight + 25);

        ctx.beginPath();
        if (d == -1) {
            ctx.moveTo(save.ld - 15, save.height + mainHeight + 12);
            ctx.lineTo(ld + (arr.length * 15), height + mainHeight);
        } else {
            ctx.moveTo(save.ld + 15, save.height + mainHeight + 12);
            ctx.lineTo(ld + (arr.length * 15), height + mainHeight);
        }
        ctx.stroke();

    }
}

function clearRect() {
    const draw = document.getElementById("myBstCanvas");
    const ctx = draw.getContext("2d");
    ctx.clearRect(0, 0, 20000, 6000);
}

function drawTree(node, leftArr, rightArr) {
    const draw = document.getElementById("myBstCanvas");
    const ctx = draw.getContext("2d");
    let h = 0,
        inc = 20,
        d = 0;
    ctx.font = "18px Roman";

    for (let i = 0; i < arr.length; i++) {
        ctx.fillText("STEP - " + (i + 1), 5, inc);
        let save = node,
            pred = node;

        console.log(i);
        h = 10;

        for (j = 0; j <= i; j++) {
            console.log("Its drawing");
            (save = node), (pred = node);
            while (true) {
                if (arr[j] == save.data) {
                    break;
                } else if (Number.parseInt(arr[j]) < Number.parseInt(save.data)) {
                    pred = save;
                    save = save.left;
                    d = -1;
                } else if (Number.parseInt(arr[j]) > Number.parseInt(save.data)) {
                    pred = save;
                    save = save.right;
                    d = 1;
                }
                h += 50;
            }

            ctx.beginPath();
            ctx.arc(save.ld, save.height + inc, 20, 0, 2 * Math.PI);
            ctx.stroke();

            if (j != 0) {
                ctx.beginPath();
                if (d == -1) {
                    ctx.moveTo(pred.ld - 15, save.height + inc - 35);
                    ctx.lineTo(save.ld + 17, save.height + inc - 10);
                } else {
                    ctx.moveTo(pred.ld + 15, save.height + inc - 35);
                    ctx.lineTo(save.ld - 17, save.height + inc - 10);
                }
                ctx.stroke();
            }
            ctx.fillText(save.data, save.ld - 6, save.height + inc);

            h += 120;
        }

        inc = h;
    }
}
