export const AssemblePrefData = (couresPageData) => {
	let prefs = []
	for (let index = 0; index < couresPageData?.length; index++) {
		const element = couresPageData[index]?.courses
		prefs.push(element)
	}	
	return prefs;
}


 export const SubscriptionPageData = (data) => {
	let BS = JSON.parse(localStorage.getItem("userdata"))
    let BuySubscriptions = BS?.subscriptions
	let sub = []
	for (let index = 0; index < BuySubscriptions?.length; index++) {
		var element = BuySubscriptions[index].course?.id;
		let ele = data?.find(item => item?.id === element)
		sub.push(ele)
	}
	return sub;
}


