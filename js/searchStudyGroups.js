const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")

document.getElementById("searchButton").addEventListener('click', async (event) => {
    event.preventDefault()

    const search = document.getElementById("search").value
    const limit = document.getElementById("limit").value
    const skip = document.getElementById("skip").value
    const sortBy = document.querySelector('input[name="sortBy"]:checked').value
    const ongoing = document.querySelector('input[name="ongoing"]:checked').value
    const owned = document.querySelector('input[name="owned"]:checked').value
    const error = "cannot reach params"

    const h2 = document.querySelector("h2")

    //const url = new URL("http://127.0.0.1:3000/studygroups?")
    const url = new URL("https://api-server-1.azurewebsites.net/studygroups?")

    //let params = new URL(window.location.href)

    console.log("inside search group function")

    //append each item to url
    if (search !== null) {
        url.searchParams.append("search", search)
    }
    if (limit !== null) {
        url.searchParams.append("limit", limit)
    }
    if (skip !== null) {
        url.searchParams.append("skip", skip)
    }
    if (sortBy !== null) {
        sortByFinal = "start_date:" + sortBy
        url.searchParams.append("sortBy", sortByFinal)
    }
    if (ongoing !== null) {
        url.searchParams.append("ongoing", ongoing)
    }
    if (owned !== null) {
        url.searchParams.append("owned", owned)
        localStorage.setItem("owned", owned)
    }
    else {
        url.searchParams.append("Error", error)
    }

    const data = {
        search,
        limit,
        skip,
        sortBy,
        ongoing,
        owned
    }

    console.log(data)

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        //body: JSON.stringify(data)
    }

    let response = await fetch(url, options)
    const obj = await response.json()

    if (response.status == 200) {
        console.log("Searching study groups...")
        console.log("token: " + token)
        console.log("obj: " + JSON.stringify(obj))
        console.log("userid: " + userid)

        //const obj2 = JSON.stringify(obj)

        let here = document.getElementById("here")
        here.replaceChildren()

        h2.innerHTML = "Here are the results!"
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
                varButton.className = "varButton"

                const varButton2 = document.createElement("button")
                varButton2.className = "varButton"

                let value = myobj._id

                if (participants.includes(userid)) {
                    console.log("inside if statement")
                    here.append(varButton)
                    varButton.innerHTML = "Leave"

                    varButton.addEventListener('click', function () {
                        LeaveStudyGroup(value)
                    })
                }
                else {
                    //(participants.includes(userid) == false) {
                    here.append(varButton2)
                    varButton2.innerHTML = "Join"

                    varButton2.addEventListener('click', function () {
                        JoinStudyGroup(value)
                    })
                }
            }
        }
    } else {
        console.log("in else block")
        h2.innerHTML = 'Please try searching again...'
    }
})

function EditStudyGroup(value) {
    console.log("in edit study group function")

    localStorage.setItem("studyGroupID", value)
    console.log(localStorage.getItem("studyGroupID"))

    window.location.href = "editStudyGroup.html"
}

function DeleteStudyGroup(value) {
    console.log("in delete study group function")

    localStorage.setItem("studyGroupID", value)
    console.log(localStorage.getItem("studyGroupID"))

    window.location.href = "delete.html"
}

function LeaveStudyGroup(value) {
    console.log("inside leave study group function")

    const here3 = document.getElementById("here3")

    //const url = new URL("http://127.0.0.1:3000/studygroup/" + value + "/participants?remove")
    const url = new URL("https://api-server-1.azurewebsites.net/studygroup/" + value + "/participants?remove")

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        //body: JSON.stringify(data)
    }

    let response = fetch(url, options)
    //const obj = response.json()    

    if (response.status == 200) {
        //here3.innerHTML = "You have left this group."

        setTimeout(() => {
            location.href = "searchStudyGroups.html"
        }, 4000)
    } else {
        console.log("response status: " + response.status)
        //here3.innerHTML = "Please try leaving again"

        setTimeout(() => {
            location.href = "searchStudyGroups.html"
        }, 4000)

    }
}

function JoinStudyGroup(value) {
    console.log("inside join group function")

    const here3 = document.getElementById("here3")

    //const url = new URL("http://127.0.0.1:3000/studygroup/" + value + "/participants?add")
    const url = new URL("https://api-server-1.azurewebsites.net/studygroup/" + value + "/participants?add")

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        //body: JSON.stringify(data)
    }

    let response = fetch(url, options)
    //const obj = response.json()    

    console.log("response status: " + response.status)

    if (response.status == 200) {
        //here3.innerHTML = "Thank you for joining!"

        setTimeout(() => {
            location.href = "searchStudyGroups.html"
        }, 4000)
    } else {
        //here3.innerHTML = "Please try joining again..."

        setTimeout(() => {
            location.href = "searchStudyGroups.html"
        }, 4000)
    }
}