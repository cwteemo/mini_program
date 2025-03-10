package config

import (
	"fmt"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
)

var DB *gorm.DB

func InitDB() {
	hideConsoleIfNeeded() // 平台特定的实现

	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		"root",           // 用户名
		"Zhx123!_",      // 密码
		"49.233.56.149", // 主机
		33066,           // 端口
		"mini_program",  // 数据库名
	)

	DB, err = gorm.Open("mysql", dsn)
	if err != nil {
		panic("Failed to connect to database: " + err.Error())
	}

	// 设置连接池
	DB.DB().SetMaxIdleConns(10)
	DB.DB().SetMaxOpenConns(100)

	// 启用日志
	DB.LogMode(true)

	// 自动迁移数据库表
	autoMigrate()
}

func autoMigrate() {
	// 在这里添加需要自动迁移的模型
	DB.AutoMigrate(&Food{})
}

// Food 模型
type Food struct {
	gorm.Model
	Name string `gorm:"type:varchar(100);not null;unique"`
}