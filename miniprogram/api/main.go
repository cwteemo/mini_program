package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/mini-program/api/config"
	"github.com/mini-program/api/handlers"
)

func main() {
	fmt.Println("Starting server...")
	// 初始化数据库连接
	config.InitDB()
	defer config.DB.Close()
	fmt.Println("Database connected successfully")

	// 创建 Gin 路由
	r := gin.Default()

	// 允许跨域
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		
		c.Next()
	})

	// 设置路由
	r.GET("/foods", handlers.GetFoodList)
	r.POST("/foods", handlers.AddFood)
	r.DELETE("/foods/:id", handlers.DeleteFood)

	fmt.Println("Server starting on port 8081...")
	// 启动服务器
	if err := r.Run(":8081"); err != nil {
		fmt.Printf("Server failed to start: %v\n", err)
	}
} 