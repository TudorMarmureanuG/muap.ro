function draw(node, arr, canvas) {
  current = 20;

  const draw = document.getElementById(canvas);
  const ctx = draw.getContext("2d");
  //manual code drawing

  ctx.clearRect(0, 0, 20000, 6000);
  ctx.font = "18px Roman";

  for (let k = 0; k < strDel.length; k++) {
    console.log("Its statement");
    ctx.fillText(strDel[k], 20, 20 + k * 20);
    current += 30;
  }

  ctx.beginPath();
  ctx.arc(node.root.ld, node.root.height + current, 20, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.font = "15px Roman";
  ctx.fillText(node.root.data, node.root.ld - 6, node.root.height + current);

  for (let i = 1; i < arr.length; i++) {
    let save = node.root,
      pred = node.root,
      d;

    while (true) {
      if (arr[i] == save.data) {
        break;
      } else if (Number.parseInt(arr[i]) < Number.parseInt(save.data)) {
        pred = save;
        save = save.left;
        d = -1;
      } else if (Number.parseInt(arr[i]) > Number.parseInt(save.data)) {
        pred = save;
        save = save.right;
        d = 1;
      }
    }

    ctx.beginPath();
    ctx.arc(save.ld, save.height + current, 20, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    if (d == -1) {
      ctx.moveTo(pred.ld - 15, save.height - 35 + current);
      ctx.lineTo(save.ld + 17, save.height - 10 + current);
    } else {
      ctx.moveTo(pred.ld + 15, save.height - 35 + current);
      ctx.lineTo(save.ld - 17, save.height - 10 + current);
    }
    ctx.stroke();

    ctx.font = "15px Roman";
    ctx.fillText(save.data, save.ld - 6, save.height + current);
  }
}
