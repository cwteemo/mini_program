import foodService from '../../services/food'
import config from '../../config/config'

Page({
  data: {
    foodList: [],
    randomResult: '',
    showModal: false,
    newFood: '',
    showDeleteModal: false,
    deleteFoodId: null,
    deleteFoodName: '',
    selectedFood: null,
    showResult: false
  },

  async onLoad() {
    await this.loadFoodList();
  },

  async loadFoodList(retryCount = 0) {
    if (retryCount === 0) {
      wx.showLoading({
        title: '加载中...'
      });
    }

    try {
      const foodList = await foodService.getFoodList();
      console.log('Fetched food list:', foodList); // 打印获取到的菜品列表

      this.setData({
        foodList: foodList
      });
    } catch (error) {
      console.error('Error fetching food list:', error); // 打印错误信息

      if (retryCount < 2) {
        setTimeout(() => {
          this.loadFoodList(retryCount + 1);
        }, 1000);
        return;
      }

      wx.showToast({
        title: '加载失败，请稍后重试',
        icon: 'none',
        duration: 2000
      });

      this.setData({
        foodList: []
      });
    } finally {
      if (retryCount === 0) {
        wx.hideLoading();
      }
    }
  },

  // 显示添加菜品弹窗
  showAddModal() {
    this.setData({
      showModal: true,
      newFood: ''
    })
  },

  // 隐藏添加菜品弹窗
  hideAddModal() {
    this.setData({
      showModal: false
    })
  },

  // 添加新菜品
  async addFood() {
    const { newFood } = this.data
    if (!newFood.trim()) {
      wx.showToast({
        title: config.messages.emptyInput,
        icon: 'none'
      })
      return
    }

    const result = await foodService.addFood(newFood.trim())
    if (result.success) {
      // 重新获取菜品列表并处理数据格式
      const foodList = await foodService.getFoodList()
      const validFoodList = foodList.map(item => ({
        id: item.ID,
        name: item.Name || item.name
      }))
      
      this.setData({
        foodList: validFoodList,
        showModal: false
      })
      wx.showToast({
        title: config.messages.addSuccess,
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: result.error || '添加失败',
        icon: 'none'
      })
    }
  },

  // 显示删除确认弹窗
  showDeleteConfirm(e) {
    const { id, name } = e.currentTarget.dataset;
    console.log('Showing delete confirm for:', id, name); 
    this.setData({
      showDeleteModal: true,
      deleteFoodId: id,
      deleteFoodName: name
    });
  },

  // 隐藏删除确认弹窗
  hideDeleteConfirm() {
    this.setData({
      showDeleteModal: false,
      deleteFoodId: null,
      deleteFoodName: ''
    })
  },

  // 确认删除菜品
  async confirmDelete() {
    const { deleteFoodId } = this.data;
    console.log('Attempting to delete food with id:', deleteFoodId);

    if (!deleteFoodId) {
      wx.showToast({
        title: '删除失败：无效的ID',
        icon: 'none'
      });
      return;
    }

    const result = await foodService.deleteFood(deleteFoodId);
    console.log('Delete result:', result);

    if (result.success) {
      const foodList = await foodService.getFoodList();
      const validFoodList = foodList.map(item => ({
        id: item.id || item.ID,
        name: item.name || item.Name
      }));

      this.setData({ 
        foodList: validFoodList,
        showDeleteModal: false,
        deleteFoodId: null,
        deleteFoodName: ''
      });
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: result.error || '删除失败',
        icon: 'none'
      });
    }
  },

  // 随机选择菜品
  async getRandomFood() {
    try {
      const randomResult = await foodService.getRandomFood()
      if (!randomResult) {
        wx.showToast({
          title: config.messages.emptyList,
          icon: 'none'
        })
        return
      }
      this.setData({ randomResult: randomResult.name })
    } catch (error) {
      wx.showToast({
        title: error.message || '随机选择失败',
        icon: 'none'
      })
    }
  },

  // 输入框内容变化处理
  onInput(e) {
    this.setData({
      newFood: e.detail.value
    })
  },

  // 菜品项点击处理
  onFoodItemTap() {
    // 空函数，用于阻止点击事件冒泡
    return
  },

  // 添加重试按钮的处理函数
  handleRetry() {
    this.loadFoodList();
  },

  // 添加随机选择方法
  randomSelect() {
    const { foodList } = this.data;
    if (!foodList || foodList.length === 0) {
      wx.showToast({
        title: '请先添加菜品',
        icon: 'none'
      });
      return;
    }

    // 随机选择一个菜品
    const randomIndex = Math.floor(Math.random() * foodList.length);
    const selectedFood = foodList[randomIndex];

    // 显示加载动画
    wx.showLoading({
      title: '正在选择...',
    });

    // 模拟随机选择的过程
    setTimeout(() => {
      wx.hideLoading();
      this.setData({
        selectedFood,
        showResult: true
      });
    }, 500);
  },

  // 添加关闭结果的方法
  hideResult() {
    this.setData({
      showResult: false
    });
  }
}) 