import axios from "axios";
import { TEST_endPointUrl } from "../ApiBaseUrl/endPointUrl";;

export default axios.create({
	baseURL: TEST_endPointUrl,
	Headers: {
		'Content-Type': 'application/json'
	}
});

