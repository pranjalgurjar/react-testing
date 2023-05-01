// RegExp for validation
export const regExpEmail = (email) => {
	if ((/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(email)) {
		return true
	} else {
		return false
	}
}


export const regExpMobile = (mobile) => {
	if (!(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i).test(mobile)) {
		return true
	} else {
		return false
	}
}


export const regExpPassword = (password) => {
	if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/).test(password)) {
		return true
	} else {
		return false
	}
}


export const regExpName = (name) => {
	if (!(/^[a-zA-Z]{2,16}( [a-zA-Z]{2,16})+$/).test(name)) {
		return true
	} else {
		return false
	}
}