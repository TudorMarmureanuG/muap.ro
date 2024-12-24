function del() {
  let newArr = [];
  let flag = 0;
  document.getElementById("myAvlCanvas").scrollIntoView();
  let str = document.getElementById("inputBox").value;
  let delval = document.getElementById("delval").value;
  delval = Number.parseInt(delval);

  if (str == "") {
    popup(false,"Can't Delete Node Before insertion");
  } else {
    for (let i = 0; i < AVL.length; i++) {
      if (AVL[i] == delval) {
        flag = 1;
      } else {
        newArr.push(AVL[i]);
      }
    }

    if (flag == 0) {
      popup(false,"Node Not Found In Tree!");
      document.getElementById("delval").value = "";
      return;
    }

    let x = document.getElementById("myAvlCanvas");
    let ctx = x.getContext("2d");
    ctx.clearRect(0, 0, 20000, 6000);

    let fstr = "";
    for (let v = 0; v < newArr.length; v++) {
      fstr = fstr + newArr[v] + " ";
    }

    fHB.HBdelete(delval, fHB.root);

    document.getElementById("inputBox").value = fstr;

    if (fHB.root === null) {
      fHB = null;
      document.getElementById("inputBox").value = "";
      document.getElementById("delval").value = "";
      return;
    }

    AVL = [];
    fHB.setAVL(fHB.root);
    fHB.setHeight();

    HBleftDistance = [];
    HBleftDistance = setLeftDistance(AVL);
    fHB.setDistance(AVL, HBleftDistance);

    draw(fHB, AVL, "myAvlCanvas");

    document.getElementById("delval").value = "";
  }
}
