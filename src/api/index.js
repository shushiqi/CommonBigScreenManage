import {
  request,
  fetchPost
} from "@/utils/http"

// 获取基本信息配置数据
export function GetBasicSettingData(data) {
  return request("get", "HWBigScreen/GetBasicSettingData", data)
}

// 获取人员结构配置信息
export function GetPsnStructData(data) {
  return request("get", "HWBigScreen/GetPsnStructData", data)
}

// 获取销售情况配置信息
export function GetSalesData(data) {
  return request("get", "HWBigScreen/GetSalesData", data)
}

//  产销总览  获取汇总统计
export function GetProductAndSalesSummaryData(data) {
  return request("get", "HWBigScreen/GetProductAndSalesSummaryData", data)
}

//  产销总览  获取年度图表汇总统计
export function GetYearChartSummaryData(data) {
  return request("get", "HWBigScreen/GetYearChartSummaryData", data)
}

//  产线动态  获取当日能耗统计
export function GetCurDayEnergyConsumeData(data) {
  return request("get", "HWBigScreen/GetCurDayEnergyConsumeData", data)
}

// 产线动态  获取坯布、成品出入库统计
export function GetCurDayInAndOutData(data) {
  return request("get", "HWBigScreen/GetCurDayInAndOutData", data)
}
// 产线动态  获取调浆配送队列
export function GetQueenData(data) {
  return request("get", "HWBigScreen/GetQueenData", data)
}
// 设备监控  获取车间列表
export function GetWorkShopList(data) {
  return request("get", "HWBigScreen/GetWorkShopList", data)
}
// 设备监控  获取设备状态
export function GetMcnStatusData(data) {
  return request("get", "HWBigScreen/GetMcnStatusData", data)
}
// 设备监控  获取工序在制品情况
export function GetSeqInProcessData(data) {
  return request("get", "HWBigScreen/GetSeqInProcessData", data)
}

//  设备监控  获取设备列表详情，设备效率分析
export function GetDeviceDetailData(data) {
  return request("get", "HWBigScreen/GetDeviceDetailData", data)
}
// 个人中心  获取个人基本信息
export function GetLoginPsnData(data) {
  return request("get", "HWBigScreen/GetLoginPsnData", data)
}

// SQL配置  获取SQL配置
export function GetSqlSettingMess(data) {
  return request("get", "HWBigScreen/GetSqlSettingMess", data)
}

// 基本信息配置保存
export function SaveBasicSettingMess(data) {
  return fetchPost("HWBigScreen/SaveBasicSettingMess", data)
}

// 首页配置信息保存
export function SaveHomePageSettingMess(data) {
  return fetchPost("HWBigScreen/SaveHomePageSettingMess", data)
}


// 产销总览配置信息保存
export function SaveProductAndSalesSettingMess(data) {
  return fetchPost("HWBigScreen/SaveProductAndSalesSettingMess", data)
}

// 产线动态配置信息保存
export function SaveDynamicLineSettingMess(data) {
  return fetchPost("HWBigScreen/SaveDynamicLineSettingMess", data)
}

// 机台监控配置信息保存
export function SaveMcnMonitoringSettingMess(data) {
  return fetchPost("HWBigScreen/SaveMcnMonitoringSettingMess", data)
}

// SQL配置  SQL配置保存
export function SaveSqlSettingMess(data) {
  return fetchPost("HWBigScreen/SaveSqlSettingMess", data)
}

// 配置保存
export function SaveTableMess(data, param) {
  return fetchPost("HWBigScreen/SaveTableMess", data, param)
}
