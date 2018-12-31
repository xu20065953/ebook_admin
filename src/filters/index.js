
// import { ORDER_STATUS } from "@/constant/index"

export function toBool(value) {
	return value ? "是" : "否";
}

export function toTimeFormat(value, bool=false) {
	//return new Date(value).toLocaleString();
	if (!value) return "";
	let strArr = value.split("T");
	return bool ? strArr[0] + " " + strArr[1].split(".")[0] : strArr[0];
}




