const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      
      <p>Product rating : ${product.rating.rate}</p>
      <p>rating count: ${product.rating.count}</p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      
      <button onclick="loadProducts2(${product.id})" id="details-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();

  updateTotal()
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseInt(element);
  return converted;
};



// face agin me

// const newii = addToCart(`${product.id}`)
// console.log(newii);


const loadProducts2 = (id) => {

  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
          //  console.log(url);
    .then((response1) => response1.json())
   
    .then((data1) => modalOpener(data1));
    //  .then((data1) => console.log(data1.products[1]));
    //  .then((data1) => console.log(data1));
};

const modalOpener = info =>{
  console.log(info);
  for(const kika in info)
  console.log(`info.${kika} = ${info[kika]}`);


const modalInformation = document.getElementById('modalData');

modalInformation.innerHTML = `


<div class="modal-header">
<h5 class="modal-title" id="staticBackdropLabel">Title: ${info.title} </h5>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body"> Description: 
<p>${info.description}</p>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="button" class="btn btn-primary">Understood</button>
</div>

`
}
// modal body







// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal;
};
