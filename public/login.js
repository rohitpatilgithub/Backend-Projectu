const logIn = document.querySelector('#login-form');

async function userLogin(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
        const userData = await fetch("http://localhost:8008/admin/login",{
            method : "POST",
            headers : {
                "Content-Type":"application/json",
            },
            credentials : "include",
            body : JSON.stringify({ email , password })
        })
        if(!userData.ok){
            throw new Error('Failed to add new User login')
        }
        window.location.href = "/admin/crud"
    } catch (error) {
        console.error("Failed to post :", error);
        window.location.href = "/admin/signup"
    }
}

window.addEventListener("pageshow", () => {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
});

logIn.addEventListener('submit',userLogin);