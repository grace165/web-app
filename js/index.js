//if(localStorage.getItem("token") === null) {

if("token" in localStorage){
    console.log("already logging in!")
    location.href = "main.html"
}else{
    console.log("Token not in local storage")
    console.log("please log in or create account")
}