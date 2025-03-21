package main

import (
	"fmt"
	"io"
	"log"
	"os"
	"time"
)

func main() {
	log.SetFlags(log.Ldate | log.Ltime | log.Lshortfile)
	file, err := os.OpenFile(fmt.Sprintf("./logs/backend/app_%v.log", time.Now().Format("2006.01.02_15.04.05")), os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		log.Fatal("Failed to open log file:", err)
	}
	defer file.Close()

	multiWriter := io.MultiWriter(os.Stdout, file)
	log.SetOutput(multiWriter)

	log.Println("Starting application...")
	ApiApplication()
}
