package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func apiApplication(PORT string) {
	app := fiber.New(fiber.Config{
		AppName: "Trigger Master API v1.0.1",
	})

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5174/",
		AllowMethods: "POST, GET, OPTIONS",
		AllowHeaders: "Origin,Content-Type,Accept",
	}))

	app.Post("/api/login", login)

	log.Fatal(app.Listen("0.0.0.0:" + PORT))
}

func login(c *fiber.Ctx) error {
	user := new(User)
	if err := c.BodyParser(user); err != nil {
		return err
	}
	// validate login
	url, err := validate_adaptive_account(*user)
	if err != nil {
		return err
	}
	if url == "error-authentication-failure" {
		return c.Status(202).JSON("Invalid username or password")
	}
	if err := store_user(*user); err != nil {
		return err
	}
	return c.Status(201).JSON(url)
}
