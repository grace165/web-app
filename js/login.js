document.getElementById("loginButton").addEventListener('click', async (event) => {
    event.preventDefault()

    const h2 = document.querySelector("h2")

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    console.log("inside fetchToEndpointUsingPostMethod")

    //const url = "http://127.0.0.1:3000/user/login"
    const url = "https://api-server-1.azurewebsites.net/user/login"

    const data = {
        code: 7,
        email,
        password
    }

    console.log(data)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //line for tokens?
            //Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)
    const obj = await response.json()

    console.log("looking for else block")

    if (response.status == 200) {
        localStorage.clear()
        console.log("saving user obj and token in local storage")
        localStorage.setItem("data", JSON.stringify(data))
        localStorage.setItem("token", obj.token)
        localStorage.setItem("userid", obj.user._id)
        localStorage.setItem("ig_username", obj.user.ig_username)
        localStorage.setItem("ig_password", obj.user.ig_password)

        localStorage.getItem("token")
        localStorage.getItem("userid")
    
        var retrievedData = localStorage.getItem("data")

        console.log("retrievedData: ", JSON.parse(retrievedData))

        h2.innerHTML = 'Logging in...'
        console.log('redirecting')

        setTimeout(() => {
            location.href = "main.html"
        }, 4000)

    } else if (response.status == 500) {
        console.log ("in else block")
        h2.innerHTML = 'Please try logging in again'
    }
})

