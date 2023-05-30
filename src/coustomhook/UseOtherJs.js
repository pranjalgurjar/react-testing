import { useEffect, useState } from "react";
import { AssemblePrefData } from "../view/pages/mySubscription/js/assembledata";

const useOtherJs = (data, slug) => {

	const [packageData, setPackageData] = useState()

	useEffect(() => {
	async function pakg() {
			let PackageD = await AssemblePrefData(data).flat()
			let coursePackage = await PackageD.find((item)=>item?.slug===slug && item?.is_active)
			setPackageData(coursePackage)
		}
		pakg()
	}, [data,slug])

	return packageData;
}

export default useOtherJs;