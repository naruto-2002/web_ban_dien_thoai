function getTokenFromCookie() {
  const cookie = document.cookie.split(";");
  const token = cookie[0].substring("token=".length, cookie[0].length);
  return token;
}

const urlParams = new URLSearchParams(window.location.search);
const productInOrderId = parseInt(urlParams.get("productInOrder"));
console.log(productInOrderId);

let imageUrls = [];
const image = document.getElementById("image");
image.addEventListener("change", function (event) {
  const files = event.target.files;
  imageUrls = [];

  const uploadPromises = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const uploadPromise = uploadImageToFirebaseStorage(file)
      .then((url) => {
        imageUrls.push(url);
      })
      .catch((error) => {
        console.log("Lỗi tải lên ảnh lên Firebase Storage: ", error);
      });

    uploadPromises.push(uploadPromise);
  }

  Promise.all(uploadPromises)
    .then(() => {
      console.log("Tải ảnh lên thành công:", imageUrls);
    })
    .catch((error) => {
      console.log("Lỗi tải ảnh lên:", error);
    });
});

function uploadImageToFirebaseStorage(file) {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref();
    const timestamp = Date.now();
    const fileName = `image_${timestamp}`;
    const fileRef = storageRef.child(fileName);

    fileRef
      .put(file)
      .then((snapshot) => snapshot.ref.getDownloadURL())
      .then((url) => resolve(url))
      .catch((error) => reject(error));
  });
}

async function submitReview() {
  const comment = document.getElementById("comment").value;
  const ratingInputs = document.querySelectorAll('.rating input[type="radio"]');
  let star = 0;
  ratingInputs.forEach((input) => {
    if (input.checked) {
      star = parseInt(input.value);
    }
  });
  if (!comment || star === 0) {
    console.log("Vui lòng nhập đủ thông tin!");
    alert("Vui lòng nhập đủ thông tin!");
    return;
  }

  const data = {
    comment: comment,
    star: star,
    productInOrderId: productInOrderId,
    images: imageUrls,
  };

  try {
    const response = await fetch(`https://localhost:443/WebS2023_war/api/rates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + getTokenFromCookie(),
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    console.log("Đánh giá đã được gửi thành công:", responseData);
    alert("Đánh giá đã được gửi thành công!");
  } catch (error) {
    console.log("Lỗi gửi đánh giá:", error);
    alert("Đã xảy ra lỗi khi gửi đánh giá!");
  }
}

document.getElementById("btnSubmit").addEventListener("click", submitReview);
