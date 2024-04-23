const ig_username = localStorage.getItem("ig_username")
const ig_password = localStorage.getItem("ig_password")
const token = localStorage.getItem("token")


document.getElementById("postButton").addEventListener('click', async (event) => {
    event.preventDefault()

    const image_url = document.getElementById("jpgurl").value
    const caption = document.getElementById("caption").value

    const h2 = document.querySelector("h2")

    const url = "http://127.0.0.1:3000/user/insta-post"
    //const url = "https://api-server-1.azurewebsites.net/user/insta-post"

    console.log("inside post function")

    const data = {
        image_url,
        caption
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)

    if (response.status == 201) {
        console.log("success")
        //console.log(obj.message)
        console.log("redirecting...")

        h2.innerHTML = "Posting to Instagram..."

        setTimeout(() => {
            location.href = "main.html"
        }, 4000)

    } else {
        console.log("in posting else block")
        h2.innerHTML = 'Please try posting again...'

        setTimeout(() => {
            location.href = "main.html"
        }, 4000)
    }
})
