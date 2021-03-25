import {
  request,
  fetchPost
} from "@/utils/http"

//  产线动态  获取当日能耗统计
export function GetDayEnergyConsumeData(data) {
  return request("get", "HWBigScreen/GetDayEnergyConsumeData", data)
}

//  产线动态  获取当日坯布出入库统计
export function GetDayGreInAndOutData(data) {
  return request("get", "HWBigScreen/GetDayGreInAndOutData", data)
}

//  产线动态  获取当日成品出入库统计
export function GetDayFgInAndOutData(data) {
  return request("get", "HWBigScreen/GetDayFgInAndOutData", data)
}

//  产线动态   获取当日车间能耗统计
export function GetDayWorkshopEnergyConsumeData(data) {
  return request("get", "HWBigScreen/GetDayWorkshopEnergyConsumeData", data)
}

//  产线动态  获取当日车间产量统计
export function GetDayWorkshopProductData(data) {
  return request("get", "HWBigScreen/GetDayWorkshopProductData", data)
}

//  产线动态  获取调浆队列
export function GetMixingQueenData(data) {
  return request("get", "HWBigScreen/GetMixingQueenData", data)
}

//  产线动态  获取配送队列
export function GetDeliveryQueenData(data) {
  return request("get", "HWBigScreen/GetDeliveryQueenData", data)
}

//  产线动态  获取当日能耗统计
export function GetCurDayEnergyConsumeData(data) {
  return request("get", "HWBigScreen/GetCurDayEnergyConsumeData", data)
}

//  产线动态  获取坯布、成品出入库统计
export function GetCurDayInAndOutData(data) {
  return request("get", "HWBigScreen/GetCurDayInAndOutData", data)
}
