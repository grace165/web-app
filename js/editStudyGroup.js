const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")
const studyGroupID = localStorage.getItem("studyGroupID")

const h3 = document.querySelector("h3")

/*var sginfo = {
    "name": "",
    "is_public": "true",
    "max_participants": 1,
    "start_date": {

    },
    "end_date": {

    },
    "school": "",
    "description": "",
    "course_number": "",
    "meeting_times": [{
        "day": "",
        "time": "",
        "location": ""
    }]
}*/

let meetingTime = {
    "day" : "",
    "time" : "",
    "location" : ""
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

                    const details = document.createElement("label")
                    details.innerHTML = "Day"

                    const details0 = document.createElement("input")
                    details0.type = "String"
                    details0.id = "day"
                    details0.value = myobj1[i].day

                    here.appendChild(details)
                    here.appendChild(details0)

                    const details1 = document.createElement("label")
                    details1.innerHTML = "Time"

                    const details2 = document.createElement("input")
                    details2.type = "time"
                    details2.id = "time"
                    details2.value = myobj1[i].time

                    here.appendChild(details1)
                    here.appendChild(details2)

                    const details3 = document.createElement("label")
                    details3.innerHTML = "Location"

                    const details4 = document.createElement("input")
                    details4.type = "String"
                    details4.id = "location"
                    details4.value = myobj1[i].location

                    here.appendChild(details3)
                    here.appendChild(details4)

                    //
                    //let dayForm = document.getElementById("day").value
                    //let timeForm = document.getElementById("time").value
                    //let locationForm = document.getElementById("location").value

                    meetingTime = {
                        "day" : myobj1[i].day,
                        "time" : myobj1[i].time,
                        "location" : myobj1[i].location
                    }

                    meeting_times[i] = meetingTime
                }
            }
        }
    }
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
    
    for(const key in meeting_times){
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
            location.href = "searchStudyGroups.html"
        }, 4000)

    } else {
        console.log("in else block")
        h3.innerHTML = 'Please try saving your changes again...'
    }

})
