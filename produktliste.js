//https://kea-alt-del.dk/t7/api/products/

// 1. hente data
async function getData() {
  const response = await fetch("https://kea-alt-del.dk/t7/api/products?limit=10");
  const data = await response.json();
  //console.log(data);
  // 2. loope // 3. for hver
  data.forEach(showProduct);
}
getData();

function showProduct(product) {
  console.log(product);
  // 4. fange vores template
  const template = document.querySelector("#smallProductTemplate").content;
  // 5. clone
  const copy = template.cloneNode(true);

  // 6. skifte data
  copy.querySelector("h3").textContent = product.productdisplayname;
  copy.querySelector("#pris").textContent = product.price;
  copy.querySelector("#mærke").textContent = product.brandname;
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;

  //Udregner rabatten ud og tilgøjer procent//
  copy.querySelector(".discounted p").textContent = `${Math.round(product.price - product.price * (product.discount / 100))} DKK`;
  copy.querySelector(".discounted p+p").textContent = `${product.discount}%`;

  // Navigerer over til produktsiden og sende id med
  copy.querySelector("a").href = "produkt.html?id=" + product.id;

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }
  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
  }
  // 7. appende (tilføje de til DOM)
  document.querySelector("main").appendChild(copy);
}
