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
                    var myobj = obj[key]

                    //if (studyGroupID2 == myobj._id) {
                    console.log(myobj._id)
                    console.log("inside if statement")
                    //document.getElementById("p").value = myobj.participants
                    for (let i = 0; i < myobj.participants.length; i++) {

                        let currentID = myobj.participants[i]
                        console.log("ID: " + currentID)

                        //const url = new URL("http://127.0.0.1:3000/user/" + currentID)
                        const url = new URL("https://api-server-1.azurewebsites.net/user/" + studyGroupID)

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

                            const here = document.createElement("p")
                            here.innerHTML = [i +1] + ". " + obj2.username
                            here.className = "h1"
                            p.append(here)
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

DisplayParticipants()