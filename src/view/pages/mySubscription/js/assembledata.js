export const AssemblePrefData = (couresPageData) => {
	let prefs = []
	for (let index = 0; index < couresPageData?.length; index++) {
		const element = couresPageData[index]?.courses
		prefs?.push(element)
	}	
	return prefs;
}


 export const SubscriptionPageData = (data) => {
	let BS = JSON.parse(localStorage.getItem("user_subscription"))
	let sub = []
	for (let index = 0; index < BS?.length; index++) {
		let element = BS[index].course?.id;
		let ele = data?.find(item => item?.id === element)
		sub?.push(ele)
	}
	return sub;
}


