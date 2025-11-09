
const titleInput = document.getElementById("title");
const titleInputError = document.getElementById("titleInputError");
const titleModal = document.getElementById("titleModal");
const bodyInput = document.getElementById("bodyText");
const bodyInputError = document.getElementById("bodyInputError");
const bodyModal = document.getElementById("bodyTextModal");
const submitBtn = document.getElementById("submitButton");
const blogForm = document.getElementById("blog-form");
const modalForm = document.getElementById("modal-blog-form");
const template = document.getElementById("template");
const postDisplay = document.getElementById("blog-posts-display");
const modalUpdate = document.getElementById("modalForm");
const updateBtn = document.getElementById("updateButton");
const formHalf = document.getElementById("form-half");
const clearBtn = document.getElementById("clearBtn");

let objectCounter = localStorage.getItem('ObjectCounter');
if (objectCounter === null) {
    objectCounter = 0;
} else {
     objectCounter = parseInt(objectCounter, 10); 
}

submitBtn.addEventListener("click", event => {
  if (!titleInput.validity.valid) {
    titleInputError.textContent = "Please enter a title";
    titleInput.focus();
  } else {
    titleInputError.textContent = "";
  }
  if (!bodyInput.validity.valid) {
    bodyInputError.textContent = "Please enter a message";
    bodyInput.focus();
  } else {
    bodyInputError.textContent = "";
  }
  if (blogForm.checkValidity()) {
    alert("Form Submitted Successfully");
    createBlogPost();
    window.location.reload()
  }
});

let recall;
try {
  recall = JSON.parse(localStorage.getItem("savedPosts"));
} catch (error) {
  console.error("Error parsing items from localStorage", e);
  recall = null;
}
if (recall == null) {
  recall = [];
}

const createBlogPost = () => {
  const postObject = {
    id: objectCounter,
    title: titleInput.value,
    body: bodyInput.value,
  };
  recall.push(postObject);
  localStorage.setItem("savedPosts", JSON.stringify(recall));
  const newBlogPost = document.createElement("div");
  newBlogPost.setAttribute("id", postObject.id);
  const blogPostIndex = recall.findIndex(
    (postObject) => postObject.id == newBlogPost.id
  );
  newBlogPost.innerHTML = `${recall[blogPostIndex].title}:<br>${recall[blogPostIndex].body}<br><button class="remove-from-list">Delete</button> <button class="edit">Edit</button>`;
  postDisplay.appendChild(newBlogPost);
  bodyInput.value = "";
  titleInput.value = "";
    incObjectCounter()
};

const updateBlogPost = () => {
  const postObject = {
    id: objectCounter,
    title: titleModal.value,
    body: bodyModal.value,
  };
  recall.push(postObject);
    incObjectCounter()
  localStorage.setItem("savedPosts", JSON.stringify(recall));
  window.location.reload()
};


const incObjectCounter=()=>{
    objectCounter++
    localStorage.setItem('ObjectCounter', objectCounter.toString())
}
const blurBackground =()=> {
    modalUpdate.style.display = "block";
    formHalf.style.filter = "blur(5px)";
    postDisplay.style.filter = "blur(5px)";
}
const unBlurBackground =()=> {
    modalUpdate.style.display = "none";
    formHalf.style.filter = "none";
    postDisplay.style.filter = "none";
}
updateBtn.addEventListener("click", event => {
  if (modalForm.checkValidity()) {
    event.preventDefault();
    updateBlogPost();
    alert("Post updated!");
    unBlurBackground()
  }
});

const recollection = () => {
  for (let i = 0; i <= recall.length; i++) {
    const newBlogPost = document.createElement("div");
    newBlogPost.setAttribute("id", recall[i].id);
    newBlogPost.innerHTML = `${recall[i].title}:<br>${recall[i].body}<br><button class="remove-from-list" aria-label="Delete">Delete</button> <button class="edit" aria-label="Edit">Edit</button>`;
    postDisplay.appendChild(newBlogPost);
  }
};


postDisplay.addEventListener("click", event => {
  if (event.target.classList.contains("remove-from-list")) {
    const postId = event.target.closest("div").id;
    const blogPost = document.getElementById(`${postId}`);
    const blogPostIndex = recall.findIndex(
        (postObject) => postObject.id == postId
    );
    postDisplay.removeChild(blogPost);
    recall.splice(blogPostIndex, 1);
    localStorage.setItem("savedPosts", JSON.stringify(recall));

  } else if (event.target.classList.contains("edit")) {
    const postId = event.target.closest("div").id;
    const blogPost = document.getElementById(`${postId}`);
    const blogPostIndex = recall.findIndex(
      (postObject) => postObject.id == postId
    );
    blurBackground()
    titleModal.value = recall[blogPostIndex].title;
    bodyModal.value = recall[blogPostIndex].body;
    recall.splice(blogPostIndex, 1);
    postDisplay.removeChild(blogPost);
  }
});

window.addEventListener("load", (event) => {
  recollection();
});

clearBtn.addEventListener("click", (event) => {
  localStorage.clear();
  window.location.reload();
});
