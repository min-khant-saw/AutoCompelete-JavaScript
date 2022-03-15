const inputTag = document.querySelector(".search-box"),
  resultContainer = document.querySelector(".result-container");

var result;

let filterProduct = [];

const url = "https://fakestoreapi.com/products/";

const fetchDataServer = async (link) => {
  const fetchData = await fetch(link);
  const productData = await fetchData.json();
  const productDataToData = await (result = productData);
  inputTag.disabled = false;
  inputTag.placeholder = "Search product";
  inputTag.classList.remove("red");
  return productDataToData;
};

fetchDataServer(url).catch((error) => {
  console.log(error);
});

/**
 fetch(url)
  .then((respones) => {
    return respones.json();
  })
  .then((products) => {
    inputTag.disabled = false;
    inputTag.placeholder = "Search product";
    inputTag.classList.remove("red");
    result = products;
  })
  .catch((err) => {
    console.log(err);
  });
 */

inputTag.addEventListener("keyup", (event) => {
  if (
    (event.key === "Enter" && indexToSelect === -1) ||
    (event.key === "Shift" && event.key === "Enter")
  ) {
    return;
  }
  if (
    event.key === "ArrowDown" ||
    event.key === "ArrowUp" ||
    event.key === "Enter"
  ) {
    myKeyFunc(event.key);
    return;
  }

  resultContainer.innerHTML = "";
  const searchText = event.target.value.toLowerCase();
  emptyValue(event.key);

  if (searchText.length === 0) {
    return;
  }
  filterProduct = result.filter((products) => {
    return products.title.toLowerCase().includes(searchText);
  });
  if (filterProduct.length > 0) {
    for (let i = 0; i < filterProduct.length; i++) {
      const resultItemContainer = `
      <div id="${filterProduct[i].id}" class="resultItemContainer">
      <div class="name">${filterProduct[i].title}</div>
      <img src="${filterProduct[i].image}" alt="${filterProduct[i].category}" class="image">
      </div>`;
      resultContainer.innerHTML += resultItemContainer;
    }
  }
});

let indexToSelect = -1;

const myKeyFunc = (key) => {
  if (key === "ArrowDown") {
    if (indexToSelect === filterProduct.length - 1) {
      indexToSelect = -1;
      unSelected();
      return;
    }
    indexToSelect++;
    selected(indexToSelect);
    if (indexToSelect > 0) {
      unSelected();
    }
  } else if (key === "ArrowUp") {
    if (indexToSelect === -1) {
      indexToSelect = filterProduct.length - 1;
      selected(indexToSelect);
      return;
    }
    if (indexToSelect === 0) {
      indexToSelect = -1;
      unSelected();
      return;
    }
    indexToSelect -= 1;
    unSelected();
    selected(indexToSelect);
  } else {
    inputTag.value = filterProduct[indexToSelect].title;
    resultContainer.innerHTML = "";
  }
};

function selected(index) {
  LeaveSelected();
  const filterProductId = filterProduct[index].id.toString();
  const filterProductIdTag = document.getElementById(filterProductId);
  filterProductIdTag.classList.add("selected");
  filterProductIdTag.style.color = "#fff";
  filterProductIdTag.style.backgroundColor = "#06a1ff";
}

function unSelected() {
  LeaveSelected();
  const filterProductIdTagCass = document.querySelector(".selected");
  filterProductIdTagCass.style.color = "#000";
  filterProductIdTagCass.style.backgroundColor = "#fff";
  filterProductIdTagCass.classList.remove("selected");
}

function LeaveSelected() {
  if (resultContainer.innerHTML === "") {
    return;
  }
}

function emptyValue(key) {
  if (key === "Backspace") {
    indexToSelect = -1;
  }
  if (key === "Shift") {
    return;
  }
}
