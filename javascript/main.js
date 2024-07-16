let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount')
let total=document.getElementById('small');
let count=document.getElementById('count');
let category=document.getElementById('category');
let search=document.getElementById('search');
let submit=document.getElementById('create');
let searchtitle=document.getElementById('search by title');
let searchcategory=document.getElementById('search by category');
let deleteall=document.getElementById('deleteall');
let arr=[];
let newpro={};
let mood="create";
let index;
function showtotal(){
    if(price.value===''){
        total.style.background="#dc3545";
        total.innerHTML="";
    }
    else {
        total.style.background="#198754";
        total.innerHTML=(+price.value + +taxes.value + +ads.value - +discount.value )

    }
}
if(localStorage.getItem("product")!=null){
    arr=JSON.parse(localStorage.getItem("product"));
    display(arr);
}

//===================================================================
function addproduct(){
    newpro={
        Title:title.value,
        Price:price.value,
        Taxes:taxes.value || 0,
        Ads:ads.value || 0,
        Category:category.value,
        Discount:discount.value || 0,
        Total:total.innerHTML,
        Count:count.value
    }
        if(title.value!=="" && price.value!=="" && category.value!==""){
            if (mood === "create") {
                if (newpro.Count > 1) {
                    for (var i = 0; i < count.value; i++) {
                        arr.push(newpro);
                    }
                } else {
                    arr.push(newpro);
                }
            } 
            else {
                arr[index] = newpro;
                mood = "create";
                submit.innerHTML = "Create";
                count.style.display = "block";
            }
            cleardata();
            localStorage.setItem('product', JSON.stringify(arr));
            display(arr);
            showtotal();
        }
    }

//=======================================================================
function cleardata(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    category.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
}

//=========================================================================
function display(arr){
    let cartona="";
    for(var i=0;i<arr.length;i++){
        cartona+=`
        <tr>
            <td>${i+1}</td>
            <td>${arr[i].Title}</td>
            <td>${arr[i].Price}</td>
            <td>${arr[i].Taxes}</td>
            <td>${arr[i].Ads}</td>
            <td>${arr[i].Discount}</td>
            <td>${arr[i].Total}</td>
            <td>${arr[i].Category}</td>
            <td><button class="btn btn-success" onclick=" update(${i})">UPDATE</button></td>
            <td><button class="btn btn-danger" onclick="deleteproduct(${i})">DELETE</button></td>
        </tr>
        `
    }
    if(arr.length>0){
        deleteall.style.display="block";
        
    }
    else {deleteall.style.display="none";
        
    }
    document.querySelector('tbody').innerHTML=cartona;
}
//================================================================
function deleteproduct(i){
    arr.splice(i,1);
    localStorage.setItem("product",JSON.stringify(arr));
    display(arr);
}

//=========================================================================
let mode="title";
function searchmode(id){
    search.placeholder=id;
    mode = id ==="search by title"?"title" :"category";
}

//======================================================================

function searchitem(){
    if(mode==="title"){
        let v=search.value.toLowerCase();
        let a=arr.filter((item)=>item.Title.toLowerCase().includes(v));
        display(a);
    }
    else{
        let v=search.value.toLowerCase();
        let a=arr.filter((item)=>item.Category.toLowerCase().includes(v));
        display(a);
    }
}

//============================================================================

function update(i){
    title.value=arr[i].Title;
    price.value=arr[i].Price;
    taxes.value=arr[i].Taxes;
    ads.value=arr[i].Ads;
    discount.value=arr[i].Discount;
    category.value=arr[i].Category;
    showtotal();
    submit.innerHTML="Update";
    count.style.display="none";
    mood="update";
    index=i;

}

//======================================================================

function delall(){
    localStorage.clear();
    arr.splice(0);
    display(arr);
}
