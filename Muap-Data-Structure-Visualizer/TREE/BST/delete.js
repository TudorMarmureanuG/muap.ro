function del() {
  let newArr = [];
  let flag = 0;
  document.getElementById("myBstCanvas").scrollIntoView();
  let str = document.getElementById("inputBox").value;
  let delval = document.getElementById("delval").value;
  delval = Number.parseInt(delval);

  if (str == "") {
    popup(false,"Can't Delete Node Before insertion");
    document.getElementById("delval").value = "";
  } else {
    for (let i = 0; i < BST.length; i++) {
      if (BST[i] == delval) {
        flag = 1;
      } else {
        newArr.push(BST[i]);
      }
    }
    if (flag == 0) {
      popup(false,"Node Not Found In Tree!");
      document.getElementById("delval").value = "";
      return;
    }

    let x = document.getElementById("myBstCanvas");
    let ctx = x.getContext("2d");
    ctx.clearRect(0, 0, 20000, 6000);

    let fstr = "";
    for (let v = 0; v < newArr.length; v++) {
      fstr = fstr + newArr[v] + " ";
    }

    fBST.delete(delval, fBST.root);
    document.getElementById("inputBox").value = fstr;

    if (fBST.root === null) {
      fBST = null;
      document.getElementById("inputBox").value = "";
      document.getElementById("delval").value = "";

      return;
    }

    BST = [];
    fBST.setBST(fBST.root);
    fBST.setHeight(fBST.root);

    BSTleftDistance = [];
    BSTleftDistance = setLeftDistance(BST);

    draw(fBST, BST, "myBstCanvas");

    document.getElementById("delval").value = "";
  }
}
