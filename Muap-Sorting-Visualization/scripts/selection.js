async function selection(){
const ele=document.querySelectorAll('.sort');
for(let i=0; i<ele.length; i++)
{
    let x=i;
    ele[i].style.background='red';
    for(let j=i+1; j<ele.length; j++)
    {
        ele[j].style.background='red';
        if(parseInt(ele[j].style.height)<parseInt(ele[x].style.height))
        {
            if(x!==i)
            {
                ele[x].style.background='yellow';
            }
            x=j;
        }

        else
        {
            ele[j].style.background='yellow';
        }
    }
    await delay(time);
    swap(ele[i],ele[x]);
    ele[x].style.background='yellow';
    ele[i].style.background='green';
}
}
document.getElementById("selection").addEventListener('click', async function(){
    disableSizeSlider();
    disableSortingBtn();
    await selection();
    enableSizeSlider();
    enableSortingBtn();
});