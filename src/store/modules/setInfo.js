import * as info from "@/api/index"

const state = {}
const mutations = {}

const actions = {

  // 基本信息配置保存
  SaveBasicSettingMess({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      info.SaveBasicSettingMess(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 首页配置信息保存
  SaveHomePageSettingMess({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      info.SaveHomePageSettingMess(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 产销总览配置信息保存
  SaveProductAndSalesSettingMess({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      info.SaveProductAndSalesSettingMess(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 产线动态配置信息保存
  SaveDynamicLineSettingMess({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      info.SaveDynamicLineSettingMess(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 机台监控配置信息保存
  SaveMcnMonitoringSettingMess({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      info.SaveMcnMonitoringSettingMess(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // SQL配置保存
  SaveSqlSettingMess({
    commit
  }, data) {
    return new Promise((resolve, reject) => {
      info.SaveSqlSettingMess(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 配置保存
  SaveTableMess({
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      info.SaveTableMess(payload.data, payload.param).then(response => {
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
