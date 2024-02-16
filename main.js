let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let submit=document.getElementById('submit');
let category=document.getElementById('category');
let deletall=document.getElementById('deleteall');
let mood='Creat';
let index;
function gettotal()
{
   if(price.value!='')
   {
    let sum=(Number(price.value)+Number(taxes.value)+Number(ads.value))-Number(discount.value);
    total.innerHTML=sum;
    total.style.background='#040';
   }
   else
   {
    total.innerHTML="";
    total.style.background='brown';
   }
}
let datapro;
if(localStorage.product!=null)
{
    datapro=JSON.parse(localStorage.product);
}
else
{
datapro=[];
}
submit.onclick=function()
{
   let newpro={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
   }
   if(title.value!=''&&category.value!=''&&price.value!=''&&count.value<=100)
   {
   if(mood==='Creat'){
   if(newpro.count>1){
   for(let i=0;i<newpro.count;i++){
   datapro.push(newpro); 
   }
  }
  else{
    datapro.push(newpro); 
  }
   }
   else
   {
    datapro[index]=newpro;
    mood='Creat';
    submit.innerHTML='Creat';
    count.style.display='block';
   }
   cleardata();
}
   localStorage.setItem('product',JSON.stringify(datapro));
   
   showdata();
}


function cleardata()
{
  title.value='';
  price.value='';
  ads.value='';
  total.innerHTML='';
  taxes.value='';
  count.value='';
  category.value='';
  discount.value='';
}

function showdata()
{ 
    gettotal();
    let table="";
    for(let i=0;i<datapro.length;i++)
    {
      
        table += `
        <tr>
                    <td>
                       ${i+1}
                    </td>
                    <td>
                    ${datapro[i].title}
                    </td>
                    <td>
                    ${datapro[i].price}
                    </td>
                    <td>
                    ${datapro[i].taxes}
                    </td>
                    <td>
                    ${datapro[i].ads}
                    </td>
                    <td>
                    ${datapro[i].discount}
                    </td>
                    <td> ${datapro[i].total}</td>
                    <td> ${datapro[i].category}</td>
                    <td><button onclick="updatedata(${i})" id="update">update</button></td>
                    <td><button onclick="deletdata(${i})" id="delete">delete </button></td>
         </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    if(datapro.length>0)
    {
        deletall.innerHTML=`
        <button  onclick="deleteAll()">delete all ${datapro.length}  </button>
        `
    }
    else
    {
        deletall.innerHTML=``;
    }
   
}

function deletdata(i)
{
       datapro.splice(i,1);
       localStorage.product=JSON.stringify(datapro);
       showdata();
}
function deleteAll()
{
    localStorage.clear();
    datapro.splice(0);
    showdata(); 
}
function updatedata(i)
{
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    ads.value=datapro[i].ads;
    taxes.value=datapro[i].taxes;
    category.value=datapro[i].category;
    discount.value=datapro[i].discount;
    gettotal();
    count.style.display='none';
    submit.innerHTML='Update';
    mood='Update';
    index=i;
    scroll(
        {
            top:0,
            behavior:'smooth',
        }
    )

}
let searchmood='title';
function getsearchmood(id)
{
   let search=document.getElementById('search');
    if(id==='searchtitle')
    {
        searchmood='title';
        search.placeholder='search by title';
    }
    else
    {
        searchmood='category';
        search.placeholder='search by category';
    }
    search.focus();
    search.value='';
    showdata();
    
}
function serchdata(data)
{
    data=data.toLowerCase();
    let table='';
    if(searchmood==='title')
    {

      for(let i=0;i<datapro.length;i++)
      {
          if(datapro[i].title.includes(data))
          {
            table += `
            <tr>
                        <td>
                           ${i}
                        </td>
                        <td>
                        ${datapro[i].title}
                        </td>
                        <td>
                        ${datapro[i].price}
                        </td>
                        <td>
                        ${datapro[i].taxes}
                        </td>
                        <td>
                        ${datapro[i].ads}
                        </td>
                        <td>
                        ${datapro[i].discount}
                        </td>
                        <td> ${datapro[i].total}</td>
                        <td> ${datapro[i].category}</td>
                        <td><button onclick="updatedata(${i})" id="update">update</button></td>
                        <td><button onclick="deletdata(${i})" id="delete">delete </button></td>
             </tr>
            `
          }
      }

    }
    else
    {
        
      for(let i=0;i<datapro.length;i++)
      {
          if(datapro[i].category.includes(data))
          {
            table += `
            <tr>
                        <td>
                           ${i}
                        </td>
                        <td>
                        ${datapro[i].title}
                        </td>
                        <td>
                        ${datapro[i].price}
                        </td>
                        <td>
                        ${datapro[i].taxes}
                        </td>
                        <td>
                        ${datapro[i].ads}
                        </td>
                        <td>
                        ${datapro[i].discount}
                        </td>
                        <td> ${datapro[i].total}</td>
                        <td> ${datapro[i].category}</td>
                        <td><button onclick="updatedata(${i})" id="update">update</button></td>
                        <td><button onclick="deletdata(${i})" id="delete">delete </button></td>
             </tr>
            `
          }
      }
    }
    document.getElementById('tbody').innerHTML=table;

}

showdata();
