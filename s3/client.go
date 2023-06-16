package s3

import (
	"fmt"
	"os"
	"strings"

	// "github.com/4lch4/ansel-api/types"
	"github.com/4lch4/iloj"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

type FoldersResponse struct {
	Folders []string `json:"folders"`
	Count   int      `json:"count"`
}

// #region Defaults

// A map containing the name of each property/variable needed by the API and its corresponding
// environment variable. I do this in case I ever need to modify the name of an environment variable
// I can change it here and not have to change it in every place it's used.
var EnvVarNames = map[string]string{
	"ServerURL":      "SERVER_URL",
	"S3Region":       "S3_REGION",
	"SpacesEndpoint": "SPACES_ENDPOINT",
	"SpacesKey":      "SPACES_KEY",
	"SpacesSecret":   "SPACES_SECRET",
}

// The default name of the application using the logger.
var defaultAppName = "Ansel-API"

// The default log level for glogger.
var defaultLogLevel = 0

// The default S3 region.
var defaultS3Region = "us-east-1"

// The default API server URL.
var defaultServerUrl = "localhost:8080"

// The default Spaces endpoint.
var defaultSpacesEndpoint = "nyc3.digitaloceanspaces.com"

// #endregion Defaults

// #region Spaces Values

// Get the Spaces access key from an environment variable (SPACES_KEY). If no value is set, then a
// panic is thrown.
func getSpacesKey() string {
	return getEnvVar(EnvVarNames["SpacesKey"], nil)
}

// Get the Spaces secret key from an environment variable (SPACES_SECRET). If no value is set, then
// a panic is thrown.
func getSpacesSecret() string {
	return getEnvVar(EnvVarNames["SpacesSecret"], nil)
}

func getSpacesCredentials() *credentials.Credentials {
	return credentials.NewStaticCredentials(getSpacesKey(), getSpacesSecret(), "")
}

// Get the Spaces endpoint from an environment variable (SPACES_ENDPOINT). If no value is set, then
// the default value of https://nyc3.digitaloceanspaces.com is returned. It also makes sure that the
// endpoint starts with https:// before returning it, modifying the value if necessary.
func getSpacesEndpoint() string {
	spacesEndpoint := getEnvVar(EnvVarNames["SpacesEndpoint"], &defaultSpacesEndpoint)

	// Validate that the endpoint starts with https://. If it doesn't then it'll be added. If it
	// starts with http:// then it'll be replaced with https://.
	if strings.HasPrefix(spacesEndpoint, "https://") {
		return spacesEndpoint
	} else if strings.HasPrefix(spacesEndpoint, "http://") {
		// Trim the http:// from the beginning of the string and ignore the found boolean.
		spacesEndpoint, _ = strings.CutPrefix(spacesEndpoint, "http://")
	}

	return "https://" + spacesEndpoint
}

// Get the S3 region from an environment variable (S3_REGION). If no value is set, then the default
// value of us-east-1 is returned.
func getS3Region() string {
	return getEnvVar(EnvVarNames["S3Region"], &defaultS3Region)
}

// #endregion Spaces Values

func getEnvVar(envVarName string, defaultValue *string) string {
	envVarValue, exists := os.LookupEnv(envVarName)

	if exists {
		return envVarValue
	} else if !exists && defaultValue != nil {
		return *defaultValue
	} else {
		errorMsg := envVarName + " environment variable not set."
		fmt.Println(errorMsg, "getEnvVar")

		panic(errorMsg)
	}
}

func S3Client() (*s3.S3, error) {
	s3Config := &aws.Config{
		Credentials: getSpacesCredentials(),
		Endpoint:    aws.String(getSpacesEndpoint()),
		Region:      aws.String(getS3Region()),
	}

	newSession, err := session.NewSession(s3Config)
	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	}

	s3Client := s3.New(newSession)

	return s3Client, nil
}

func GetFolders(s3Client *s3.S3, path string) ([]string, error) {
	var folderNames []string

	err := s3Client.ListObjectsPages(&s3.ListObjectsInput{
		Bucket: aws.String(path),
		// Delimiter: aws.String("/"),
	}, func(output *s3.ListObjectsOutput, lastPage bool) bool {
		for _, object := range output.Contents {
			splitKey := strings.Split(*object.Key, "/")

			// Makes sure that the key is a folder name and not a top-level file.
			if len(splitKey) > 1 {
				folderName := splitKey[0]

				if !iloj.StringInArray(folderName, folderNames) {
					folderNames = append(folderNames, folderName)
				}
			}
		}

		return !lastPage
	})

	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	} else {
		return folderNames, nil
	}
}

func GetFiles(s3Client *s3.S3, folder string) ([]string, error) {
	var fileNames []string

	err := s3Client.ListObjectsPages(&s3.ListObjectsInput{
		Bucket: aws.String("ansel"),
		// Delimiter: aws.String("/"),
	}, func(output *s3.ListObjectsOutput, lastPage bool) bool {
		for _, object := range output.Contents {
			splitKey := strings.Split(*object.Key, "/")

			// Makes sure that the key is a folder name and not a top-level file.
			if len(splitKey) > 1 {
				fileName := splitKey[len(splitKey)-1]
				folderName := splitKey[len(splitKey)-2]

				if folderName == folder && !iloj.StringInArray(fileName, fileNames) {
					fileNames = append(fileNames, fileName)
				}
			}
		}

		return !lastPage
	})

	if err != nil {
		fmt.Println(err.Error())
		return nil, err
	} else {
		return fileNames, nil
	}
}

func GetFile(s3Client *s3.S3, path string) (*s3.GetObjectOutput, error) {
	obj, err := s3Client.GetObject(&s3.GetObjectInput{
		Bucket: aws.String("ansel"),
		Key:    aws.String(path),
	})

	if err != nil {
		// fmt.Println(err.Error())
		return nil, err
	} else {
		return obj, nil
	}
}
