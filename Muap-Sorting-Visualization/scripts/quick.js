async function lomuto(ele,l,h){
    let i=l-1;
    
    ele[h].style.background='red';
    for(let j=l; j<=h-1; j++)
    {
        ele[j].style.background='brown';
        await delay(time);
        if(parseInt(ele[j].style.height) < parseInt(ele[h].style.height))
        {
            if(i>=l)
            {
                ele[i].style.background='yellow';
            }
            i++;
            swap(ele[i],ele[j]);
            ele[i].style.background='orange';
            // if(i!=j)
            // {
                // ele[j].style.background='orange';
            // }
            await delay(time);
        }
        ele[j].style.background='yellow';
    }
    if(i>=l){
        ele[i].style.background='yellow';
    }

    await delay(time);
    swap(ele[i+1],ele[h]);
    
    ele[h].style.background='yellow';
    
    await delay(time);      
        return i+1;
    }
    
    async function qsort(ele,l,h){
        
        if(l<h){
        let p=await lomuto(ele,l,h);
        await qsort(ele,l,p-1);
        await qsort(ele,p+1,h);
    }
    
    else{
        return;
    }
}

// qsort(ele,l,h);
document.getElementById('quick').addEventListener('click', async function(){
    let ele=document.querySelectorAll('.sort');
    let l=0;
    let h=parseInt(ele.length)-1;
    disableSizeSlider();
    disableSortingBtn();
    await qsort(ele,l,h);
    for(let i=0; i<=h; i++)
    {
        await delay(time);
        ele[i].style.background='green';
    }
    enableSizeSlider();
    enableSortingBtn();
});