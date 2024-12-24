function printPre() {
  strArr = "";
  fBST.preOrder(fBST.root);
  popup(true,strArr);
  strArr = "";
}
function printIn() {
  strArr = "";
  fBST.inOrder(fBST.root);
  popup(true,strArr);
  strArr = "";
}

function printPost() {
  strArr = "";
  fBST.postOrder(fBST.root);
  popup(true,strArr);
  strArr = "";
}
