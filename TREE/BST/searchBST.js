function searchBST() {
  let flag = 0;
  document.getElementById("myBstCanvas").scrollIntoView();
  let str = document.getElementById("inputBox").value;
  let n = document.getElementById("search").value;

  if (str == "") {
    popup(false,"Can't search Node Before insertion");
    document.getElementById("search").value = "";
    return;
  }

  n = Number.parseInt(n);

  const draw = document.getElementById("myBstCanvas");
  const ctx = draw.getContext("2d");
  ctx.clearRect(0, 0, 20000, 6000);

  ctx.beginPath();
  ctx.arc(fBST.root.ld, fBST.root.height, 20, 0, 2 * Math.PI);

  if (fBST.root.data == n) {
    flag = 1;
    ctx.fillStyle = "blue";
    ctx.fill();
  }

  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.font = "15px Roman";
  ctx.fillText(fBST.root.data, fBST.root.ld - 6, fBST.root.height);

  for (let i = 1; i < BST.length; i++) {
    let save = fBST.root,
      pred = fBST.root,
      d;

    while (true) {
      if (BST[i] == save.data) {
        break;
      } else if (Number.parseInt(BST[i]) < Number.parseInt(save.data)) {
        pred = save;
        save = save.left;
        d = -1;
      } else if (Number.parseInt(BST[i]) > Number.parseInt(save.data)) {
        pred = save;
        save = save.right;
        d = 1;
      }
    }

    ctx.beginPath();
    ctx.arc(save.ld, save.height, 20, 0, 2 * Math.PI);
    if (BST[i] == n) {
      flag = 1;
      ctx.fillStyle = "blue";
      ctx.fill();
    }
    ctx.stroke();
    ctx.fillStyle = "black";

    ctx.beginPath();
    if (d == -1) {
      ctx.moveTo(pred.ld - 15, save.height - 35);
      ctx.lineTo(save.ld + 17, save.height - 10);
    } else {
      ctx.moveTo(pred.ld + 15, save.height - 35);
      ctx.lineTo(save.ld - 17, save.height - 10);
    }
    ctx.stroke();

    ctx.font = "15px Roman";
    ctx.fillText(save.data, save.ld - 6, save.height);
  }

  if (flag == 0) {
    popup(false,"Node not found in the tree");
  }
}
