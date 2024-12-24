async function merge(ele,low,mid,high){
    const n1=mid-low+1;
    const n2=high-mid;

    let left=new Array(n1);
    let right=new Array(n2);
    
    for(let i=0; i<n1; i++)
    {
        await delay(time);
        ele[low+i].style.background='orange';
        left[i]=ele[low+i].style.height;
    }

    for(let j=0; j<n2; j++)
    {
        await delay(time);
        ele[mid+1+j].style.background='red';
        right[j]=ele[mid+1+j].style.height;
    }

    // await delay(50);
    let i=0, j=0, k=low;

    while(i<n1 && j<n2)
    {
        await delay(time);
        if(parseInt(left[i])<=parseInt(right[j]))
        {
            if((n1+n2)==ele.length)
            {
                ele[k].style.background='green';
            }
            else
            {
                ele[k].style.background='light green';
            }
            ele[k].style.height=left[i];
            i++;
            k++;
        }

        else
        {
            if((n1+n2)==ele.length)
            {
                ele[k].style.background='green';
            }

            else
            {
                ele[k].style.background='light green';
            }
            ele[k].style.height=right[j];
            j++;
            k++;
        }
    }

    while(i<n1)
    {
        await delay(time);
        if((n1+n2)==ele.length)
        {
            ele[k].style.background='green';
        }

        else
        {
            ele[k].style.background='light green';
        }
        ele[k].style.height=left[i];
        i++;
        k++;
    }

    while(j<n2)
    {
        await delay(time);
        if((n1+n2)==ele.length)
        {
            ele[k].style.background='green';
        }

        else
        {
            ele[k].style.background='light green';
        }
        ele[k].style.height=right[j];
        j++;
        k++;
    }
}

async function mergeSort(ele,l,r){
    if(l>=r)
    {
        return;
    }
    const m=l+Math.floor((r-l)/2);
    await mergeSort(ele,l,m);
    await mergeSort(ele,m+1,r);
    await merge(ele,l,m,r);
}

document.getElementById('merge').addEventListener('click',async function(){
    let ele=document.querySelectorAll('.sort');
    let l=0;
    let r=parseInt(ele.length)-1;
    disableSizeSlider();
    disableSortingBtn();
    await mergeSort(ele,l,r);
    enableSizeSlider();
    enableSortingBtn();
});