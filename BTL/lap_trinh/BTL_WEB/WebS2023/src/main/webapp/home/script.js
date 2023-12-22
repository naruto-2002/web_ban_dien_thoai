function getTokenFromCookie() {
  const cookie = document.cookie.split(";");
  const token = cookie[0].substring("token=".length, cookie[0].length);
  return token;
}

function fetchData(categoryId) {
  let url = `https://localhost:443/WebS2023_war/api/products`;
  if (categoryId) {
    url += "?categoryId=" + categoryId;
  }
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getTokenFromCookie(),
    },
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Lỗi khi tìm nạp dữ liệu sản phẩm");
      }
    })
    .then(function (data) {
      console.log(data);
      displayProductData(data.data);
    })
    .catch(function (error) {
      console.error(error);
      // Xử lý lỗi tìm nạp hoặc hiển thị thông báo lỗi
      alert("Lỗi khi tìm nạp dữ liệu sản phẩm. Vui lòng thử lại.");
    });
}
function fetchCategory() {
  const url = `https://localhost:443/WebS2023_war/api/categories`;
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getTokenFromCookie(),
    },
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Lỗi khi tìm nạp dữ liệu");
      }
    })
    .then(function (data) {
      console.log(data);
      filterCategory(data.data);
    })
    .catch(function (error) {
      console.error(error);
      // Xử lý lỗi tìm nạp hoặc hiển thị thông báo lỗi
      alert("Lỗi khi tìm nạp dữ liệu. Vui lòng thử lại.");
    });
}
function displayProductData(data) {
  const productItems = document.getElementById("productItems");

  productItems.innerHTML = "";

  data.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    const productItemImage = document.createElement("img");
    productItemImage.classList.add("product-item-image");
    productItemImage.src = product.images[0].link;
    productItem.appendChild(productItemImage);

    productItemImage.addEventListener("click", function () {
      // Chuyển hướng đến trang chi tiết sản phẩm
      const productId = product.id;
      window.location.href = `https://localhost:443/WebS2023_war/product-detail/?productId=${productId}`;
    });

    const productItemInfo = document.createElement("div");
    productItemInfo.classList.add("product-item-info");

    const productName = document.createElement("div");
    productName.classList.add("product-name");
    productName.textContent = product.name;
    productItemInfo.appendChild(productName);

    const productDescription = document.createElement("div");
    productDescription.classList.add("product-description");
    productDescription.textContent = product.description;
    productItemInfo.appendChild(productDescription);

    const productPrice = document.createElement("div");
    productPrice.classList.add("product-price");
    productPrice.textContent = product.price + " đ";
    productItemInfo.appendChild(productPrice);

    const productCategory = document.createElement("div");
    productCategory.classList.add("product-category");
    productCategory.textContent = "Category: " + product.category.name;
    productItemInfo.appendChild(productCategory);

    productItem.appendChild(productItemInfo);
    productItems.appendChild(productItem);
  });
}

// Hàm lọc sản phẩm

function filterProductsByCategory(category) {
  fetch(`https://localhost:443/WebS2023_war/api/products?category=${category}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + getTokenFromCookie(),
    },
  })
    .then(function (response) {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Lỗi khi tìm nạp dữ liệu sản phẩm");
      }
    })
    .then(function (data) {
      // Filtered products are fetched successfully, display them
      displayProductData(data.data);
    })
    .catch(function (error) {
      console.error(error);
      alert("Lỗi khi tìm nạp dữ liệu sản phẩm. Vui lòng thử lại.");
    });
}

// Hàm lọc sản phẩm
const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", applyFilter);

function applyFilter() {
  const selectedStatus = document.getElementById("statusFilterSelect").value;
  fetchData(selectedStatus);
}

function filterCategory(data) {
  const selectElement = document.getElementById("statusFilterSelect");
  for (var i = 0; i < data.length; i++) {
    const option = document.createElement("option");
    option.value = data[i].id;
    option.textContent = data[i].name;
    selectElement.appendChild(option);
  }
}
fetchCategory();
applyFilter();
