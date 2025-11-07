

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
const clearBtn = document.getElementById("clearBtn")


submitBtn.addEventListener("click",function(event){
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
        window.location.reload()
        alert("Form Submitted Successfully")
        createBlogPost()
    }

})


const createBlogPost =()=>{
    let recall;
    try {
        recall = JSON.parse(localStorage.getItem('savedPosts'))
    } catch (error) {
        console.error('Error parsing items from localStorage', e)
        recall = null
    }
    if(recall == null){
        recall = []
    }
    const postObject = {
        title: titleInput.value,
        body: bodyInput.value,
        id: recall.length
    }
    recall.push(postObject)
    localStorage.setItem('savedPosts', JSON.stringify(recall))
    const newBlogPost = document.createElement("div")
    newBlogPost.setAttribute("id", recall.length-1)
    const blogPostIndex = recall.findIndex(postObject => postObject.id == newBlogPost.id)
    newBlogPost.innerHTML = `${recall[blogPostIndex].title}:<br>${recall[blogPostIndex].body}<br><button class="remove-from-list">Delete</button> <button class="edit">Edit</button>`
    postDisplay.appendChild(newBlogPost)
    bodyInput.value = ''
    titleInput.value = ''
}

    let recall;
    try {
        recall = JSON.parse(localStorage.getItem('savedPosts'))
    } catch (error) {
        console.error('Error parsing items from localStorage', e)
        recall = null;
    }
const updateBlogPost =()=>{

    const postObject = {
        title: titleModal.value,
        body: bodyModal.value,
        id: recall.length
    }
    recall.push(postObject)
    const newBlogPost = document.createElement("div")
    newBlogPost.setAttribute("id", recall.length-1)
    const blogPostIndex = recall.findIndex(postObject => postObject.id == newBlogPost.id)
    newBlogPost.innerHTML = `${recall[blogPostIndex].title}:<br>${recall[blogPostIndex].body}<br><button class="remove-from-list">Delete</button> <button class="edit">Edit</button>`
    postDisplay.appendChild(newBlogPost)
    localStorage.setItem('savedPosts', JSON.stringify(recall))
}

postDisplay.addEventListener('click', (event) => {

if (event.target.classList.contains('remove-from-list')) {
    const postId = event.target.closest('div').id;
    const blogPost = document.getElementById(`${postId}`)
    const blogPostIndex = recall.findIndex(postObject => postObject.id == postId)
    postDisplay.removeChild(blogPost);
    recall.splice((blogPostIndex), 1)
    localStorage.setItem('savedPosts', JSON.stringify(recall))
} else if(event.target.classList.contains("edit")){
    const postId = event.target.closest('div').id;
    const blogPost = document.getElementById(`${postId}`)
    const blogPostIndex = recall.findIndex(postObject => postObject.id == postId)
    modalUpdate.style.display = "block";
    formHalf.style.filter = 'blur(5px)'
    postDisplay.style.filter = 'blur(5px)'
    titleModal.value = recall[blogPostIndex].title
    bodyModal.value = recall[blogPostIndex].body
    postDisplay.removeChild(blogPost);
    recall.splice(blogPostIndex, 1)
    localStorage.setItem('savedPosts', JSON.stringify(recall))
    alert(buttonPressed)
}
});

    updateBtn.addEventListener("click", (event)=>{
    if(event.target.classList.contains('updateBtn')){
    }
    if (modalForm.checkValidity()){
        updateBlogPost()
        alert("Post updated!")
        modalUpdate.style.display = 'none'
        formHalf.style.filter = 'none'
        postDisplay.style.filter = 'none'
}
})

// const savePosts = arr =>{
//     let savedPosts;
//     try {
//         savedPosts = JSON.parse(localStorage.getItem('savedPosts'))
//     } catch (error) {
//         console.error('Error parsing items from localStorage', e)
//         savedPosts = null;
//     }
//     for(let i=0; i <= arr.length; i++){
//         savedPosts.push(arr[i])
//     }
//     localStorage.setItem('savedPosts', JSON.stringify(savedPosts))
//     console.log(localStorage.getItem('savedPosts'))
// }
const recollection = ()=>{

    for(let i=0; i <= recall.length; i++){
    const newBlogPost = document.createElement("div")
    newBlogPost.setAttribute("id", recall[i].id)
    newBlogPost.innerHTML = `${recall[i].title}:<br>${recall[i].body}<br><button class="remove-from-list">Delete</button> <button class="edit">Edit</button>`
    postDisplay.appendChild(newBlogPost)
    }
}

window.addEventListener("load", (event)=>{
    recollection()
    clearBtn.style.display='block'
})

clearBtn.addEventListener("click", (event)=>{
    localStorage.clear()
    window.location.reload()
})