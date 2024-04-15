const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")
const studyGroupID2 = localStorage.getItem("studyGroupID2")
const participantID = localStorage.getItem("participantID")

const h2 = document.querySelector("h2")

document.getElementById("messageButton").addEventListener('click', async (event) => {
    event.preventDefault()
    console.log('inside message.js functions')

    const subject = document.getElementById("subject").value
    const notification_type = document.querySelector('input[name="notificationType"]:checked').value
    const body = document.getElementById("body").value
    const receiver = participantID
    const studyGroupId = studyGroupID2
    const sender = userid
    const is_read = false

    const url = new URL("https://api-server-1.azurewebsites.net/notification")
    //const url = new URL("http://127.0.0.1:3000/notification")

    const data = {
        subject,
        notification_type,
        body,
        receiver, 
        studyGroupId,
        sender,
        is_read
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    console.log(data)

    let response = await fetch(url, options)
    //const obj = await response.json()

    if (response.status == 201) {
        console.log("Sending Notification...")

        console.log("redirecting...")

        h2.innerHTML = "Sending Notification..."

        setTimeout(() => {
            location.href = "main.html"
        }, 4000)

    } else {
        console.log("in else block")
        h2.innerHTML = 'Error in sending message...'
    }
})