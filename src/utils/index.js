// for user login or not login
export const isLogin = () => {
    if (localStorage.getItem("eXvctIdv")) {
        return true;
    }
    return false;
}

 // for client requirement, if user has subscription then show scription page otherwise show buy course page
 export const isSubscription = () => {
    let userdata = JSON.parse(localStorage.getItem("userdata"))
    let subst = userdata?.subscriptions
	if(subst?.length){
		return true;
	}else{
		 return false
	}
  }
 
// for path match
export const pathName = () => {
	let name = window.location.pathname
	if (name.includes("/subscription")) {
		return "subscription"
	} else if (name.includes("/courses")) {
		return "courses"
	} else if (name.includes("/liveclasses")) {
		return "liveclasses"
	} else if (name.includes("/currentAffairs")) {
		return "currentAffairs"
	} else if (name.includes("/testseries")) {
		return "testseries"
	} else if (name.includes("/studymaterial")) {
		return "studymaterial"
	} else if (name.includes("/prevyearpapers")) {
		return "prevyearpapers"
	} else if (name.includes("/myprofile")) {
		return "myprofile"
	} else if (name.includes("/support")) {
		return "support"
	}
	
}

/* for url checking is subscription available or not   */
export const ProtectUrl = (slug)=>{
let user = JSON.parse(localStorage.getItem("userdata"))
const issubscrip = user?.subscriptions?.filter(item=>item?.course?.slug===slug)
if(issubscrip?.length){
	return true
}else{
	return false
}
}