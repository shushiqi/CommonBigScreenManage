import * as info from "@/api/indexConfig"

const state = {}
const mutations = {}

const actions = {
  // 获取人员结构信息
  GetPsnStructData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetPsnStructData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取当月销售详情
  GetCurMonthSalesData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetCurMonthSalesData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取企业销售年趋势
  GetSalesYearlyData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetSalesYearlyData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取本年销售趋势
  GetCurYearSalesData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetCurYearSalesData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取本年各地区销售详情
  GetCurYearSalesInWorldData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetCurYearSalesInWorldData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
