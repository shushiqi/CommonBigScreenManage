import {
  request,
  fetchPost
} from "@/utils/http"

//  产销总览  获取坯布采购信息
export function GetGrePurchaseData(data) {
  return request("get", "HWBigScreen/GetGrePurchaseData", data)
}

//  产销总览  获取坯布投坯信息
export function GetGreCastingData(data) {
  return request("get", "HWBigScreen/GetGreCastingData", data)
}

//  产销总览  获取成品产出信息
export function GetFgOutPutData(data) {
  return request("get", "HWBigScreen/GetFgOutPutData", data)
}

//  产销总览   获取成品销售信息
export function GetFgSalesData(data) {
  return request("get", "HWBigScreen/GetFgSalesData", data)
}

//  产销总览  获取成品库存信息
export function GetFgInvData(data) {
  return request("get", "HWBigScreen/GetFgInvData", data)
}

//  产销总览  获取用水量信息
export function GetWaterConsumeData(data) {
  return request("get", "HWBigScreen/GetWaterConsumeData", data)
}

//  产销总览  获取用电量信息
export function GetElecConsumeData(data) {
  return request("get", "HWBigScreen/GetElecConsumeData", data)
}

//  产销总览  获取当前坯布库存品种
export function GetGreInvData(data) {
  return request("get", "HWBigScreen/GetGreInvData", data)
}

//  产销总览  获取本年产出统计
export function GetYearlyOutPutData(data) {
  return request("get", "HWBigScreen/GetYearlyOutPutData", data)
}

//  产销总览  获取本年投坯品种排名
export function GetYearlyGreCastingRankData(data) {
  return request("get", "HWBigScreen/GetYearlyGreCastingRankData", data)
}

//  产销总览  获取本年销售品种排名
export function GetYearlySalesRankData(data) {
  return request("get", "HWBigScreen/GetYearlySalesRankData", data)
}

//  产销总览  获取本年投坯统计
export function GetYearlyGreCastingData(data) {
  return request("get", "HWBigScreen/GetYearlyGreCastingData", data)
}

//  产销总览  获取本年销售统计
export function GetYearlySalesData(data) {
  return request("get", "HWBigScreen/GetYearlySalesData", data)
}

//  产销总览  获取年度能耗统计
export function GetEnergyConsumeData(data) {
  return request("get", "HWBigScreen/GetEnergyConsumeData", data)
}

//  产销总览  获取汇总统计
export function GetProductAndSalesSummaryData(data) {
  return request("get", "HWBigScreen/GetProductAndSalesSummaryData", data)
}

//  产销总览  获取年度图表汇总统计
export function GetCurYearSalesInWorldData(data) {
  return request("get", "HWBigScreen/GetYearChartSummaryData", data)
}
