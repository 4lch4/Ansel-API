package config

import (
	"os"

	"github.com/4lch4/iloj"
	"github.com/joho/godotenv"
)

// The object containing the config values.
type Config struct {
	// The port the server will run on.
	Port string

	// The version of the API.
	ApiVersion string

	// The prefix for the API.
	ApiPrefix string

	// The access key for the Spaces bucket.
	SpacesKey string

	// The secret key for the Spaces bucket.
	SpacesSecret string

	// The base URL for the CDN where the assets are retrieved from.
	SpacesCDNUrl string
}

// Get the value of an environment variable, or return a default value if it doesn't exist.
func getEnv(key, defaultValue string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		return defaultValue
	}

	return value
}

func init() {
	funcName := "config:init"

	err := godotenv.Load()
	iloj.HandleError(err, &funcName)
}

// Get the config values from the environment variables and return them as a Config object.
func GetConfig() Config {
	// Set the config values.
	config := Config{
		Port:         getEnv("API_PORT", "8080"),
		ApiVersion:   getEnv("API_VERSION", "v1"),
		ApiPrefix:    getEnv("API_PREFIX", "/api"),
		SpacesKey:    getEnv("SPACES_KEY", ""),
		SpacesSecret: getEnv("SPACES_SECRET", ""),
		SpacesCDNUrl: getEnv("SPACES_CDN_URL", ""),
	}

	return config
}
