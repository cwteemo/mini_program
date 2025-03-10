package handlers

import (
	"github.com/gin-gonic/gin"
	"github.com/mini-program/api/config"
	"github.com/mini-program/api/utils"
	"net/http"
)

// GetFoodList 获取菜品列表
func GetFoodList(c *gin.Context) {
	var foods []config.Food
	if err := config.DB.Find(&foods).Error; err != nil {
		utils.Error(c, http.StatusInternalServerError, utils.ErrorCodeInternalError, "获取菜品列表失败")
		return
	}

	utils.Success(c, foods)
}

// AddFood 添加菜品
func AddFood(c *gin.Context) {
	var food config.Food
	if err := c.ShouldBindJSON(&food); err != nil {
		utils.Error(c, http.StatusBadRequest, utils.ErrorCodeParamInvalid, "无效的请求数据")
		return
	}

	// 检查菜品名称是否已存在
	var existingFood config.Food
	if err := config.DB.Where("name = ?", food.Name).First(&existingFood).Error; err == nil {
		utils.Error(c, http.StatusBadRequest, utils.ErrorCodeDuplicate, "该菜品已存在")
		return
	}

	if err := config.DB.Create(&food).Error; err != nil {
		utils.Error(c, http.StatusInternalServerError, utils.ErrorCodeInternalError, "添加菜品失败")
		return
	}

	utils.Success(c, food)
}

// DeleteFood 删除菜品
func DeleteFood(c *gin.Context) {
	id := c.Param("id")
	
	var food config.Food
	if err := config.DB.First(&food, id).Error; err != nil {
		utils.Error(c, http.StatusNotFound, utils.ErrorCodeNotFound, "菜品不存在")
		return
	}

	if err := config.DB.Delete(&food).Error; err != nil {
		utils.Error(c, http.StatusInternalServerError, utils.ErrorCodeInternalError, "删除菜品失败")
		return
	}

	utils.Success(c, gin.H{"message": "删除成功"})
} 