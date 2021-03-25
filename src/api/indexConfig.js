import {
  request,
  fetchPost
} from "@/utils/http"

// 首页 获取人员结构信息
export function GetPsnStructData(data) {
  return request("get", "HWBigScreen/GetPsnStructData", data)
}

// 首页 获取当月销售详情
export function GetCurMonthSalesData(data) {
  return request("get", "HWBigScreen/GetCurMonthSalesData", data)
}

// 首页 获取企业销售年趋势
export function GetSalesYearlyData(data) {
  return request("get", "HWBigScreen/GetSalesYearlyData", data)
}

// 首页 获取本年销售趋势
export function GetCurYearSalesData(data) {
  return request("get", "HWBigScreen/GetCurYearSalesData", data)
}

// 首页 获取本年各地区销售详情
export function GetCurYearSalesInWorldData(data) {
  return request("get", "HWBigScreen/GetCurYearSalesInWorldData", data)
}
