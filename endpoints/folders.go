package endpoints

import (
	"fmt"
	"log"
	"strings"

	"github.com/4lch4/ansel-api/config"
	"github.com/4lch4/ansel-api/s3"
	"github.com/gofiber/fiber/v2"
)

type FolderResponse struct {
	Files      []string `json:"files"`
	FolderName string   `json:"folderName"`
}

type ImageResponse struct {
	Url          string `json:"url"`
	LastModified string `json:"lastModified"`
}

func GetFolder(c *fiber.Ctx) error {
	s3Client, err := s3.S3Client()
	if err != nil {
		errMsg := "Error getting S3 client: " + err.Error()

		fmt.Println(errMsg)
		return c.SendString(errMsg)
	}

	folderName := c.Params("folder")
	folder, err := s3.GetFiles(s3Client, folderName)
	if err != nil {
		errMsg := "Error getting folder (" + folderName + "): " + err.Error()

		fmt.Println(errMsg)
		return c.SendString(errMsg)
	}

	return c.JSON(&FolderResponse{
		Files:      folder,
		FolderName: folderName,
	})
}

func GetFolderItem(c *fiber.Ctx) error {
	s3Client, err := s3.S3Client()
	if err != nil {
		errMsg := "Error getting S3 client: " + err.Error()

		fmt.Println(errMsg)
		return c.SendString(errMsg)
	}

	folderName := c.Params("folder")
	assetName := c.Params("asset")

	folder, err := s3.GetFile(s3Client, folderName+"/"+assetName)
	if err != nil {
		if strings.Contains(err.Error(), "NoSuchKey") {
			return c.SendStatus(404)
		} else {
			errMsg := "Error getting folder (" + folderName + "): " + err.Error()

			fmt.Println(errMsg)
			return c.SendString(errMsg)
		}
	} else {
		cfg := config.GetConfig()
		// imgUrl := "https://ansel.nyc3.cdn.digitaloceanspaces.com/" + folderName + "/" + assetName

		return c.JSON(&ImageResponse{
			Url:          cfg.SpacesCDNUrl + "/" + folderName + "/" + assetName,
			LastModified: folder.LastModified.String(),
		})
	}
}

func GetFolders(c *fiber.Ctx) error {
	s3Client, err := s3.S3Client()
	if err != nil {
		log.Fatal(err)
	}

	folders, err := s3.GetFolders(s3Client, "ansel")
	if err != nil {
		return c.SendString("Error getting folders")
	} else {
		return c.JSON(&s3.FoldersResponse{
			Folders: folders,
			Count:   len(folders),
		})
	}
}
