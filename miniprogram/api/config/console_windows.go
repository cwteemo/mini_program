//go:build windows
// +build windows

package config

import (
	"syscall"
)

func hideConsoleIfNeeded() {
	kernel32 := syscall.NewLazyDLL("kernel32.dll")
	kernel32.NewProc("FreeConsole").Call()
}