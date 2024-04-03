const token = localStorage.getItem("token")
const userid = localStorage.getItem("userid")
const studyGroupID = localStorage.getItem("studyGroupID")

async function deleteStudyGroup() {
    console.log('inside delete.js functions')

    const h1 = document.querySelector("h1")
    const p = document.querySelector("p")

    //const url = new URL("http://127.0.0.1:3000/studygroup/" + studyGroupID)
    const url = new URL("https://api-server-1.azurewebsites.net/studygroup/" + studyGroupID)

    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        //body: JSON.stringify(data)
    }

    let response = await fetch(url, options)

    if (response.status == 200) {
        p.innerHTML = 'You will be redirected to the app momentarily.'

        setTimeout(() => {
            location.href = "searchStudyGroups.html"
        }, 4000)
    }
    else {
        h1.innerHTML = "Something went wrong."
        p.innerHTML = "Please try deleting again."

        setTimeout(() => {
            location.href = "searchStudyGroups.html"
        }, 4000)
    }
}

deleteStudyGroup()