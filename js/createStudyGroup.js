const token = localStorage.getItem("token")
const ig_username = localStorage.getItem("ig_username")
const ig_password = localStorage.getItem("ig_password")

//new array to add meetings time objects to
const meeting_times = [];

//add meeting time button 
document.getElementById("plusButton").addEventListener('click', async (event) => {
    const time = document.getElementById("time").value
    const location = document.getElementById("location").value
    var day = []


    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        day.push(checkboxes[i].value)
    }

    //valid time?
    function validateTime(time) {
        const timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/
        return time.match(timeReg)
    }

    validateTime(time)
    //create new meeting time object when form filled from meeting times
    const meetingTime = {
        day,
        time,
        location
    }

    meeting_times.push(meetingTime)
    console.log(meeting_times)

    //display meetingsarray to DOM
    //document.getElementById("idPrint").innerHTML = "Meeting Time: " + JSON.stringify(meetingsArray)
    document.getElementById("idPrint").innerHTML = JSON.stringify(meeting_times, null, 2)

    if (checkboxes.checked == true) {
        checkboxes.checked = ''
    }

    return meeting_times
})

document.getElementById("createGroupButton").addEventListener('click', async (event) => {
    event.preventDefault()

    const name = document.getElementById("groupname").value
    const is_public = document.querySelector('input[name="options"]:checked').value
    const description = document.getElementById("description").value
    const school = document.getElementById("school").value
    const course_number = document.getElementById("courseNum").value
    const max_participants = document.getElementById("maxParticipants").value
    const start_date = document.getElementById("startDate").value
    const end_date = document.getElementById("endDate").value

    const h2 = document.querySelector("h2")

    //const url = "http://127.0.0.1:3000/studygroup"
    const url = "https://api-server-1.azurewebsites.net/studygroup"

    console.log("inside create group function")

    const data = {
        name,
        is_public,
        description,
        school,
        course_number,
        max_participants,
        start_date: start_date ? start_date : undefined,
        end_date: end_date ? end_date : undefined,
        meeting_times
        //daysofweek,
        //time,
        //location
    }

    console.log(data)

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            //line for tokens?
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(url, options)
    //const obj = await response.json()

    if (response.status == 201) {
        console.log("creating study group...")
        //console.log(obj.message)
        console.log("redirecting...")

        h2.innerHTML = "Creating Study Group..."

        console.log(ig_username)

        if (ig_username == null) {
            setTimeout(() => {
                location.href = "instaInfo2.html"
            }, 4000)
        } else {
            setTimeout(() => {
                location.href = "insta.html"
            }, 4000)
        }

    } else {
        console.log("in else block")
        h2.innerHTML = 'Please try creating your group again...'
    }
})
