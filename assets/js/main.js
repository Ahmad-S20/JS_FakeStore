
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

const getProducts = async() =>{
    const {data} = await axios.get('https://dummyjson.com/products');
    console.log(data);
    return data;
}

const displayProducts = async() =>{
    const loader = document.querySelector(".loader-container");
    loader.classList.add("active");

    try{
    const data = await getProducts();
    const result = data.products.map(product =>{
        return `
        <div class="product">
        <img src="${product.thumbnail}" alt="${product.descreption}">
        <h3>${product.title}</h3>
        </div>`
    }).join(' ');

    document.querySelector(".products .row").innerHTML += result;
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

    console.log(categories.offsetTop);//this function gives you how far is this section from the top
    console.log(window.scrollY);// this gives you your position in the page when scrolling

    if(window.scrollY > categories.offsetTop){
        console.log("hii"); 
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
    console.log(days);
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

