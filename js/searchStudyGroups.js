const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")
const ig_username = localStorage.getItem("ig_username")

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
    if (search) {
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

    console.log("url: " + url)

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
                const space = document.createElement("div")
                space.className = "space2"

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
                    here.append(varButton2)
                    varButton2.innerHTML = "Join"

                    varButton2.addEventListener('click', function () {
                        JoinStudyGroup(value)
                    })
                }
            }
            const participantsButton = document.createElement("button")
            participantsButton.className = "participantsButton"
            participantsButton.innerHTML = "Display Participants"

            //let participantsArr = myobj.participants

            let value = myobj._id

            participantsButton.addEventListener('click', function () {
                OpenParticipants(value)
            })

            const space2 = document.createElement("div")
            space2.className = "space2"

            here.append(space2)
            here.append(participantsButton)
        }
    } else {
        console.log("in else block")
        h2.innerHTML = 'Please try searching again...'
    }
})

function OpenParticipants(value) {
    console.log("inside open participants funciton")

    localStorage.setItem("studyGroupID2", value)
    console.log(localStorage.getItem("studyGroupID2"))

    window.location.href = "participants.html"
}

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

async function LeaveStudyGroup(value) {
    console.log("inside leave study group function")
    console.log("value: " + value)

    //const url = new URL("http://127.0.0.1:3000/studygroup/" + value + "/participants?remove")
    const url = new URL("https://api-server-1.azurewebsites.net/studygroup/" + value + "/participants?remove")

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        //body: JSON.stringify(value)
    }

    let response = await fetch(url, options)

    console.log("response status: " + response.status)
    //const obj = response.json()    

    if (response.status == 200) {
        console.log("success in leave function")

        setTimeout(() => {
            location.href = "searchStudyGroups.html"
        }, 4000)
    } else {
        console.log("error in leave function")

        setTimeout(() => {

            location.href = "searchStudyGroups.html"
        }, 4000)

    }
}

async function JoinStudyGroup(value) {
    console.log("inside join group function")
    console.log("value: " + value)

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

    let response = await fetch(url, options)

    console.log("response status: " + response.status)

    if (response.status == 200) {
        console.log("ig username: " + ig_username)

        if (ig_username === null) {
            console.log("console log null")
            setTimeout(() => {
                location.href = "instaInfo2.html"
            }, 4000)
        } else if (ig_username === "undefined") {
            setTimeout(() => {
                console.log("console log undefined")
                location.href = "instaInfo2.html"
            }, 4000)
        } else {
            setTimeout(() => {
                 location.href = "insta.html"
            }, 4000)
        }
    } else {
        console.log("error in join function")


        setTimeout(() => {
            location.href = "searchStudyGroups.html"
        }, 4000)

    }
}