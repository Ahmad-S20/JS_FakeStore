
//17:25



const getCategories = async() =>{
    const {data} = await axios.get('https://dummyjson.com/products/category-list');
    //console.log(data);
    return data
}


const displayCategories = async() =>{
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");

    try{
        const categories = await getCategories();
    


    const result = categories.map((category)=>{
        return `<div class='category'>
        <h2>${category}</h2>
        <a href= "categoryDetails.html?category=${category}">Details</a> 

        </div>`;
        }
    ).join(' ');

    //important ********************* here he puts ? at the end of <a></a> which will give the link a aprameter when
    // we click it 

    //console.log(result);
    document.querySelector(".categories .row").innerHTML = result;
    //loader.classList.remove("active");

    }catch(error){
        document.querySelector(".categories .row").innerHTML = "<p>error loading categories</p>";
        //loader.classList.remove("active");
    }
    finally{
        loader.classList.remove("active");
    }


}

const getProducts = async(page) =>{ 

    const skip = (page - 1) * 10;
    const {data} = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    console.log(data);
    return data;
}

const displayProducts = async(page = 1) =>{
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");

    try{
    const data = await getProducts(page);
    const numberOfPages = Math.ceil(data.total / 10);
    
   /* const productContainer = document.querySelector(".products .row");
    productContainer.innerHTML = ''; // Clear previous products*/
    //chatgpt ********************************
    
    
    const result = data.products.map(product =>{
        return `
        <div class="product">
        <img src="${product.thumbnail}" alt="${product.descreption}" class='images'>
        <h3>${product.title}</h3>
        </div>`
    }).join(' ');
    document.querySelector(".products .row").innerHTML = result;
    let paginationLink = ``;
    if(page == 1)
    {
        paginationLink += `<li class="page-item"><button class="page-link" disabled>&laquo;</button></li>`;
    }
    else{
        paginationLink += `<li class="page-item"><button onclick=displayProducts('${page-1}') class="page-link">&laquo;</button></li>`;
    }
    for(let i=1;i<=numberOfPages;i++)
    {
        paginationLink+=`<li class="page-item ${i==page?'active':''}"><button onclick=displayProducts('${i}') class="page-link" >${i}</button></li>`;
    }
    if(page == numberOfPages)
    {
        paginationLink+=`<li class="page-item"><button  class="page-link" disabled>&raquo;</button></li>`;
    }
    else{
        paginationLink+=`<li class="page-item"><button onclick=displayProducts('${parseInt(page)+1}') class="page-link" >&raquo;</button></li>`;
    }
   

    document.querySelector(".pagination").innerHTML = paginationLink;
    modal();
    
}
catch(error){
    document.querySelector(".products .row").innerHTML = "<p>error loading products</p>";
}

finally{
    loader.classList.remove("active");
}

}

displayCategories();
displayProducts();


window.onscroll = function(){
    const navbar = document.querySelector(".header");
    const categories = document.querySelector(".categories");

    //console.log(categories.offsetTop);//this function gives you how far is this section from the top
   // console.log(window.scrollY);// this gives you your position in the page when scrolling

    if(window.scrollY > categories.offsetTop){
       // console.log("hii"); 
        navbar.classList.add("scrollNavbar");
    }
    else{
        navbar.classList.remove("scrollNavbar");
    }

}

/*setTimeout( ()=>{
    console.log("hii");
}, 3000);*/ //this only prints once

const countDown = ()=>{
    const countdownDate = new Date("2025-03-02T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countdownDate - now;
    const days = Math.floor(distance /86400000);
    //console.log(days);
    document.querySelector("#days").textContent = days;

    const hours = Math.floor((distance % 86400000) / 3600000);
    document.querySelector("#hours").textContent = hours;

    const minutes = Math.floor((distance % 3600000) / 60000);
    document.querySelector("#minutes").textContent = minutes;

    const seconds = Math.floor((distance % 60000) / 1000);
    document.querySelector("#seconds").textContent = seconds;

}


setInterval( ()=>{
   countDown();
}, 1000);


function modal(){
    const modal = document.querySelector(".my-modal");
    const closeBtn = document.querySelector(".close-btn");
    const leftBtn = document.querySelector(".left-btn");
    const rightBtn = document.querySelector(".right-btn");
    const images = Array.from(document.querySelectorAll(".images"));
    let currentIndex = 0;

    //querySelectorAll returns NodeList ********************************

    console.log(modal,closeBtn,leftBtn,rightBtn,images);

   /* for(let i=0; i<images.length; i++)
    {
        images[i].onclick= ()=>{
           
        }
    }*/
   //or using for each
   images.forEach((image)=>{

    //or isnted of this we can use addEventListener

   image.addEventListener("click",(e)=>{
       //console.log(e.target.src);
        modal.classList.remove("d-non");
        modal.querySelector("img").setAttribute("src",e.target.src);
       
        const currenImage = e.target;
        currentIndex = images.indexOf(currenImage);   
        console.log(currentIndex);
     });
   })

   rightBtn.addEventListener("click",()=>{
        currentIndex++;
        if(currentIndex >= images.length) currentIndex = 0;
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);
   })


   leftBtn.addEventListener("click",()=>{
    currentIndex--;
        if(currentIndex < 0) currentIndex = images.length - 1;
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);
   })

   //close btn
   closeBtn.addEventListener("click",()=>{
    modal.classList.add("d-non");
   })


   document.addEventListener("keydown",(e)=>{
    console.log(e);
    if(e.code == "ArrowRight"){
        currentIndex++;
        if(currentIndex >= images.length) currentIndex = 0;
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);
    }
    else if(e.code =="ArrowLeft"){
        currentIndex--;
        if(currentIndex < 0) currentIndex = images.length - 1;
        const src = images[currentIndex].src;
        modal.querySelector("img").setAttribute("src",src);
    }
    else if(e.code == "Escape"){
        modal.classList.add("d-non");
    }
   })

}




