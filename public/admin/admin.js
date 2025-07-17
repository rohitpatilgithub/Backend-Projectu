const addAdmin = document.querySelector('#login-form');

async function addNewAdmin (e){
    e.preventDefault();
    const formData = new FormData(this);
    const name = formData.get('fullname');
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        const addNew = await fetch("http://localhost:8008/admin/signup",{
            method : "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body : JSON.stringify({ name , email , password })
        })
        if(!addNew){
            throw new Error('Failed to add new User login')
        }
        window.location.href = "/admin/login"
    } catch (error) {
        console.error("Failed to post :", error);
        window.location.href = "/admin/signup"
    }
}

addAdmin.addEventListener('submit',addNewAdmin);