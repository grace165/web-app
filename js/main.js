const token = localStorage.getItem("token");

console.log("token: " + token)
//console.log(localStorage.getItem("data"))

document.getElementById("logoutButton").addEventListener('click', async (event) => {
    localStorage.getItem("data")
    localStorage.removeItem("data")

    var item = localStorage.getItem("data")
    console.log("logged out! ")

    localStorage.removeItem("token")

    location.href = "index.html"
})