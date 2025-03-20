package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"Username" bson:"Username"`
	Password string             `json:"Password" bson:"Password"`
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "4000"
	}
	apiApplication(PORT)
}
