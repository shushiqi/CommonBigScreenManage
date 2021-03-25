import {request} from "@/utils/http"

export function login(data) {
  return request("get", 'HWBigScreen/PsnLogin', data)
}

export function getUserInfo(data) {
  return request("get", 'HWBigScreen/GetLoginPsnData', data)
}