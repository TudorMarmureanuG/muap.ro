function searchAVL() {
  let flag = 0;
  document.getElementById("myAvlCanvas").scrollIntoView();
  let n = document.getElementById("search").value;
  n = Number.parseInt(n);

  const draw = document.getElementById("myAvlCanvas");
  const ctx = draw.getContext("2d");
  ctx.clearRect(0, 0, 20000, 6000);

  ctx.beginPath();
  ctx.arc(fHB.root.ld, fHB.root.height, 20, 0, 2 * Math.PI);

  if (fHB.root.data == n) {
    flag = 1;
    ctx.fillStyle = "blue";
    ctx.fill();
  }

  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.font = "15px Roman";
  ctx.fillText(fHB.root.data, fHB.root.ld - 6, fHB.root.height);

  for (let i = 1; i < AVL.length; i++) {
    let save = fHB.root,
      pred = fHB.root,
      d;

    while (true) {
      if (AVL[i] == save.data) {
        break;
      } else if (Number.parseInt(AVL[i]) < Number.parseInt(save.data)) {
        pred = save;
        save = save.left;
        d = -1;
      } else if (Number.parseInt(AVL[i]) > Number.parseInt(save.data)) {
        pred = save;
        save = save.right;
        d = 1;
      }
    }

    ctx.beginPath();
    ctx.arc(save.ld, save.height, 20, 0, 2 * Math.PI);
    if (AVL[i] == n) {
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
