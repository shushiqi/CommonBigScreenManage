import * as info from "@/api/psOverview"

const state = {}
const mutations = {}

const actions = {
  // 获取坯布采购信息
  GetGrePurchaseData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetGrePurchaseData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取坯布投坯信息
  GetGreCastingData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetGreCastingData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取成品产出信息
  GetFgOutPutData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetFgOutPutData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //  获取成品销售信息
  GetFgSalesData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetFgSalesData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取成品库存信息
  GetFgInvData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetFgInvData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用水量信息
  GetWaterConsumeData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetWaterConsumeData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取用电量信息
  GetElecConsumeData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetElecConsumeData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取当前坯布库存品种
  GetGreInvData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetGreInvData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取本年产出统计
  GetYearlyOutPutData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetYearlyOutPutData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取本年投坯品种排名
  GetYearlyGreCastingRankData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetYearlyGreCastingRankData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取本年销售品种排名
  GetYearlySalesRankData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetYearlySalesRankData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取本年投坯统计
  GetYearlyGreCastingData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetYearlyGreCastingData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取本年销售统计
  GetYearlySalesData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetYearlySalesData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取年度能耗统计
  GetEnergyConsumeData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetEnergyConsumeData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取汇总统计
  GetProductAndSalesSummaryData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetProductAndSalesSummaryData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取年度图表汇总统计
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
