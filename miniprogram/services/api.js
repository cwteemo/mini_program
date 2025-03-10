const request = async (url, options = {}) => {
  const baseURL = 'https://49.233.56.149/mini_program';
  //const baseURL = 'https://cwteemo.icu/mini_program';
  
  try {
    const result = await new Promise((resolve, reject) => {
      wx.request({
        url: `${baseURL}${url}`,
        ...options,
        header: {
          'content-type': 'application/json',
          ...options.header
        },
        success: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            reject({
              errorCode: res.statusCode,
              message: `请求失败: ${res.statusCode}`
            });
          }
        },
        fail: (err) => {
          reject({
            errorCode: -1,
            message: '请求失败，请检查网络连接'
          });
        }
      });
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const api = {
  // 获取菜品列表
  getFoodList() {
    return request('/foods', {
      method: 'GET'
    })
  },

  // 添加菜品
  addFood(name) {
    return request('/foods', {
      method: 'POST',
      data: { name }
    })
  },

  // 删除菜品
  deleteFood(id) {
    return request(`/foods/${id}`, {
      method: 'DELETE'
    })
  },

  get: (url) => request(url),
  post: (url, data) => request(url, { method: 'POST', data })
};

export default api; 