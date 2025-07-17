const addUser = document.querySelector('#add-user-form');
const getUser = document.querySelector('#user-btn');
const output = document.querySelector('#output');
const delUser = document.querySelector('#delete-post-form');
const updateUser = document.querySelector('#update-post-form');

async function getMe () {
    try {
        const res = await fetch("http://localhost:8008/api/users", {
          method: "GET",
          credentials: "include",
          // see why the hell is it set to true ?
        });

        if (res.status === 401 || res.status === 403) {
          window.location.href = "/admin/login";
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const result = await res.json();
        console.log("API Response:", result);

        const users = result.data;  // adjust based on actual API structure

        output.innerHTML = "";

        users.forEach((user) => {
          const postEl = document.createElement("div");
          postEl.textContent = user._id;
          output.appendChild(postEl);
        });
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
}

async function postUser(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const _id = formData.get("id");
  const name = formData.get("name");
  const salary = formData.get("salary");

  try {
    const res = await fetch("http://localhost:8008/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      credentials: "include",
      body: JSON.stringify({ _id , name , salary }),
    });

    if (!res.ok) {
      throw new Error("Failed to add new Post");
    }

    const result = await res.json();
    const postEl = document.createElement("div");
    postEl.textContent = result._id;  
    output.appendChild(postEl);
    console.log("Appended");
    getMe();
  } catch (err) {
    console.error("Failed to post :", err);
    return alert('Id Already exists !')
  }
  this.reset();
}

async function deleteUser(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const id = formData.get("deleteId");
  try {
    const userDelete = await fetch(`http://localhost:8008/api/users/${id}`,{
      method : "DELETE",
      credentials: "include",
    })
    if(!userDelete){
      throw new Error('Invalid user id')
    }
  } catch (error) {
    throw new Error(error.message);
  }
  this.reset();
}

async function updateById(e){
  e.preventDefault();
  const formData = new FormData(this);
  const id = formData.get("updateId");
  const name = formData.get("updateName")
  const salary = formData.get("updateSalary");

  try {
    const userUpdate = await fetch(`http://localhost:8008/api/users/${id}`,{
      method : "PUT",
      credentials: "include",
      headers : {
        "Content-Type":"application/json"
      },
      body : JSON.stringify({ name , salary })
    })
    if(!userUpdate){
      throw new Error(`User ${id} not found`);
    }
    console.log(`Updated user ${id}`);
  } catch (error) {
    throw new Error(error.message);
  }
  this.reset();
}


getUser.addEventListener('click',getMe);
addUser.addEventListener('submit',postUser);
delUser.addEventListener('submit',deleteUser);
updateUser.addEventListener('submit',updateById);