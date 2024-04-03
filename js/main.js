const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")
const owned = localStorage.getItem("owned")


console.log("token: " + token)
//console.log(localStorage.getItem("data"))

document.getElementById("logoutButton").addEventListener('click', async (event) => {
    localStorage.getItem("data")
    localStorage.removeItem("data")

    var item = localStorage.getItem("data")
    console.log("logged out! ")

    localStorage.removeItem("token")

    location.href = "index.html"
})

if (owned !== null) {
    url.searchParams.append("owned", owned)
}

//const url = new URL("http://127.0.0.1:3000/studygroups?")
const url = new URL("https://api-server-1.azurewebsites.net/studygroups?")

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    },
    //body: JSON.stringify(data)
}

let response = fetch(url, options)
const obj = response.json()

if (response.status == 200) {
    let here1 = document.getElementById("here1")
    here1.replaceChildren()

    for (const key in obj) {
        var myobj = obj[key]

        if (key > 0) {
            const hr = document.createElement('hr')
            here.appendChild(hr)
        }

        const studygroupName = document.createElement("h3")
        studygroupName.innerHTML = "Study Group: " + myobj.name
        here.appendChild(studygroupName)

        const schoolName = document.createElement("h4")
        schoolName.innerHTML = "School: " + myobj.school
        here.appendChild(schoolName)

        const courseNum = document.createElement("h4")
        courseNum.innerHTML = "Course number: " + myobj.course_number
        here.appendChild(courseNum)

        const descript = document.createElement("h4")
        descript.innerHTML = "Description: " + myobj.description
        here.appendChild(descript)

        const public = document.createElement("h4")
        public.innerHTML = "Is public?: " + myobj.is_public
        here.appendChild(public)

        const maxParties = document.createElement("h4")
        maxParties.innerHTML = "Max Participants: " + myobj.max_participants
        here.appendChild(maxParties)

        const starter = document.createElement("h4")
        starter.innerHTML = "Start date: " + myobj.start_date.substring(0, 10)
        here.appendChild(starter)

        const ender = document.createElement("h4")
        ender.innerHTML = "End date: " + myobj.end_date.substring(0, 10)
        here.appendChild(ender)

        const meetings = document.createElement("h4")
        meetings.innerHTML = "Meeting Times: "
        here.appendChild(meetings)

        var myobj1 = obj[key].meeting_times

        for (var i = 0; i < myobj1.length; i++) {
            if (i > 0) {
                const hr2 = document.createElement('h6')
                here.appendChild(hr2)
            }
            const details = document.createElement("h5")
            details.innerHTML = "Day: " + myobj1[i].day
            here.appendChild(details)

            const details1 = document.createElement("h5")
            details1.innerHTML = "Time: " + myobj1[i].time
            here.appendChild(details1)

            const details2 = document.createElement("h5")
            details2.innerHTML = "Location: " + myobj1[i].location
            here.appendChild(details2)
        }

        console.log("study group owner id: " + myobj.owner)

        if (myobj.owner == userid) {
            const editButton = document.createElement("button")
            //studygroupID = myobj._id
            editButton.className = "editButton"
            editButton.innerHTML = "Edit Group"

            let value = myobj._id

            editButton.addEventListener('click', function () {
                EditStudyGroup(value)
            })
            here.appendChild(editButton)

            const deleteButton = document.createElement("button")
            deleteButton.className = "deleteButton"
            deleteButton.innerHTML = "Delete Group"

            deleteButton.addEventListener('click', function () {
                DeleteStudyGroup(value)
            })

            const space = document.createElement("div")
            space.className = "space2"
            here.append(space)

            here.append(deleteButton)
        }
        else {
            //if not in participants array, show join button
            let participants = []
            participants = myobj.participants

            const varButton = document.createElement("button")
            varButton.className = "deleteButton"
            here.append(varButton)
            for (let i = 0; i < myobj.max_participants; i++) {
                console.log("inside for loop")
                if (participants.includes(userid) == true) {
                    console.log("inside if statement")
                    varButton.innerHTML = "Leave"
                }
                else if (participants == null) {
                    //(participants.includes(userid) == false) {
                    varButton.innerHTML = "Join"
                }
            }
        }
    }
} else {
    console.log("in else block")
    h2.innerHTML = 'Please try searching again...'
}


//display owned study groups


//display joined study groups