import {
  request,
  fetchPost
} from "@/utils/http"

//  设备监控  获取车间列表
export function GetWorkShopList(data) {
  return request("get", "HWBigScreen/GetWorkShopList", data)
}

//  设备监控  获取设备状态统计
export function GetMcnStatusSummaryData(data) {
  return request("get", "HWBigScreen/GetMcnStatusSummaryData", data)
}

//  设备监控  获取设备报警详情
export function GetMcnWarningData(data) {
  return request("get", "HWBigScreen/GetMcnWarningData", data)
}

//  设备监控  获取设备列表详情
export function GetMcnListStatusData(data) {
  return request("get", "HWBigScreen/GetMcnListStatusData", data)
}

//  设备监控  获取工序在制品情况
export function GetSeqInProcessData(data) {
  return request("get", "HWBigScreen/GetSeqInProcessData", data)
}

//  设备监控  获取设备效率分析
export function GetMcnEfficiencyData(data) {
  return request("get", "HWBigScreen/GetMcnEfficiencyData", data)
}
