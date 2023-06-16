package main

import (
	"log"

	"github.com/4lch4/ansel-api/config"
	"github.com/4lch4/ansel-api/endpoints"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func main() {
	cfg := config.GetConfig()

	app := fiber.New()
	app.Use(cors.New())
	app.Use(recover.New(recover.Config{
		EnableStackTrace: true,
	}))

	api := app.Group(cfg.ApiPrefix)

	api.Get("/", endpoints.GetFolders)
	api.Get("/:folder", endpoints.GetFolder)
	api.Get("/:folder/:asset", endpoints.GetFolderItem)

	api.Get("/health/liveness", endpoints.GetHealthLiveness)
	api.Get("/health/readiness", endpoints.GetHealthReadiness)

	log.Fatal(app.Listen(":" + cfg.Port))
}
