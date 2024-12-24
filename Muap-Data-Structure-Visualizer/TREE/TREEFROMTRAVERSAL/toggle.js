let toggBST=document.getElementById('toggBST');
let toggAVL=document.getElementById('toggAVL');
toggBST.addEventListener('click',()=>
{
	toggBST.style.backgroundColor = "rgb(0, 218, 150)";
	toggBST.style.color = "rgb(20, 27, 53)";
	toggAVL.style.backgroundColor = "rgb(20, 27, 53)";
	toggAVL.style.color = "rgb(0, 218, 150)";
});
toggAVL.addEventListener("click", () => {
  toggBST.style.backgroundColor = "rgb(20, 27, 53)";
  toggBST.style.color = "rgb(0, 218, 150)";
  toggAVL.style.backgroundColor = "rgb(0, 218, 150)";
  toggAVL.style.color = "rgb(20, 27, 53)";
});