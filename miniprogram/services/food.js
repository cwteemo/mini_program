import api from './api'

const foodService = {
  // 获取菜品列表
  async getFoodList() {
    try {
      const result = await api.get('/foods');
      if (result && result.data && Array.isArray(result.data)) {
        // 转换字段名为小写
        return result.data.map(item => ({
          id: item.ID,
          name: item.Name
        }));
      }
      return [];
    } catch (error) {
      console.error('获取菜品列表失败:', error);
      return [];
    }
  },

  // 添加菜品
  async addFood(food) {
    try {
      const response = await api.addFood(food)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('添加菜品失败:', error)
      return { 
        success: false, 
        error: error.message,
        errorCode: error.errorCode
      }
    }
  },

  // 删除菜品
  async deleteFood(id) {
    try {
      const response = await api.deleteFood(id)
      return { success: true, data: response.data }
    } catch (error) {
      console.error('删除菜品失败:', error)
      return { 
        success: false, 
        error: error.message,
        errorCode: error.errorCode
      }
    }
  },

  // 随机选择菜品
  async getRandomFood() {
    try {
      const foodList = await this.getFoodList()
      if (foodList.length === 0) return null
      const randomIndex = Math.floor(Math.random() * foodList.length)
      const randomFood = foodList[randomIndex]
      return {
        id: randomFood.ID || randomFood.id,
        name: randomFood.Name || randomFood.name
      }
    } catch (error) {
      console.error('随机选择菜品失败:', error)
      throw {
        errorCode: error.errorCode || -1,
        message: error.message || '随机选择菜品失败'
      }
    }
  }
}

export default foodService 