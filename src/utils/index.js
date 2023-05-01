// for user login or not login
export const isLogin = () => {
    if (localStorage.getItem("eXvctIdv")) {
        return true;
    }
    return false;
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

export const ProtectUrl = (slug)=>{
let user = JSON.parse(localStorage.getItem("userdata"))
const issubscrip = user?.subscriptions?.filter(item=>item?.course?.slug===slug)
if(issubscrip?.length){
	return true
}else{
	return false
}
}