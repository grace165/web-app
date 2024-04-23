const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")
const owned = localStorage.getItem("owned")

console.log("token: " + token)
//console.log(localStorage.getItem("data"))

document.getElementById("updateButton").addEventListener('click', async (event) => {
    event.preventDefault()

    const ig_username = document.getElementById("ig_username").value
    const ig_password = document.getElementById("ig_password").value

    const h2 = document.querySelector("h2")

    //const url = "http://127.0.0.1:3000/studygroup"
    const url = "https://api-server-1.azurewebsites.net/user/insta"

    console.log("update function")

    const data = {
        ig_username,
        ig_password
    }

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)

    if (response.status == 200) {
        console.log("Updating info...")
        //console.log(obj.message)
        console.log("redirecting...")

        h2.innerHTML = "Updating Instagram Info..."

        localStorage.setItem("ig_username", ig_username)
        localStorage.setItem("ig_password", ig_password)

        setTimeout(() => {
            location.href = "main.html"
        }, 4000)

    } else {
        console.log("in else block")
        h2.innerHTML = 'Please try updating again...'
    }
})