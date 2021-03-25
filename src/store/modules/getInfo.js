import * as info from "@/api/index"

const state = {
  customizedData: {
    psnstruct: false,
    salesyearly: false,
    curmonthsales: false,
    curyearsales: false,
    curyearsalesinworld: false,
    grepurchase: false,
    grecasting: false,
    fgoutput: false,
    fgsales: false,
    fgInv: false,
    water: false,
    elect: false,
    greInv: false,
    yearlyoutput: false,
    yearlygrecastingrank: false,
    yearlysalesrank: false,
    yearlygrecasting: false,
    yearlysales: false,
    energyconsume: false,
    dayenergyconsume: false,
    dayworkshopenergyconsume: false,
    daygreinandout: false,
    dayfginandout: false,
    dayworkshopproduct: false,
    mixingqueen: false,
    deliveryqueen: false,
    mcnstatus: false,
    mcnwarningsql: false,
    seqinprocess: false,
    mcnlist: false,
    mcnefficiency: false,
  },
  sqlMess: {
    psnstructsql: "",
    salesyearlysql: "",
    curmonthsalessql: "",
    curyearsalessql: "",
    curyearsalesinworldsql: "",
    grepurchasesql: "",
    grecastingsql: "",
    fgoutputsql: "",
    fgsalessql: "",
    fgInvsql: "",
    watersql: "",
    electsql: "",
    greInvsql: "",
    yearlyoutputsql: "",
    yearlygrecastingranksql: "",
    yearlysalesranksql: "",
    yearlygrecastingsql: "",
    yearlysalessql: "",
    energyconsumesql: "",
    dayenergyconsumesql: "",
    dayworkshopenergyconsumesql: "",
    daygreinandoutsql: "",
    dayfginandoutsql: "",
    dayworkshopproductsql: "",
    mixingqueensql: "",
    deliveryqueensql: "",
    mcnstatussql: "",
    mcnwarningsql: "",
    seqinprocesssql: "",
    mcnlistsql: "",
    mcnefficiencysql: "",
  }

}
const mutations = {
  SET_BASICSETTING(state, obj) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        state.customizedData[key] = element == "1" ? true : false;
      }
    }
  },
  SET_SQLMESS(state, obj) {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        if (element) {
          state.sqlMess[key] = element
        }
      }
    }
  }
}

const actions = {

  // 获取基本信息配置数据
  GetBasicSettingData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetBasicSettingData(data).then(response => {
        commit("SET_BASICSETTING", response.data[0])
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取人员结构配置信息
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
  // 获取销售情况配置信息
  GetSalesData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetSalesData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 产销总览  获取汇总统计
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
  //  产销总览  获取年度图表汇总统计
  GetYearChartSummaryData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetYearChartSummaryData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 产线动态  获取当日能耗统计
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
  // 产线动态  获取坯布、成品出入库统计
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
  // 产线动态  获取调浆配送队列
  GetQueenData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetQueenData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 设备监控  获取车间列表
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
  // 设备监控  获取设备状态
  GetMcnStatusData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetMcnStatusData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  //  设备监控  获取工序在制品情况
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
  // 设备监控  获取设备列表详情，设备效率分析
  GetDeviceDetailData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetDeviceDetailData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 个人中心  获取个人基本信息
  GetLoginPsnData({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetLoginPsnData(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取SQL配置
  GetSqlSettingMess({
    commit
  }, data = {}) {
    return new Promise((resolve, reject) => {
      info.GetSqlSettingMess(data).then(response => {
        commit("SET_SQLMESS", response.data[0])
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
