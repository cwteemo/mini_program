const config = {
  // 应用配置
  app: {
    name: '今天吃什么',
    version: '1.0.0'
  },

  // 主题配置
  theme: {
    primaryColor: '#07c160',
    backgroundColor: '#f5f5f5',
    textColor: '#333333',
    secondaryTextColor: '#666666'
  },

  // 存储键名
  storageKeys: {
    FOOD_LIST: 'foodList'
  },

  // 提示信息
  messages: {
    addSuccess: '添加成功',
    deleteSuccess: '删除成功',
    emptyInput: '请输入菜品名称',
    emptyList: '请先添加菜品'
  }
}

export default config 