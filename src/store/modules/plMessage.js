import * as info from "@/api/plMessage"

const state = {}
const mutations = {}

const actions = {
  // 获取当日能耗统计
  GetDayEnergyConsumeData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetDayEnergyConsumeData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取当日坯布出入库统计
  GetDayGreInAndOutData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetDayGreInAndOutData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取当日成品出入库统计
  GetDayFgInAndOutData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetDayFgInAndOutData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //  获取当日车间能耗统计
  GetDayWorkshopEnergyConsumeData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetDayWorkshopEnergyConsumeData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取当日车间产量统计
  GetDayWorkshopProductData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetDayWorkshopProductData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取调浆队列
  GetMixingQueenData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetMixingQueenData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取配送队列
  GetDeliveryQueenData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetDeliveryQueenData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取当日能耗统计
  GetCurDayEnergyConsumeData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetCurDayEnergyConsumeData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取坯布、成品出入库统计
  GetCurDayInAndOutData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetCurDayInAndOutData(data).then(response => {
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
