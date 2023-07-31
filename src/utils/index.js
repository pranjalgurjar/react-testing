// for user login or not login
export const isLogin = () => {
	if (localStorage.getItem("eXvctIdv")) {
		return true;
	}
	return false;
}

// for logOut function
export const LogOut = (e) => {
	localStorage.removeItem("eXvctIdv")
	localStorage.removeItem("user_data")
	localStorage.removeItem("user_subscription")
	sessionStorage.removeItem("CRS")
	localStorage.removeItem("is_subscription")
}


// for client requirement, if user has subscription then show scription page otherwise show buy course page
export const isSubscription = () => {
	let subscription = localStorage.getItem("is_subscription")
	if (subscription > 0) {
		return true;
	} else {
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
	} else if (name.includes(" ")) {
		return isSubscription() ? "subscription" : "courses"
	}

}

/* for url checking is subscription available or not   */
export const ProtectUrl = (slug) => {
	let user = JSON.parse(localStorage.getItem("user_subscription"))
	const issubscrip = user?.filter(item => item?.course?.slug === slug)
	if (issubscrip?.length) {
		return true
	} else {
		return false
	}
}
