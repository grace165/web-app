const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")
const studyGroupID2 = localStorage.getItem("studyGroupID2")

async function DisplayParticipants() {
    console.log('inside participants.js functions')
    const p = document.querySelector("p")

    const url = new URL("https://api-server-1.azurewebsites.net/studygroups?")
    //const url = new URL("http://127.0.0.1:3000/studygroups?")

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
        console.log("Getting info...")

        for (const key in obj) {
            var myobj = obj[key]
            if (studyGroupID2 == myobj._id) {
                console.log(myobj._id)
                //for (const key in obj) {
                console.log("for loop")
                //var myobj = obj[key]

                let owner = myobj.owner

                const url = new URL("https://api-server-1.azurewebsites.net/user/" + owner)

                //:id endpoint
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                let response = await fetch(url, options)
                const obj0 = await response.json()

                if (response.status == 200) {
                    const ownerDiv = document.createElement("div")

                    const here1 = document.createElement("p")
                    here1.innerHTML = "Owner: " + obj0.username
                    here1.className = "h1"
                    ownerDiv.append(here1)
                    p.append(ownerDiv)

                    console.log(JSON.stringify("participants: " + myobj.participants))

                    for (let i = 0; i < myobj.participants.length; i++) {
                        console.log("in for loop")
                        if (userid == obj0._id) {
                            if (i = 1) {
                                console.log("creating message button")
                                const msgButton = document.createElement("button")
                                msgButton.innerHTML = "Message"
                                msgButton.className = "msgbtn"
                                msgButton.id = "msgButton"

                                let value = obj0._id

                                msgButton.addEventListener('click', function () {
                                    Message(value)
                                })

                                ownerDiv.append(msgButton)
                            }
                        }
                        else if (userid == myobj.participants[i]) {
                            console.log("creating message button")
                            const msgButton = document.createElement("button")
                            msgButton.innerHTML = "Message"
                            msgButton.className = "msgbtn"
                            msgButton.id = "msgButton"

                            let value = obj0._id

                            msgButton.addEventListener('click', function () {
                                Message(value)
                            })

                            ownerDiv.append(msgButton)

                        }
                    }
                }


                //if (studyGroupID2 == myobj._id) {
                console.log(myobj._id)
                console.log("inside if statement")
                //document.getElementById("p").value = myobj.participants
                for (let i = 0; i < myobj.participants.length; i++) {

                    let currentID = myobj.participants[i]
                    console.log("ID: " + currentID)

                    //const url = new URL("http://127.0.0.1:3000/user/" + currentID)
                    const url = new URL("https://api-server-1.azurewebsites.net/user/" + currentID)

                    //:id endpoint
                    const options = {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }

                    let response = await fetch(url, options)
                    const obj2 = await response.json()

                    console.log("obj: " + JSON.stringify(obj2))

                    if (response.status == 200) {
                        console.log("Getting participants...")

                        const participantDiv = document.createElement("div")

                        const here = document.createElement("p")
                        here.innerHTML = [i + 1] + ". " + obj2.username
                        here.className = "h1"
                        participantDiv.append(here)
                        p.append(participantDiv)

                        //if participant or owner show button
                        for (let i = 0; i < myobj.participants.length; i++) {
                            if (userid == obj0._id) {
                                if (i = 1) {
                                    const msgButton = document.createElement("button")
                                    msgButton.innerHTML = "Message"
                                    msgButton.className = "msgbtn"
                                    msgButton.id = "msgButton"

                                    let value = currentID

                                    msgButton.addEventListener('click', function () {
                                        Message(value)
                                    })

                                    participantDiv.append(msgButton)
                                }
                            } else if (userid == myobj.participants[i]) {
                                const msgButton = document.createElement("button")
                                msgButton.innerHTML = "Message"
                                msgButton.className = "msgbtn"
                                msgButton.id = "msgButton"

                                let value = currentID

                                msgButton.addEventListener('click', function () {
                                    Message(value)
                                })

                                participantDiv.append(msgButton)
                            }
                        }
                    }
                    else {
                        console.log("something went wrong")
                        p.innerHTML = "Something went wrong."

                        setTimeout(() => {
                            location.href = "searchStudyGroups.html"
                        }, 4000)
                    }
                }
            } else {
                console.log("error in first step")
            }
        }
    }
}


function Message(value) {
    console.log("messaging window opening")

    localStorage.setItem("participantID", value)
    console.log(localStorage.getItem("participantID"))

    window.location.href = "message.html"
}

DisplayParticipants()