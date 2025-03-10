package utils

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

// Response 统一响应结构
type Response struct {
    Data      interface{} `json:"data"`
    ErrorCode int         `json:"errorCode"`
    Msg       string      `json:"msg"`
}

// Success 成功响应
func Success(c *gin.Context, data interface{}) {
    c.JSON(http.StatusOK, Response{
        Data:      data,
        ErrorCode: 0,
        Msg:       "success",
    })
}

// Error 错误响应
func Error(c *gin.Context, httpStatus int, errorCode int, msg string) {
    c.JSON(httpStatus, Response{
        Data:      nil,
        ErrorCode: errorCode,
        Msg:       msg,
    })
}

// ErrorCodes 错误码定义
const (
    ErrorCodeSuccess        = 0    // 成功
    ErrorCodeParamInvalid   = 1001 // 参数无效
    ErrorCodeDuplicate      = 1002 // 数据重复
    ErrorCodeNotFound       = 1003 // 数据不存在
    ErrorCodeInternalError  = 1004 // 内部错误
) 