let cl = null;
let arr = [];


class CircularLL {
    constructor(n) {
        this.first = null;
        this.last = null;
        this.data = n;
        this.link = null;
    }

    insert(val) {
        let node = new CircularLL(val);

        if (this.first === null) {
            node.link = node;
            this.first = node;
            this.last = node;
            return;
        }

        if (val < this.first.data) {
            node.link = this.first;
            this.last.link = node;
            this.first = node;
            return;
        }

        if (val > this.last.data) {
            node.link = this.first;
            this.last.link = node;
            this.last = node;
            return;
        }

        let ptr = this.first;

        while (val > ptr.link.data) {
            ptr = ptr.link;
        }

        node.link = ptr.link;
        ptr.link = node;
    }

    async delete(val) {

        if (this.first === null) {
            popup(false,"can't delete from empty linkedlist");
            displayCLL();
            return;
        }

        let ptr = this.first, pred = this.first;

        while (ptr.link !== this.first) {
            if (ptr.data == val) {
                pred.link = ptr.link;
                await (this.search(val));
                arr.splice(arr.indexOf(Number.parseInt(val)), 1);
                console.log(arr);
                displayCLL();
                return;
            }
            pred = ptr;
            ptr = ptr.link;
        }

        if (ptr.data == val) {
            pred.link = this.first;
            ptr = null;
            await (this.search(val));
            arr.splice(arr.indexOf(Number.parseInt(val)), 1);
            console.log(arr);
            displayCLL();
            return;
        }

        await (this.search(val));
        popup(false,"Node not found");
    }

    async search(n) {
        let flag = false;
        let item = 0;
        let item_num = 0, oddrow = true, last = false;

        for (let i = 0; i < arr.length; i++) {
            if (i % 8 == 0 && i != 0) {
                if (oddrow == true) {
                    oddrow = false;
                }
                else {
                    oddrow = true;
                }
            }
            if (i == arr.length - 1) {
                last = true;
            }
            if (arr[i] === Number.parseInt(n)) {
                await setColor(item, oddrow, last);
                flag = true;
                displayCLL();
                break;
            }
            await setColor(item, oddrow, last);
            item++;
        }

        if (flag == false) {
            displayCLL();
            popup(false,"Node not found in list!");
        }
    }
}

cl = new CircularLL();

document.getElementById("btnInsert").addEventListener("click", () => {
    let val = document.getElementById("insertInput");
    if (val.value != "" && val.value != NaN) {
        arr.push(Number.parseInt(val.value));
        arr.sort((a, b) => { return a - b });
        cl.insert(Number.parseInt(val.value));
    }
    displayCLL();
    val.value="";
});

document.getElementById("btnDelete").addEventListener("click", () => {
    let val = document.getElementById("deleteInput");
    if (val.value != "" && val.value != NaN) {
        cl.delete(Number.parseInt(val.value));
    }
    val.value="";
});

document.getElementById("btnSearch").addEventListener("click", () => {
    if (cl.head === null) {
        popup(false, "Can't search before insertion");
        return;
    }
    let val = document.getElementById("searchInput");
    cl.search(Number.parseInt(val.value));
    val.value = "";
});

async function setColor(item, oddrow, last) {
    if (oddrow == true) {
        if ((item) % 8 == 0 && item > 8) {
            let oldchild = document.getElementById(`item${item - 1}`).children;
            oldchild[1].style.backgroundColor = "aqua";
            oldchild[0].childNodes[1].style.backgroundColor = "aqua";
        }
        else if (item != 0) {
            let oldchild = document.getElementById(`item${item - 1}`).children;
            oldchild[0].style.backgroundColor = "aqua";
            oldchild[1].childNodes[1].style.backgroundColor = "aqua";
        }
        let newchild = document.getElementById(`item${item}`).children;
        newchild[0].style.backgroundColor = "rgb(253, 190, 215)";
        newchild[1].childNodes[1].style.backgroundColor = "rgb(253, 190, 215)";
        await sleep(700);
    } else {
        if (item % 8 == 0) {
            let oldchild = document.getElementById(`item${item - 1}`).children;
            oldchild[0].style.backgroundColor = "aqua";
            oldchild[1].childNodes[1].style.backgroundColor = "aqua";
        }
        else {
            let oldchild = document.getElementById(`item${item - 1}`).children;
            oldchild[1].style.backgroundColor = "aqua";
            oldchild[0].childNodes[1].style.backgroundColor = "aqua";
        }
        if (last == true) {
            let newchild = document.getElementById(`item${item}`).children;
            console.log(newchild[0].childNodes);
            newchild[1].style.backgroundColor = "rgb(253, 190, 215)";
            newchild[0].childNodes[3].style.backgroundColor = "rgb(253, 190, 215)";
            await sleep(700);
        }
        else {
            let newchild = document.getElementById(`item${item}`).children;
            console.log(newchild[0].childNodes);
            newchild[1].style.backgroundColor = "rgb(253, 190, 215)";
            newchild[0].childNodes[1].style.backgroundColor = "rgb(253, 190, 215)";
            await sleep(700);
        }
    }
}


function sleep() {
    return new Promise((resolve) => {
        setTimeout(resolve, 800);
    });
}

function displayCLL() {
    let parent = document.getElementById("linked-list-container");
    parent.innerHTML = "";
    listCount = 0;
    row_num = 0;
    i = 0;

    if (arr.length == 1) {
        row_num++;
        parent.innerHTML += `<div class="row" id="row${row_num}"></div>`;
        let old_row = document.getElementById(`row${row_num}`);
        old_row.innerHTML += `<div class="first">
                <div class="turn"></div>
                <div class="arrow"></div>
            </div>`
        listCount++;
    }

    for (i = 0; i < arr.length - 1; i++) {
        listCount++;

        if (listCount == 1 || listCount == 9) {
            row_num++;
            parent.innerHTML += `<div class="row" id="row${row_num}"></div>`;
        }


        let old_row = document.getElementById(`row${row_num}`);

        if (i == 0) {
            old_row.innerHTML += `<div class="first">
                <div class="turn"></div>
                <div class="arrow"></div>
            </div>`
        }

        if (i != 0 && listCount == 1) {
            old_row.innerHTML += `<div class="first">
                <div class="vertical-line"></div>
                <div style="width: 50%;"></div>
            </div>`
        }

        if (listCount < 8) {
            old_row.innerHTML += `<div class="item" id="item${i}">
                <div class="value">${arr[i]}</div>
                <div class="link-horizontal">
                    <div></div>
                    <div></div>
                </div>
            </div>`
        }

        else if (listCount == 8) {
            old_row.innerHTML += `<div class="item" id="item${i}">
                <div class="value">${arr[i]}</div>
                <div class="link-vertical">
                    <div></div>
                    <div></div>
                </div>
            </div>`
        }

        else if (listCount < 16) {
            old_row.innerHTML += `<div class="item" id="item${i}">
                <div class="link-horizontal" style="rotate: 180deg;">
                    <div></div>
                    <div></div>
                </div>
                <div class="value">${arr[i]}</div>
            </div>`
        }

        else if (listCount == 16) {
            old_row.innerHTML += `<div class="item" id="item${i}">
                <div class="link-vertical">
                    <div></div>
                    <div></div>
                </div>
                <div class="value">${arr[i]}</div>
            </div>`
            old_row.innerHTML += `<div class="first">
                <div class="vertical-line"></div>
                <div style="width: 50%;"></div>
            </div>`

            listCount = 0;
        }
    }

    if (listCount == 0 || listCount == 8) {
        row_num++;
        parent.innerHTML += `<div class="row" id="row${row_num}"></div>`;
    }

    let old_row = document.getElementById(`row${row_num}`);
    if (i != 0) {
        listCount++;
    }

    if (listCount == 1 && i != 0) {
        old_row.innerHTML += `<div class="first">
                <div class="vertical-line"></div>
                <div style="width: 50%;"></div>
            </div>`
    }

    if (row_num % 2 == 0) {
        old_row.innerHTML += `<div class="item" id="item${i}">
            <div class="last-horizontal">
                <div class="extra"></div>
                <div class="last-half">
                    <div class="half-line" style="rotate: 180deg;"></div>
                </div>
            </div>
            <div class="value">${arr[i]}</div>
        </div>`
    }
    else {
        old_row.innerHTML += `<div class="item" id="item${i}">
            <div class="value">${arr[i]}</div>
            <div class="last-horizontal">
                <div class="last-half">
                    <div class="half-line"></div>
                </div>
                <div class="turn" style="-webkit-transform: scaleX(-1);
                          transform: scaleX(-1);"></div>
            </div>
        </div>`
    }

    old = listCount;
    listCount++;

    if (listCount <= 8) {
        while (listCount <= 8) {
            old_row.innerHTML += `<div class="empty"></div>`
            listCount++;
        }
        parent.innerHTML += `<div class="row" id="row${row_num + 1}"></div>`;
        old_row = document.getElementById(`row${row_num + 1}`);

        while (17 - listCount > old) {
            old_row.innerHTML += `<div class="empty"></div>`
            listCount++;
        }

        old_row.innerHTML += `<div class="turn-down">
            <div class="turn-horizontal-line"></div>
            <div class="little-turn" style="rotate: 180deg;"></div>
        </div>`

        listCount++;
    }

    if (listCount == 9) {
        parent.innerHTML += `<div class="row" id="row${row_num + 1}"></div>`;
        old_row = document.getElementById(`row${row_num + 1}`);

        old_row.innerHTML += `<div class="turn-down">
            <div class="turn-horizontal-line"></div>
            <div class="little-turn" style="rotate: 180deg;"></div>
        </div>`

        listCount++;
    }


    while (listCount <= 16) {
        old_row.innerHTML += `<div class="horizontal-line"></div>`
        listCount++;
    }

    old_row.innerHTML += `<div class="first end">
        <div class="little-turn" style="-webkit-transform: scaleX(-1);
                      transform: scaleX(-1);"></div>
        <div class="turn-horizontal-line"></div>
    </div>`
}
