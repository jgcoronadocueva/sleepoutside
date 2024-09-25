async function getTents() {
  const response = await fetch("public/json/tents.json");
  if (response.ok) {
    const data = await response.json();
    renderTents(data);
  }
}

function renderTents(data) {
  let tents = data;
  let content = "";
  tents.forEach((tent) => {
    content += `
<li class="product-card">
            <a href="">
              <img
                src=${tent.Image}
                alt="${tent.Name}"
              />
              <h3 class="card__brand">${tent.Brand.Name}</h3>
              <h2 class="card__name">${tent.Name}</h2>
              <p class="product-card__price">$${tent.FinalPrice}</p>
            </a>
          </li>
`;
  });

  document.querySelector(".product-list").innerHTML = content;
}

getTents();
