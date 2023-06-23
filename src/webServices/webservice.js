import axios from "axios";
import { PRODUCTION_endPointUrl } from "../ApiBaseUrl/endPointUrl";;

export default axios.create({
	baseURL: PRODUCTION_endPointUrl,
	Headers: {
		'Content-Type': 'application/json'
	}
});

