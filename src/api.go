package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func ApiApplication() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file", err)
	}
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "4000"
	}
	app := fiber.New(fiber.Config{
		AppName: "Trigger Master API v1.0.1",
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5176/",
		AllowMethods: "POST, GET, OPTIONS",
		AllowHeaders: "Origin,Content-Type,Accept",
	}))

	app.Post("/api/login", login)

	log.Fatal(app.Listen("0.0.0.0:" + PORT))
}

func login(c *fiber.Ctx) error {
	user := new(User)
	if err := c.BodyParser(user); err != nil {
		log.Println("Error parsing body (login api called): ", err)
		return err
	}
	// validate login
	url, err := ValidateAccount(*user)
	if err != nil {
		log.Println("Error validating user is a user: ", err)
		return err
	}
	if url == "error-authentication-failure" {
		log.Println("User: ", user.User, "entered an invalid username or password.")
		return c.Status(202).JSON("Invalid username or password")
	}
	if err := StoreUser(*user); err != nil {
		log.Println("StoreUser returned error: ", err)
		return err
	}
	log.Println("Login success, logo url returned: ", url)
	return c.Status(201).JSON(url)
}
