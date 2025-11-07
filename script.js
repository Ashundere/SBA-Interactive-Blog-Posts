

posts=[]
const titleInput = document.getElementById("title")
const titleInputError = document.getElementById("titleInputError")
const bodyInput = document.getElementById("bodyText")
const bodyInputError = document.getElementById("bodyInputError")
const submitBtn = document.getElementById("submitButton")
const blogForm = document.getElementById("blog-form")
const template = document.getElementById("template")
const postDisplay = document.getElementById("blog-posts-display")
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
        console.log(posts)
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

}

postDisplay.addEventListener('click', (event) => {
const postId = event.target.closest('div').id;
const blogPost = document.getElementById(`${postId}`)
const blogPostIndex = posts.findIndex(postObject => postObject.id == postId)
if (event.target.classList.contains('remove-from-list')) {
    postDisplay.removeChild(blogPost);
    posts.splice(blogPostIndex, 1)
} else if(event.target.classList.contains("edit")){
    alert("edit button pressed");
}
});