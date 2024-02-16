document.getElementById("loginButton").addEventListener('click', async (event) => {
    event.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    console.log("inside fetchToEndpointUsingPostMethod")
    const mssg7 = document.querySelector("#message7")

    const url = "http://127.0.0.1:3000/user/login"

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

    if (response.status == 200) {
        console.log("saving user obj and token in local storage")
        localStorage.setItem("data", JSON.stringify(data))
        localStorage.setItem("token", obj.token);

        // localStorage.setItem("token", response.options.token)
        //localStorage.setItem("token", response.data.token)

        localStorage.getItem("token")
    

        var retrievedData = localStorage.getItem("data")

        console.log("retrievedData: ", JSON.parse(retrievedData))

        console.log('redirecting')
        location.href = "main.html"
    }
    else if (response.status == 500) {
        //var paragraph = document.getElementById("p")
        //paragraph.textContent += "Please try logging in again!"
        const para = document.createElement("p")
        const node = document.createTextNode("Please try logging in again!")
        para.appendChild(node)

        const element = document.getElementById("divp")
        const child = document.getElementById("btn")
        element.insertBefore(para, child)
        //element.appendChild(para)

        // document.getElementById("p").innerHTML = "Please try logging in again!"

    }
    else if (response.status == 401) {
        console.log("not redirecting")
        paragraph.textContent += "Please try logging in again!"
        mssg7.innerHTML = "Error: " + obj.message
    }
})

