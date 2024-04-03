const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")
const studyGroupID = localStorage.getItem("studyGroupID")

const h3 = document.querySelector("h3")

let meetingTime = {
    "day": "",
    "time": "",
    "location": ""
}

meeting_times = []

async function getSGInfo() {
    console.log("fetching info from study group")

    //const url = new URL("http://127.0.0.1:3000/studygroups?")
    const url = new URL("https://api-server-1.azurewebsites.net/studygroups?")

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

            if (studyGroupID == myobj._id) {
                document.getElementById("sgTitle").innerHTML = myobj.name
                document.getElementById("groupname").value = myobj.name
                document.getElementById("description").value = myobj.description
                document.getElementById("school").value = myobj.school
                document.getElementById("courseNum").value = myobj.course_number
                document.getElementById("maxParticipants").value = myobj.max_participants
                document.getElementById("startDate").value = myobj.start_date.substring(0, 10)
                document.getElementById("endDate").value = myobj.end_date.substring(0, 10)

                if (myobj.is_public == true) {
                    document.getElementById("public").checked = true
                }
                else {
                    document.getElementById("private").checked = true
                }

                //populate meeting times

                var myobj1 = myobj.meeting_times

                for (var i = 0; i < myobj1.length; i++) {
                    if (i > 0) {
                        const hr2 = document.createElement('h6')
                        here.appendChild(hr2)
                    }

                    let divid = "div: " + i

                    let container = document.createElement("div")
                    container.id = divid
                    container.style.backgroundColor = "white"
                    container.style.width = "425px"
                    here.appendChild(container)

                    const details = document.createElement("label")
                    details.innerHTML = "Day"

                    const details0 = document.createElement("input")
                    details0.type = "String"
                    details0.id = "day"
                    details0.value = myobj1[i].day

                    container.appendChild(details)
                    container.appendChild(details0)

                    const details1 = document.createElement("label")
                    details1.innerHTML = "Time"

                    const details2 = document.createElement("input")
                    details2.type = "time"
                    details2.id = "time"
                    details2.value = myobj1[i].time

                    container.appendChild(details1)
                    container.appendChild(details2)

                    const details3 = document.createElement("label")
                    details3.innerHTML = "Location"

                    const details4 = document.createElement("input")
                    details4.type = "String"
                    details4.id = "location"
                    details4.value = myobj1[i].location

                    container.appendChild(details3)
                    container.appendChild(details4)

                    const deleteBtn = document.createElement("button")
                    deleteBtn.className = "btn"
                    deleteBtn.innerHTML = "Delete"
                    deleteBtn.id = "deleteBtn"
                    deleteBtn.type = "button"
                    //deleteBtn.onclick = deleteButton(meeting_times[i])
                    deleteBtn.addEventListener('click', async (event) => {
                        deleteButton(divid)
                    })

                    container.appendChild(deleteBtn)

                    //where deletebtn was previously located

                    meetingTime = {
                        "day": myobj1[i].day,
                        "time": myobj1[i].time,
                        "location": myobj1[i].location
                    }

                    meeting_times[i] = meetingTime
                }
            }
        }
    }
}

document.getElementById("addMeetingTimeBtn").addEventListener('click', async (event) => {
    event.preventDefault()
    console.log("inside add meeting time button")

    let divid = "div: " + (meeting_times.length)

    const hr3 = document.createElement('h6')
    here.appendChild(hr3)

    let container = document.createElement("div")
    container.id = divid
    container.style.backgroundColor = "white"
    container.style.width = "425px"
    here.appendChild(container)


    const newdetails = document.createElement("label")
    newdetails.innerHTML = "Day"

    const newdetails0 = document.createElement("input")
    newdetails0.type = "String"
    newdetails0.id = "day"
    newdetails0.value = "Day"

    container.appendChild(newdetails)
    container.appendChild(newdetails0)

    const newdetails1 = document.createElement("label")
    newdetails1.innerHTML = "Time"

    const newdetails2 = document.createElement("input")
    newdetails2.type = "time"
    newdetails2.id = "time"

    container.appendChild(newdetails1)
    container.appendChild(newdetails2)

    const newdetails3 = document.createElement("label")
    newdetails3.innerHTML = "Location"

    const newdetails4 = document.createElement("input")
    newdetails4.type = "String"
    newdetails4.id = "location"
    newdetails4.value = "Location"

    container.appendChild(newdetails3)
    container.appendChild(newdetails4)

    const deleteBtn = document.createElement("button")
    deleteBtn.className = "btn"
    deleteBtn.innerHTML = "Delete"
    deleteBtn.id = "deleteBtn"
    deleteBtn.type = "button"
    container.appendChild(deleteBtn)

    deleteBtn.addEventListener('click', async (event) => {
        deleteButton(divid)
    })

    meetingTime = {
        "day": day,
        "time": time,
        "location": location
    }

    for (let i = 0; i < meeting_times.length + 1; i++) {
        if (meeting_times[i] == null) {
            meeting_times[i] = meetingTime
            return
        }
        console.log("ready to return meeting times")
        //return meeting_times
    }
})

function deleteButton(id) {
    console.log("ID: " + id)

    document.getElementById(id).remove()

    //console.log("sliced id: " + id.slice(5))

    meeting_times = meeting_times.filter(element => {
        return element !== null && element !== undefined
    })

    console.log("Old meeting_times: " + JSON.stringify(meeting_times))

    const slicedID = id.slice(5)
    meeting_times = meeting_times.filter(element => {
        return element !== meeting_times[slicedID]
    })

    console.log("New meeting_times: " + JSON.stringify(meeting_times))
}

getSGInfo()

document.getElementById("saveChangesBtn").addEventListener('click', async (event) => {
    event.preventDefault()

    console.log("inside save changes")

    const name = document.getElementById("groupname").value
    const is_public = document.querySelector('input[name="options"]:checked').value
    const description = document.getElementById("description").value
    const school = document.getElementById("school").value
    const course_number = document.getElementById("courseNum").value
    const max_participants = document.getElementById("maxParticipants").value
    const start_date = document.getElementById("startDate").value
    const end_date = document.getElementById("endDate").value

    var dayArr = document.querySelectorAll("input[id='day']")
    var timeArr = document.querySelectorAll("input[id='time']")
    var locationArr = document.querySelectorAll("input[id='location']")

    for (const key in meeting_times) {
        //console.log(meeting_times[key])
        meeting_times[key].day = dayArr[key].value
        meeting_times[key].time = timeArr[key].value
        meeting_times[key].location = locationArr[key].value
    }
    console.log(meeting_times)

    //const url = new URL("http://127.0.0.1:3000/studygroup/" + studyGroupID)
    const url = new URL("https://api-server-1.azurewebsites.net/studygroup/" + studyGroupID)

    const data = {
        name,
        is_public,
        description,
        school,
        course_number,
        max_participants,
        start_date,
        end_date,
        meeting_times
    }

    console.log(data)

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)
    //const obj = await response.json()

    if (response.status == 200) {
        console.log("Saving Changes...")

        h3.innerHTML = "Saving Changes..."

        setTimeout(() => {
            location.href = "main.html"
        }, 4000)

    } else {
        console.log("in else block")
        h3.innerHTML = 'Please try saving your changes again...'

        setTimeout(() => {
            location.href = "searchStudyGroups.html"
        }, 4000)
    }

})
