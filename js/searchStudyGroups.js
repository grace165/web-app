const token = localStorage.getItem("token")

document.getElementById("searchButton").addEventListener('click', async (event) => {
    event.preventDefault()

    const search = document.getElementById("search").value
    const limit = document.getElementById("limit").value
    const skip = document.getElementById("skip").value
    const sortBy = document.querySelector('input[name="sortBy"]:checked').value
    const ongoing = document.querySelector('input[name="ongoing"]:checked').value
    const error = "cannot reach params"

    const h2 = document.querySelector("h2")

    /*
    const h3 = document.querySelector("h3")

    const nameBox = document.getElementById("nameBox")
    const schoolBox = document.getElementById("schoolBox")
    const coursenumBox = document.getElementById("coursenumBox")
    const descriptionBox = document.getElementById("descriptionBox")
    const ispublicBox = document.getElementById("ispublicBox")
    const maxparticipantsBox = document.getElementById("maxparticipantsBox")
    const startdateBox = document.getElementById("startdateBox")
    const enddateBox = document.getElementById("enddateBox")
    */

    const url = new URL("http://127.0.0.1:3000/studygroups?")
    //const url = "https://api-server-1.azurewebsites.net/studygroups?"

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
        url.searchParams.append("sortBy", sortBy)
    }
    if (ongoing !== null) {
        url.searchParams.append("ongoing", ongoing)
    }
    else {
        url.searchParams.append("Error", error)
    }

    const data = {
        search,
        limit,
        skip,
        sortBy,
        ongoing
    }

    console.log(data)

    /*for(const param of params) {
        console.log(param)
    }*/

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
        console.log(token)
        console.log(obj)

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
            starter.innerHTML = "Start date: " + myobj.start_date
            here.appendChild(starter)

            const ender = document.createElement("h4")
            ender.innerHTML = "End date: " + myobj.end_date
            here.appendChild(ender)

            // here.parentNode.insertAfter(hr, here)

            //nameBox.innerHTML = "Study Group: " + myobj.name + "\n"
            //schoolBox.innerHTML = "School: " + myobj.school + "\n"
            //coursenumBox.innerHTML = "Course number: " + myobj.course_number + "\n"
            //descriptionBox.innerHTML = "Description: " + myobj.description + "\n"
            //ispublicBox.innerHTML = "Is public? " + myobj.is_public + "\n"
            //maxparticipantsBox.innerHTML = "Max participants: " + myobj.max_participants + "\n"
            //startdateBox.innerHTML = "Start date: " + myobj.start_date + "\n"
            //enddateBox.innerHTML = "End date: " + myobj.end_date + "\n"
        }

        //h3.innerHTML = obj2

    } else {
        console.log("in else block")
        h2.innerHTML = 'Please try searching again...'
    }
})