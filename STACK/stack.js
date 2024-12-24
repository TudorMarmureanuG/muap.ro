//needed variables
let size;
let divID = 0;
let perfoming = false;
front = -1;
var b1;

//data structure of stack
class Stack {
  constructor(n) {
    this.stack = [];
    size = n;
  }

  pushStack(data) {
    if (Number.parseInt(front) < Number.parseInt(size) - 1) {
      front++;
      this.stack.push(data);
      makeDiv(data);
    } else {
      popup(false,"Stack is Overflow!");
    }
  }

  popStack() {
    if (Number.parseInt(front) >= 0) {
      front--;
      let ele = this.stack.pop();
      delDiv();
      return ele;
    } else {
      popup(false, "Stack is empty");
    }
  }

  peepStack(i) {
    if (Number.parseInt(front - i + 1) >= 0) {
      let ele = this.stack[front - i + 1];
      return ele;
    } else {
      popup(false, "Stack is underflow!");
    }
  }

  changeStack(i, data) {
    if (Number.parseInt(front - i + 1) >= 0) {
      this.stack[front - i + 1] = data;
      return data;
    } else {
      popup(false, "Stack is underflow!")
    }
  }
}
/**Clicking events start */
document.getElementById("btnSize").addEventListener("click", () => {
  let size = document.getElementById("size").value;
  if (b1 == null) {
    perfoming = false;
    document.getElementById("inner").innerHTML = "";
    if (size <= 50 && size >= 5) {
      b1 = new Stack(size);
      popup(true,"Created and empty stack with size " + size + " succeesfully");
      setSize(size);
    } else {
      popup(false,
        "can't make stack for that size.\nMake stack with less than 50 and greater than 4"
      );
    }
  } else {
    popup(false,"Stack is Aready Exist!");
    if (
      confirm("Are you sure you want to make new stack and clear all progress?")
    ) {
      b1 = null;
      front = -1;
      divID = 0;
      document.getElementById("btnSize").click();
    }
  }
});
document.getElementById("btnPush").addEventListener("click", () => {
  if (perfoming === true) {
    popup(false,"let system complete the running task.");
  } else {
    let val = document.getElementById("push").value;
    if (val != "") {
      b1.pushStack(val);
    }
    document.getElementById("push").value = "";
  }
});
document.getElementById("btnPop").addEventListener("click", () => {
  if (perfoming === true) {
    popup(false,"let system complete the running task.");
  } else {
    b1.popStack();
  }
});
document.getElementById("btnPeep").addEventListener("click", () => {
  if (perfoming === true) {
    popup(false,"let system complete the running task.");
  } else {
    let val = document.getElementById("peep").value;
    if (val != "") {
      let tmp = b1.peepStack(val);
      if (tmp != undefined) {
        findDiv(val);
      }
    }
    document.getElementById("peep").value = "";
  }
});
document.getElementById("btnChange").addEventListener("click", () => {
  if (perfoming === true) {
    popup(false,"let system complete the running task.");
  } else {
    let position = document.getElementById("position").value;
    let newval = document.getElementById("newvalue").value;
    if (position != "" && newval != "") {
      let tmp = b1.changeStack(position, newval);
      console.log(tmp);
      if (tmp != undefined) {
        changeDiv(position, newval);
      }
    }
  }
});
/**Clicking events end */

function setSize(size) {
  let outerBox = document.getElementById("outer");
  let box = document.getElementById("inner");
  outerBox.style.height = `${size * 7 + 30}vh`;
  box.style.height = `${size * 7}vh`;
  box.style.margin = "100px 2px 2px 2px";
  box.style.border = "2px solid black";
  box.style.borderRadius = "0px 0px 20px 20px";
  box.style.padding = "1px 2px 3px 2px";
}

function makeDiv(data) {
  divID++;
  let old = document.getElementById("inner");
  let x = document.createElement("div");
  x.setAttribute("class", "item");
  x.setAttribute("id", divID);
  x.innerHTML = data;
  let item_height = Number.parseInt(
    document.getElementById("inner").clientHeight / size
  );
  old.append(x);
  document.getElementById(divID).style.height = `${item_height}px`;
  animationForPush(divID);
}
async function animationForPush(id) {
  console.log("push performing init");
  perfoming = true;
  let t = document.getElementById("outer").clientHeight;
  let minus = document.getElementById(id).clientHeight;
  let set = document.getElementById(id);
  t *= -1; //-300
  t += Number.parseInt(set.clientHeight) * id;
  while (t <= 0) {
    await sleep(0.5);
    t += 1;
    set.style.top = `${t}px`;
  }
  perfoming = false;
  console.log("push performing terminated");
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
async function delDiv() {
  perfoming = true;
  console.log("pop performing init");
  if (divID > 0) {
    let t = document.getElementById("outer").clientHeight;
    let set = document.getElementById(divID);
    t *= -1;
    t += Number.parseInt(set.clientHeight) * divID;
    let n = Number.parseInt(set.style.top);
    while (t != n && n != NaN) {
      await sleep(1);
      n--;
      set.style.top = `${n}px`;
    }
    document.getElementById(divID).remove();
    divID--;
  } else {
    popup(false,"can't pop the element from stack.");
  }
  perfoming = false;
  console.log("pop performing terminated");
}

async function findDiv(val) {
  console.log("peep performing init");
  perfoming = true;
  let f = divID;
  while (f != front - val + 2) {
    document.getElementById(f).style.backgroundColor = "pink";
    await sleep(900);
    document.getElementById(f).style.backgroundColor = "blue";
    f--;
  }
  document.getElementById(f).style.backgroundColor = "pink";
  await sleep(500);
  document.getElementById(f).style.backgroundColor = "green";
  await sleep(1500);
  document.getElementById(f).style.backgroundColor = "blue";
  perfoming = false;
  console.log("peep performing terminated");
}
async function changeDiv(position, newval) {
  perfoming = true;
  console.log("change performing init");
  await findDiv(position);
  document.getElementById(front - position + 2).innerHTML = newval;
  perfoming = false;
  console.log("change performing terminated");
}