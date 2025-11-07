

posts=[]
const titleInput = document.getElementById("title")
const titleInputError = document.getElementById("titleInputError")
const titleModal = document.getElementById("titleModal")
const bodyInput = document.getElementById("bodyText")
const bodyInputError = document.getElementById("bodyInputError")
const bodyModal = document.getElementById("bodyTextModal")
const submitBtn = document.getElementById("submitButton")
const blogForm = document.getElementById("blog-form")
const modalForm = document.getElementById("modal-blog-form")
const template = document.getElementById("template")
const postDisplay = document.getElementById("blog-posts-display")
const modalUpdate = document.getElementById("modalForm")
const updateBtn = document.getElementById("updateButton")
const formHalf = document.getElementById("form-half")

buttonPressed = 0

submitBtn.addEventListener("click",function(event){
    event.preventDefault()
    if(!titleInput.validity.valid){
        titleInputError.textContent = "Please enter a title"
        titleInput.focus()
    } else{
        titleInputError.textContent = ''
    }
    if(!bodyInput.validity.valid){
        bodyInputError.textContent = "Please enter a message"
        bodyInput.focus()
    } else{
        bodyInputError.textContent = ''
    }
    if (blogForm.checkValidity()){
        alert("Form Submitted Successfully")
        createBlogPost()
    }

})


const createBlogPost =()=>{
    const postObject = {
        title: titleInput.value,
        body: bodyInput.value,
        id: buttonPressed
    }
    posts.push(postObject)
    savePosts(posts)
    const newBlogPost = document.createElement("div")
    newBlogPost.setAttribute("id", buttonPressed)
    const blogPostIndex = posts.findIndex(postObject => postObject.id == newBlogPost.id)
    newBlogPost.innerHTML = `${posts[blogPostIndex].title}:<br>${posts[blogPostIndex].body}<br><button class="remove-from-list">Delete</button> <button class="edit">Edit</button>`
    postDisplay.appendChild(newBlogPost)
    buttonPressed ++
    bodyInput.value = ''
    titleInput.value = ''
}

const updateBlogPost =()=>{
    const postObject = {
        title: titleModal.value,
        body: bodyModal.value,
        id: buttonPressed
    }
    posts.push(postObject)
    const newBlogPost = document.createElement("div")
    newBlogPost.setAttribute("id", buttonPressed)
    const blogPostIndex = posts.findIndex(postObject => postObject.id == newBlogPost.id)
    newBlogPost.innerHTML = `${posts[blogPostIndex].title}:<br>${posts[blogPostIndex].body}<br><button class="remove-from-list">Delete</button> <button class="edit">Edit</button>`
    postDisplay.appendChild(newBlogPost)
    buttonPressed ++
    savePosts(posts)
}

postDisplay.addEventListener('click', (event) => {
const postId = event.target.closest('div').id;
const blogPost = document.getElementById(`${postId}`)
const blogPostIndex = posts.findIndex(postObject => postObject.id == postId)
if (event.target.classList.contains('remove-from-list')) {
    postDisplay.removeChild(blogPost);
    posts.splice(blogPostIndex, 1)
} else if(event.target.classList.contains("edit")){
    modalUpdate.style.display = "block";
    formHalf.style.filter = 'blur(5px)'
    postDisplay.style.filter = 'blur(5px)'
    titleModal.value = posts[blogPostIndex].title
    bodyModal.value = posts[blogPostIndex].body
    postDisplay.removeChild(blogPost);
    posts.splice(blogPostIndex, 1)
}
});

    updateBtn.addEventListener("click", (event)=>{
    if(event.target.classList.contains('updateBtn')){
        event.preventDefault()
    }
    if (modalForm.checkValidity()){
        updateBlogPost()
        alert("Post updated!")
        modalUpdate.style.display = 'none'
        formHalf.style.filter = 'none'
        postDisplay.style.filter = 'none'
}
})

const savePosts = arr =>{
    let savedPosts;
    try {
        savedPosts = JSON.parse(localStorage.getItem('savedPosts'))
    } catch (error) {
        console.error('Error parsing items from localStorage', e)
        savedPosts = null;
    }
    for(let i=0; i <= arr.length; i++){
        savedPosts.push(arr[i])
    }
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts))
    console.log(localStorage.getItem('savedPosts'))
}
const recollection =()=>{
    let recall;
    try {
        recall = JSON.parse(localStorage.getItem('savedPosts'))
    } catch (error) {
        console.error('Error parsing items from localStorage', e)
        recall = null;
    }
    for(let i=0; i <= recall.length; i++){
    const newBlogPost = document.createElement("div")
    newBlogPost.setAttribute("id", recall[i].id)
    newBlogPost.innerHTML = `${recall[i].title}:<br>${recall[i].body}<br><button class="remove-from-list">Delete</button> <button class="edit">Edit</button>`
    postDisplay.appendChild(newBlogPost)
    }
}

window.addEventListener("load", (event)=>{
    recollection()
})