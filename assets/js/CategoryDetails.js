

const getProducts = async() =>{


    /*********************************************/ 
    console.log(window.location.search);
    const params = new URLSearchParams(window.location.search);
    console.log(params);//print information about the parameters

    const category = params.get('category');
    console.log(category); //get the value of the parameter "category"





    const {data} = await axios.get(`https://dummyjson.com/products/category/${category}`);
    return data;
}

const displayProducts = async() =>{
    const data = await getProducts();
    //console.log(data);
    const result = data.products.map(product =>{
        return `
        <div class="product">
        <img src="${product.thumbnail}" alt="${product.descreption}">
        <h3>${product.title}</h3>
        </div>`
    }).join(' ');

    document.querySelector(".products .row").innerHTML += result;

}

displayProducts();