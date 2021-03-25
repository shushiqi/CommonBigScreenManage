import * as info from "@/api/deviceMonitoring"

const state = {}
const mutations = {}

const actions = {
  // 获取车间列表
  GetWorkShopList({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetWorkShopList(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取设备状态统计
  GetMcnStatusSummaryData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetMcnStatusSummaryData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取设备报警详情
  GetMcnWarningData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetMcnWarningData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取设备列表详情
  GetMcnListStatusData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetMcnListStatusData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取工序在制品情况
  GetSeqInProcessData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetSeqInProcessData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取设备效率分析
  GetMcnEfficiencyData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetMcnEfficiencyData(data).then(response => {
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
