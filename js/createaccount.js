document.getElementById("createButton").addEventListener('click', async (event) => {
    event.preventDefault()

    const h2 = document.querySelector("h2")

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const email = document.getElementById("email").value
    const school = document.getElementById("school").value
    const major = document.getElementById("major").value

    console.log("inside fetchToEndpointUsingPostMethod")
    const mssg7 = document.querySelector("#message7")

    const url = "http://127.0.0.1:3000/user"
    console.log("past url")

    const data = {
        code: 7,
        username,
        password,
        email,
        school,
        major
    }

    console.log(data)

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)
    console.log(options)
    const obj = await response.json()

    if (response.status == 201) {
        console.log('redirecting')

        h2.innerHTML = 'Please check your email and click on the link we sent to verify your account'

        setTimeout(() => {
            location.href = "main.html"
        }, 8000)
    }
    else if (response.status == 401) {
        console.log("error in creating account, 401")
    }
})

