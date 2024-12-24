document.getElementById('popup').addEventListener('click',()=>
{
	document.getElementById('popup').style.display="none";
});
function popup(status , msg)
{
	if(status===null){
		status=false;
	}
	if(msg===null){
		msg = "Error can't be detected!!";
	}
	document.getElementById('popup').style.display="flex";
	document.getElementById('msg').innerHTML=msg;
	if(status==true)
	{
		document.getElementById('status').src ="../../IMAGES/rightPopUp.jpg";
	}
	else
	{
		document.getElementById('status').src ="../../IMAGES/wrongSymbol.jpg";
	}
}