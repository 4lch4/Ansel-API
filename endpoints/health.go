package endpoints

import (
	"github.com/gofiber/fiber/v2"
)

func GetHealthLiveness(c *fiber.Ctx) error {
	return c.SendString("OK")
}

func GetHealthReadiness(c *fiber.Ctx) error {
	return c.SendString("OK")
}
