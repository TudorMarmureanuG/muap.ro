let current = 20;

function PrintHB(node, a, i) {
  const draw = document.getElementById("myAvlCanvas");
  const ctx = draw.getContext("2d");

  AVL = [];
  node.setAVL(node.root);
  node.setHeight();

  let tempHBDistance = [],
    h = 0,
    d = 0,
    j;

  let save = node.root,
    pred = node.root;

  tempHBDistance = setLeftDistance(AVL);
  node.setDistance(AVL, tempHBDistance);

  ctx.font = "18px Roman";
  ctx.fillText("STEP - " + (i + 1), 5, current);

  while (true) {
    if (a == save.data) {
      break;
    } else if (Number.parseInt(a) < Number.parseInt(save.data)) {
      pred = save;
      save = save.left;
    } else if (Number.parseInt(a) > Number.parseInt(save.data)) {
      pred = save;
      save = save.right;
    }
  }

  ctx.font = "17px Roman";
  for (j = 0; j < save.stepStr.length; j++) {
    current += 20;
    ctx.fillText(save.stepStr[j], 10, current);
  }
  h = 20;

  for (j = 0; j <= i; j++) {
    (save = node.root), (pred = node.root);
    while (true) {
      if (AVL[j] == save.data) {
        break;
      } else if (Number.parseInt(AVL[j]) < Number.parseInt(save.data)) {
        pred = save;
        save = save.left;
        d = -1;
      } else if (Number.parseInt(AVL[j]) > Number.parseInt(save.data)) {
        pred = save;
        save = save.right;
        d = 1;
      }
    }

    ctx.beginPath();
    ctx.arc(save.ld, save.height + current, 20, 0, 2 * Math.PI);
    ctx.stroke();

    if (j != 0) {
      ctx.beginPath();
      if (d == -1) {
        ctx.moveTo(pred.ld - 15, save.height + current - 35);
        ctx.lineTo(save.ld + 17, save.height + current - 10);
      } else {
        ctx.moveTo(pred.ld + 15, save.height + current - 35);
        ctx.lineTo(save.ld - 17, save.height + current - 10);
      }
      ctx.stroke();
    }
    ctx.font = "15px Roman";
    ctx.fillText(save.data, save.ld - 6, save.height + current);

    h += 50;
  }
  current += h + 10;
}
