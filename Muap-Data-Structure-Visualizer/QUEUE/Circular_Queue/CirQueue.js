let q1 = null;
let isEqual = false;
class Queue {
  constructor(s) {
    this.queue = [];
    this.size = s;
    this.frontIndex = Number.parseInt(-1);
    this.rearIndex = Number.parseInt(-1);
    popup(true, "created new queue");
  }
  enqueue(data) {
    if (this.rearIndex + 1 == this.frontIndex) {
      popup(false, "Queue Overflow");
      return;
    }
    if (this.rearIndex == this.size - 1) {
      if (this.frontIndex != 0) {
        this.rearIndex = 0;
        this.queue.push(data);
        setRear(this.rearIndex + 1, data);
      } else {
        popup(false, "Queue Overflow");
      }
      return;
    }
    this.rearIndex++;
    if (this.frontIndex == -1) {
      this.frontIndex = 0;
    }
    setRear(this.rearIndex + 1, data);
    this.queue.push(data);
    console.log(this.queue);

    console.log("front = " + this.frontIndex + "\nrear = " + this.rearIndex);
  }
  dequeue() {
    if (this.frontIndex == this.rearIndex && this.frontIndex == -1) {
      popup(false, "Queue Underflow");
      return;
    }
    if (this.frontIndex == this.rearIndex) {
      document.getElementById(`item${this.frontIndex + 1}`).innerHTML = "";
      this.frontIndex = -1;
      this.rearIndex = -1;
      this.queue.pop();
      return;
    }

    if (this.frontIndex == this.size - 1) {
      this.queue.shift();
      this.frontIndex = 0;
      setFront(this.frontIndex + 1, this.queue[0]);
      return;
    }
    this.frontIndex++;
    this.queue.shift();
    setFront(this.frontIndex + 1, this.queue[0]);
    console.log(this.queue);
    console.log("front = " + this.frontIndex + "\nrear = " + this.rearIndex);
  }
}
//onload code
function setColor(id) {
  for (let t = 1; t <= id; t++) {
    if (t % 4 == 0) {
      document.getElementById(`item${t}`).style.backgroundColor = "yellow";
    } else if (t % 3 == 0) {
      document.getElementById(`item${t}`).style.backgroundColor = "lightblue";
    } else if (t % 2 == 0) {
      document.getElementById(`item${t}`).style.backgroundColor = "pink";
    } else if (t % 1 == 0) {
      document.getElementById(`item${t}`).style.backgroundColor = "lightgreen";
    }
  }
}
///clicking events
document.getElementById("btnSize").addEventListener("click", () => {
  let val = document.getElementById("inputSize").value;
  if (val >= 5 && val <= 40) {
    setColor(val);
    if (q1 === null) {
      displayQueue(40, "none");
      q1 = new Queue(val);
      displayQueue(val, "flex");
    } else {
      //code for confirmation
      if (confirm("Are you sure to make new queue ?")) {
        q1 = null;
        for (let a = 1; a <= 40; a++) {
          document.getElementById(`item${a}`).innerHTML = "";
        }
        document.getElementById("btnSize").click();
      }
    }
    let l = document.getElementById("queueid");
    if (val <= 20) {
      l.style.backgroundImage = "url(../../IMAGES/1-20Cir.png)";
      l.style.backgroundSize = "98% 45%";
      l.style.backgroundPosition = "left top";
    } else {
      l.style.backgroundImage = "url(../../IMAGES/21-40Cir.png)";
      l.style.backgroundPosition = "left";
      l.style.backgroundSize = "98% 85%";
    }
  }
  else {
    popup(false, "Size must between 5 and 40.")
  }
});

document.getElementById("btnEnq").addEventListener("click", () => {
  let val = document.getElementById("inputEnq").value;
  if (val != "" && val <= 99999) {
    q1.enqueue(val);
    document.getElementById("inputEnq").value = "";
  }
});

document.getElementById("btnDeq").addEventListener("click", () => {
  if (q1.frontIndex != -1) {
    document.getElementById(`item${q1.frontIndex + 1}`).innerHTML = "";
  }
  q1.dequeue();
});
function displayQueue(id, value) {
  let oldId = id;
  if (value == "flex") {
    if (id <= 10) {
      id = 10;
    } else if (id >= 11 && id <= 20) {
      id = 20;
    } else if (id >= 21 && id <= 30) {
      id = 30;
    } else if (id >= 31 && id <= 40) {
      id = 40;
    } else {
      id = oldId;
    }
  }
  for (let v = 1; v <= id; v++) {
    document.getElementById(`item${v}`).style.display = value;
    document.getElementById(`item${v}`).style.borderColor = "black";
  }
  //      g=12;g<=20;g++
  //8 division
  if (value === "flex") {
    for (let g = Number.parseInt(oldId) + 1; g <= id; g++) {
      document.getElementById(`item${g}`).style.borderColor = "transparent";
      document.getElementById(`item${g}`).style.backgroundColor = "transparent";
    }
  }
}
function setRear(id, val) {
  if (q1.frontIndex != q1.rearIndex || id != 1) {
    document.getElementById("rear").remove();
  }
  let parent = document.getElementById(`item${id}`);
  if (q1.frontIndex === q1.rearIndex) {
    parent.innerHTML = `${val}<div class="both" id="both"><div class="innerboth" id="front">front</div><div class="innerboth" id="rear">rear</div></div>`;
    isEqual = true;
  } else {
    if (isEqual == true) {
      let p = document.getElementById(`item${q1.frontIndex + 1}`);
      p.innerHTML = `${q1.queue[0]}<div class='position' id='front'>front</div>`;
    }
    document.getElementById("front").setAttribute("class", "position");
    parent.innerHTML = `${val}<div class='position' id='rear'>rear</div>`;
  }
}
function setFront(id, val) {
  val = Number.parseInt(val);
  let parent = document.getElementById(`item${id}`);
  if (q1.frontIndex === q1.rearIndex) {
    parent.innerHTML = `${val}<div class="both" id="both"><div class="innerboth" id="front">front</div><div class="innerboth" id="rear">rear</div></div>`;
  } else {
    parent.innerHTML = `${val}<div class='position' id='front'>front</div>`;
  }
}
