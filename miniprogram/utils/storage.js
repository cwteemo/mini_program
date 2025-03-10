const STORAGE_KEYS = {
  FOOD_LIST: 'foodList'
}

const storage = {
  // 保存数据
  set(key, data) {
    try {
      wx.setStorageSync(key, data)
      return true
    } catch (e) {
      console.error('Storage set error:', e)
      return false
    }
  },

  // 获取数据
  get(key) {
    try {
      return wx.getStorageSync(key)
    } catch (e) {
      console.error('Storage get error:', e)
      return null
    }
  },

  // 删除数据
  remove(key) {
    try {
      wx.removeStorageSync(key)
      return true
    } catch (e) {
      console.error('Storage remove error:', e)
      return false
    }
  },

  // 清空所有数据
  clear() {
    try {
      wx.clearStorageSync()
      return true
    } catch (e) {
      console.error('Storage clear error:', e)
      return false
    }
  }
}

export { storage, STORAGE_KEYS } 