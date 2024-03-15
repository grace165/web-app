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

const meetingTimes = []

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

                //populate meeting times

                if (myobj.is_public == true) {
                    document.getElementById("public").checked = true
                }
                else {
                    document.getElementById("private").checked = true
                }

                if(myobj.meeting_times)

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

    //const url = new URL("http://127.0.0.1:3000/studygroup/" + studyGroupID)
    const url = new URL("https://api-server-1.azurewebsites.net/studygroup" + studyGroupID)

    const data = {
        name,
        is_public,
        description,
        school,
        course_number,
        max_participants,
        start_date,
        end_date,
        //meeting_times
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
        h2.innerHTML = 'Please try saving your changes again...'
    }

})
