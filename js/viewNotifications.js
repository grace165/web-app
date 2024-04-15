const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")
const studyGroupID2 = localStorage.getItem("studyGroupID2")


console.log('inside view notifications.js functions')
const p = document.querySelector("p")

const url = new URL("https://api-server-1.azurewebsites.net/notification")
//const url = new URL("http://127.0.0.1:3000/notification")

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    }
}

let response = await fetch(url, options)
const obj = await response.json()

if (response.status == 200) {
    console.log("inside get endpoint function")

    for (const key in obj) {
        var myobj = obj[key]

        if (key > 0) {
            const hr = document.createElement('hr')
            p.appendChild(hr)
        }

        let owner = myobj.sender

        const url = new URL("https://api-server-1.azurewebsites.net/user/" + owner)

        //:id endpoint
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        let ownerinfo = ""

        let response = await fetch(url, options)
        const obj0 = await response.json()

        if (response.status == 200) {
            ownerinfo = obj0.username    
        }

        const sender = document.createElement("p")
        sender.innerHTML = "Sender: " + ownerinfo
        p.append(sender)

        console.log("Sender: " + JSON.stringify(obj.sender))

        const subject = document.createElement("p")
        subject.innerHTML = "Subject: " + myobj.subject
        p.append(subject)

        const body = document.createElement("p")
        body.innerHTML = "Body: "  + myobj.body
        p.append(body)
    }
} else {
    console.log("error in first step")
}