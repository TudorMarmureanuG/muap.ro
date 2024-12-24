//needed variables
let sl = null;
let listCount = Number.parseInt(0);
let row_num = 0;
let arr = [];
class LinkedList {
  constructor(n) {
    this.head = null;
    this.data = n;
    this.link = null;
  }

  insert(val) {
    let node = new LinkedList(val);
    if (this.head === null) {
      this.head = node;
      arr.push(val);
      console.log(arr);
      return;
    }
    let ptr = this.head;
    while (ptr.link != null) {
      if (val > ptr.data && val < ptr.link.data) {
        node.link = ptr.link;
        ptr.link = node;
        arr.push(val);
        arr.sort(function (a, b) {
          return a - b;
        });
        console.log(arr);
        return;
      }
      ptr = ptr.link;
    }
    ptr.link = node;
    arr.push(val);
    arr.sort(function (a, b) {
      return a - b;
    });
  }

  delete(val) {
    val = Number.parseInt(val);
    if (this.head === null) {
      popup(false, "can't delete from empty linkedlist");
      return;
    }

    let ptr = this.head,
      pred = this.head;

    while (ptr.link !== null) {
      if (ptr.data === val) {
        pred.link = ptr.link;
        arr.splice(arr.indexOf(val), 1);
        console.log(arr);
        return;
      }
      pred = ptr;
      ptr = ptr.link;
    }

    if (ptr.data === val) {
      pred.link = ptr.link;
      arr.pop();
      console.log(arr);
      return;
    }
    popup(false, "Node not found");
  }

  async search(n) {
    let flag = false;
    let item = 0;
    let oddrow = true;
    let item_num = 0;
    let first = true;
    let new_row = false;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === Number.parseInt(n)) {
        await setColor(item, oddrow, "lightgreen");
        flag = true;
        displayNodes();
        break;
      }
      await setColor(item, oddrow);
      item++;
      item_num++;
      if (item_num == 1) {
        first = false;
        new_row = false;
      }
      if (item_num == 8) {
        oddrow = false;
      } else if (item_num == 16) {
        item_num = 0;
        new_row = true;
        oddrow = true;
      }
      //compare the data to find the node
    }

    if (flag == false) {
      popup(false, "Node not found in list!");
    }

    async function setColor(item, oddrow, last_color) {
      if (oddrow == true) {
        if (item != 0 && new_row == true) {
          let oldchild = document.getElementById(`item${item - 1}`).children;
          oldchild[1].style.backgroundColor = "aqua";
          oldchild[0].childNodes[0].style.backgroundColor = "aqua";
        } else if (item != 0 && first == false) {
          let oldchild = document.getElementById(`item${item - 1}`).children;
          oldchild[0].style.backgroundColor = "aqua";
          oldchild[1].childNodes[0].style.backgroundColor = "aqua";
        }
        let newchild = document.getElementById(`item${item}`).children;
        newchild[0].style.backgroundColor = last_color ?? "red";
        newchild[1].childNodes[0].style.backgroundColor = last_color ?? "red";
        await sleep(700);
        if (last_color != null) {
          await sleep(1100);
        }
      } else {
        if (item % 8 == 0) {
          let oldchild = document.getElementById(`item${item - 1}`).children;
          oldchild[0].style.backgroundColor = "aqua";
          oldchild[1].childNodes[0].style.backgroundColor = "aqua";
        } else {
          let oldchild = document.getElementById(`item${item - 1}`).children;
          oldchild[1].style.backgroundColor = "aqua";
          oldchild[0].childNodes[0].style.backgroundColor = "aqua";
        }
        let newchild = document.getElementById(`item${item}`).children;
        newchild[1].style.backgroundColor = last_color ?? "red";
        newchild[0].childNodes[0].style.backgroundColor = last_color ?? "red";
        await sleep(700);
        if (last_color != null) {
          await sleep(1000);
        }
      }
    }
    function sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }

    if (oddrow == true) {
      if (item != 0 && new_row == true) {
        let oldchild = document.getElementById(`item${item - 1}`).children;
        oldchild[1].style.backgroundColor = "aqua";
        oldchild[0].childNodes[0].style.backgroundColor = "aqua";
      } else if (item != 0 && first == false) {
        let oldchild = document.getElementById(`item${item - 1}`).children;
        oldchild[0].style.backgroundColor = "aqua";
        oldchild[1].childNodes[0].style.backgroundColor = "aqua";
      }
    }
    else {
      if (item % 8 == 0) {
        let oldchild = document.getElementById(`item${item - 1}`).children;
        oldchild[0].style.backgroundColor = "aqua";
        oldchild[1].childNodes[0].style.backgroundColor = "aqua";
      } else {
        let oldchild = document.getElementById(`item${item - 1}`).children;
        oldchild[1].style.backgroundColor = "aqua";
        oldchild[0].childNodes[0].style.backgroundColor = "aqua";
      }
    }

    // let oldchild = document.getElementById(`item${item - 1}`).children;
    // oldchild[0].style.backgroundColor = "aqua";
    // oldchild[1].childNodes[0].style.backgroundColor = "aqua";
  }
}
sl = new LinkedList();
//clicking event
document.getElementById("btnSearch").addEventListener("click", () => {
  if (sl.head === null) {
    popup(false, "Can't search before insertion");
    return;
  }
  let val = document.getElementById("searchInput").value;
  sl.search(Number.parseInt(val));
  val = "";
});
document.getElementById("btnInsert").addEventListener("click", () => {
  let val = document.getElementById("insertInput");
  if (val.value != "" && val.value != NaN) {
    sl.insert(Number.parseInt(val.value));
  }
  // val.value = "";
  displayNodes();
});
document.getElementById("btnDelete").addEventListener("click", () => {
  let val = document.getElementById("deleteInput");
  sl.delete(Number.parseInt(val.value));
  displayNodes();
  val.value = "";
});

function displayNodes() {
  let parent = document.getElementById("linked-list-container");
  parent.innerHTML = "";
  listCount = 0;
  row_num = 0;
  for (let a = 0; a < arr.length; a++) {
    listCount++;
    if (listCount == 1 || listCount == 9) {
      row_num++;
      parent.innerHTML += `<div class="row" id="row${row_num}"></div>`;
    }
    if (a == arr.length - 1) {
      if (row_num % 2 == 1) {
        let old_row = document.getElementById(`row${row_num}`);
        old_row.innerHTML += `<div class="item" id="item${a}"><div class="value">${arr[a]}</div><div class="null"><div></div></div><div>`;
      } else {
        let old_row = document.getElementById(`row${row_num}`);
        old_row.innerHTML += `<div class="item" id="item${a}"><div class="null"><div></div></div><div class="value">${arr[a]}</div></div>`;
      }
    } else if (listCount > 0 && listCount <= 7) {
      let old_row = document.getElementById(`row${row_num}`);
      old_row.innerHTML += `<div class="item" id="item${a}"><div class="value">${arr[a]}</div><div class="link-horizontal"><div></div><div></div></div></div>`;
    } else if (listCount == 8) {
      let old_row = document.getElementById(`row${row_num}`);
      old_row.innerHTML += `<div class="item" id="item${a}"><div class="value">${arr[a]}</div><div class="link-vertical"><div></div><div></div></div><div>`;
    } else if (listCount > 8 && listCount <= 15) {
      let old_row = document.getElementById(`row${row_num}`);
      old_row.innerHTML += `<div class="item" id="item${a}"><div class="link-horizontal" style="rotate: 180deg;"><div></div><div></div></div><div class="value">${arr[a]}</div><div>`;
    } else if (listCount == 16) {
      let old_row = document.getElementById(`row${row_num}`);
      old_row.innerHTML += `<div class="item" id="item${a}"><div class="link-vertical"><div></div><div></div></div><div class="value">${arr[a]}</div></div>`;
      listCount = 0;
    }
  }
}
