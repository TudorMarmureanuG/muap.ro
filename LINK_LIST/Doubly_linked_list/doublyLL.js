let dl = null;
let row_num = 0;
let arr = [];

class DoublyLL {
    constructor(val) {
        this.head = null;
        this.data = val;
        this.lptr = null;
        this.rptr = null;
    }

    insert(val) {
        let node = new DoublyLL(val);

        if (this.head === null) {
            this.head = node;
            return;
        }

        if (val < this.head.data) {
            node.rptr = this.head;
            this.head.lptr = node;
            this.head = node;
            return;
        }

        let ptr = this.head;

        while (ptr.rptr !== null) {
            if (val > ptr.data && val <= ptr.rptr.data) {
                node.lptr = ptr;
                node.rptr = ptr.rptr;
                ptr.rptr.lptr = node;
                ptr.rptr = node;
                return;
            }
            ptr = ptr.rptr;
        }

        ptr.rptr = node;
        node.lptr = ptr;
    }

    async delete(val) {
        if (this.head === null) {
            popup(false,"can't delete from empty linkedlist");
            return;
        }

        let ptr = this.head, pred = this.head, i = 0;

        while (ptr.rptr !== null) {
            if (ptr.data == val) {
                pred.rptr = ptr.rptr;
                ptr.rptr.lptr = pred;
                ptr = null;
                await setColor(i);
                displayDLL();
                return;
            }
            pred = ptr;
            ptr = ptr.rptr;
            await setColor(i);
            i++;
        }

        if (ptr.data == val) {
            pred.rptr = null;
            ptr = null;
            await setColor(i)
            displayDLL();
            return;
        }

        displayDLL();
        popup(false,"Node not found");
    }

    async search(n) {
        let flag = false;
        let item = 0;
        let item_num = 0;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === Number.parseInt(n)) {
                await setColor(item);
                flag = true;
                displayDLL();
                break;
            }
            await setColor(item);
            item++;
        }

        if (flag == false) {
            displayDLL();
            popup(false,"Node not found in list!");
        }
    }
}

dl = new DoublyLL();

document.getElementById('btnInsert').addEventListener("click", () => {
    val = document.getElementById('insertInput');

    if (val.value != "" && val.value != NaN) {
        dl.insert(Number.parseInt(val.value));
        arr.push(Number.parseInt(val.value));
        arr.sort((a, b) => { return a - b });
        displayDLL();
        val.value = "";
    }
    else {
        popup(false,"Only Number can be inserted in list")
    }
})

document.getElementById("btnDelete").addEventListener("click", () => {
    let val = document.getElementById("deleteInput");
    dl.delete(Number.parseInt(val.value));
    arr.splice(arr.indexOf(Number.parseInt(val.value)), 1);
    val.value = "";
});

document.getElementById("btnSearch").addEventListener("click", () => {
    if (dl.head === null) {
        popup(false, "Can't search before insertion");
        return;
    }
    let val = document.getElementById("searchInput");
    dl.search(Number.parseInt(val.value));
    val.value = "";
});

async function setColor(item) {
    if (item != 0) {
        let oldchild = document.getElementById(`item${item - 1}`).children;
        oldchild[1].style.backgroundColor = "skyblue";
    }

    let newchild = document.getElementById(`item${item}`).children;
    newchild[1].style.backgroundColor = "rgb(253, 190, 215)";
    await sleep();
}

function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
}

function displayDLL() {
    let parent = document.getElementById("linked-list-container");
    parent.innerHTML = "";

    listCount = 0;
    row_num = 0;

    if (arr.length == 1) {
        parent.innerHTML += `<div class="row" id="row1"></div>`;
        let old_row = document.getElementById(`row1`);
        old_row.innerHTML += `<div class="item" id="item1"><div class="null"></div><div class="value">${arr[0]}</div><div class="null"></div></div>`

        return;
    }

    for (let i = 0; i < arr.length; i++) {
        listCount++;
        if (listCount == 1 || (listCount - 1) % 6 == 0) {
            row_num++;
            parent.innerHTML += `<div class="row" id="row${row_num}"></div>`;
        }

        let old_row = document.getElementById(`row${row_num}`);

        if (i == arr.length - 1) {
            if (row_num % 2 == 0 && listCount == 7) {
                old_row.innerHTML += `<div class="item" id="item${i}"><div class="null"></div><div class="value">${arr[i]}</div><div class="down"></div></div>`
            }
            else if (row_num % 2 == 0) {
                old_row.innerHTML += `<div class="item" id="item${i}"><div class="null"></div><div class="value">${arr[i]}</div><div class="right"></div></div>`
            }
            else if (row_num % 2 != 0 && listCount == 1) {
                old_row.innerHTML += `<div class="item" id="item${i}"><div class="down"></div><div class="value">${arr[i]}</div><div class="null"></div></div>`
            }
            else if (row_num % 2 != 0) {
                old_row.innerHTML += `<div class="item" id="item${i}"><div class="left"></div><div class="value">${arr[i]}</div><div class="null"></div></div>`
            }
        }
        else if (i == 0 && row_num == 1) {
            old_row.innerHTML += `<div class="item" id="item${i}"><div class="null"></div><div class="value">${arr[i]}</div><div class="right"></div></div>`
        }
        else if (listCount == 1) {
            old_row.innerHTML += `<div class="item" id="item${i}"><div class="down"></div><div class="value">${arr[i]}</div><div class="right"></div></div>`
        }
        else if (listCount == 6) {
            old_row.innerHTML += `<div class="item" id="item${i}"><div class="left"></div><div class="value">${arr[i]}</div><div class="up"></div></div>`
        }
        else if (listCount == 7) {
            old_row.innerHTML += `<div class="item" id="item${i}"><div class="left"></div><div class="value">${arr[i]}</div><div class="down"></div></div>`
        }
        else if (listCount == 12) {
            old_row.innerHTML += `<div class="item" id="item${i}"><div class="up"></div><div class="value">${arr[i]}</div><div class="right"></div></div>`
            listCount = 0;
        }
        else {
            old_row.innerHTML += `<div class="item" id="item${i}"><div class="left"></div><div class="value">${arr[i]}</div><div class="right"></div></div>`
        }
    }
}
