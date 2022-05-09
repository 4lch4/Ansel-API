[![Build Status](https://dev.azure.com/4IS/Ansel/_apis/build/status/Ansel-API?branchName=main)](https://dev.azure.com/4IS/Ansel/_build/latest?definitionId=23&branchName=main)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d14baf9dc560458d86493a3813f43599)](https://www.codacy.com/gh/4lch4/Ansel/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=4lch4/Ansel&amp;utm_campaign=Badge_Grade)
![Depfu](https://img.shields.io/depfu/dependencies/github/4lch4/Ansel-API?style=flat-square)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)

- [Ansel](#ansel)
  - [Name](#name)
  - [Development - Road to v1](#development---road-to-v1)
  - [Usage - Server](#usage---server)
    - [Quickstart / `start.sh`](#quickstart--startsh)
    - [Setup](#setup)
    - [Start It Up](#start-it-up)
  - [Usage - Client](#usage---client)
    - [List Folders](#list-folders)
    - [Get Images](#get-images)
      - [Random Retrieval](#random-retrieval)
      - [Index Retrieval](#index-retrieval)
    - [Healthcheck Endpoints](#healthcheck-endpoints)
      - [Liveness](#liveness)
      - [Readiness](#readiness)

# Ansel

Ansel is an API written in [TypeScript][3] using the [KoaJS framework][4], providing endpoints to retrieve images/data from S3/B2 buckets.

## Name

Ansel is named after [Ansel][1] [Adams][0].

## Development - Road to v1

These items are what I consider the stepping stones to `v1`.

- [ ] Full CRUD endpoints
  - Basically I want to be able to upload new assets, update existing assets, delete assets, and of course retrieve/get assets.
  - [x] [`/get`][9]
    - [x] `/get/:folderName`
      - [x] Returns a random asset from the folder w/ the same name as the `folderName` parameter.
    - [x] `/get/:folderName/:assetId`
      - [x] Return the asset from the folder w/ the same name as the `folderName` parameter and id matching the given `assetId` parameter.
  - [x] [`/list`][11]
  - [ ] [`/delete`][12]
  - [ ] [`/upload`][13]
- [ ] All endpoints should return the following basic status codes as expected:
  - [x] Successful
    - [x] 200 - OK
    - [x] 201 - Created
    - [x] 202 - Accepted
    - [x] 203 - Non-Authoritative Information
    - [x] 204 - No Content
    - [x] 205 - Reset Content
    - [x] 206 - Partial Content
  - [x] Client Error
    - [x] 400 - Bad Request
    - [x] 401 - Unauthorized
    - [x] 402 - Payment Required
    - [x] 403 - Forbidden
    - [x] 404 - Not Found
    - [x] 405 - Method Not Allowed
      - [x] This one is handled by Koa under the hood for us.
  - [x] Server Error
    - [x] 500 - A generic server error, doesn't fit any of the following codes.
- [ ] [OpenAPI Spec][14]
  - I want/need an OpenAPI specification file to make it easier for folks to begin using the API.
- [ ] [Documentation Site][10]
  - [Ansel-Docs Website][5]
- [ ] Support for both [S3 compatible][6] APIs and [Backblaze B2][7] storage methods.
  - [ ] S3
  - [ ] B2
- [ ] Benchmarks using [Artillery][8] or something similar.
- [ ] This is more of a wish than a requirement but I'd like to have full monitoring of the various components within Dynatrace and/or Ackee (Theia).

## Usage - Server

In order to use the Ansel API, you must have a few things already good to go. For example, the S3 bucket which will contain your images should already be setup and an API key to access it generated.

### Quickstart / `start.sh`

In the repo is a script called `start.sh` which will start up a Docker container running the latest version of the Ansel API. The only requirement is that you rename the `settings.sample.json` file to `settings.json` and populate it with the necessary values. You can now run `start.sh` and it'll start the container then begin tailing the logs.

_NOTE: `Ctrl+C` will stop the tailing/following of the logs so you can get your terminal back._

### Setup

First up, you need to provide a few environment variables to the Docker image for it to work correctly. The `start.sh` script shows exactly what parameters are needed, but we'll go over them here:

- `appName` ⸺ `APP_NAME`
  - The display name of the application. `Ansel` by default.
- `version` ⸺ `VERSION`
  - The version of the application.
- `port` ⸺ `PORT`
  - The port to listen on, defaults to `8080`.
- `apiPrefix` ⸺ `API_PREFIX`
  - The prefix of all endpoints, defaults to `/api/v1`.
- `imgBaseUrl` ⸺ `IMG_BASE_URL`
  - The URL to append to the beginning of each image URL.
- `bucketName` ⸺ `BUCKET_NAME`
  - The name of the bucket containing your images.
- `bucketEndpoint` ⸺ `BUCKET_ENDPOINT`
  - The url/endpoint for accessing the s3 API of the given bucket.
- `bucketAccessKeyId` ⸺ `BUCKET_ACCESS_KEY_ID`
  - The access key id for the s3 bucket that contains your images.
- `bucketSecretAccessKey` ⸺ `BUCKET_SECRET_ACCESS_KEY`
  - The secret access key for the s3 bucket that contains your images.

### Start It Up

The easiest way to pass these to the Docker image is to rename the `settings.sample.json` file to `settings.json` and run the `start.sh` script. It will start the Docker container for you using the following command, which we'll break down:

```bash
1  docker run -p $PORT:$PORT -d \
2    -e BUCKET_ENDPOINT=$BUCKET_ENDPOINT \
3    -e BUCKET_ACCESS_KEY_ID=$BUCKET_ACCESS_KEY_ID \
4    -e BUCKET_SECRET_ACCESS_KEY=$BUCKET_SECRET_ACCESS_KEY \
5    -e APP_NAME=$APP_NAME \
6    -e VERSION=$VERSION \
7    -e PORT=$PORT \
8    -e API_PREFIX=$API_PREFIX \
9    -e BUCKET_NAME=$BUCKET_NAME \
10   -e IMG_BASE_URL=$IMG_BASE_URL \
11   --name ansel 4lch4/ansel:latest
```

1. The first line is the docker run command, but with the `-d` and `-p` parameters.
   1. `-d` tells Docker to run the container in daemon mode, so that it can run in the background.
   2. `-p` tells the container the port to assign/forward for the container.
2. Lines 2-10 are assigning environment variables using the values from the `settings.json` file.
3. Line 11 provides the `--name` parameter and then the image with the `author/image-name:version` format.
   1. The `--name ansel` parameter and value tells Docker what to name the container when it's created. This is what you use when running commands such as `docker stop ansel` or `docker logs ansel`.
   2. The `4lch4/ansel:latest` bit specifies the image to run, which in this case, is the latest ansel image published by 4lch4 (me).

## Usage - Client

Once the API server is up and running, [using the above steps](#usage-server), you can begin calling it and receiving images/data. First things first ports and URLs:

- If you are running the server as is without a reverse proxy then you'll need to append the port number to your URLs.
- If you have a custom apiPrefix be sure to keep that in mind. Otherwise, the default is `/api/v1`.

Once you have the above info, you're able to begin making requests! The following samples utilize the [HTTPie CLI utility][2]:

### List Folders

Since images are categorized in folders, the `/list` endpoint will return an object containing a count of the folders and an array of those folders in the s3 bucket:

```bash
❯ http GET localhost:8080/api/v1/list --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 460
...

{
    "count": 54,
    "data": [
        "alcha",
        ...
        "whack"
    ]
}
```

### Get Images

There are two ways to retrieve images from a given folder: Randomly or Index-based

#### Random Retrieval

If you don't care which image is returned, hit the `/get` endpoint with the name of the folder:

```bash
❯ http GET localhost:8080/api/v1/get/alcha --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 42
...

https://i.ansel.rest/alcha/alcha-6.png
```

#### Index Retrieval

My personal instance of Ansel has images indexed by filename and each filename has the index number in it. Therefore, retrieving specific images is easy once you know the index/number of the file:

```bash
❯ http GET localhost:8080/api/v1/get/alcha/2 --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 42
...

https://i.ansel.rest/alcha/alcha-2.gif
```

### Healthcheck Endpoints

Since Ansel is designed to be run within Kubernetes it has healthcheck endpoints available by default.

#### Liveness

```bash
❯ http GET localhost:8080/api/v1/health/liveness --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
...

OK
```

#### Readiness

```bash
❯ http GET localhost:8080/api/v1/health/readiness --check-status

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
...

OK
```

[0]: https://en.wikipedia.org/wiki/Ansel_Adams
[1]: http://anseladams.com/
[2]: https://httpie.io/
[3]: https://www.typescriptlang.org/
[4]: https://koajs.com/
[5]: https://docs.ansel.rest
[6]: https://www.backblaze.com/b2/cloud-storage.html
[7]: https://aws.amazon.com/s3/
[8]: https://github.com/artilleryio/artillery
[9]: https://github.com/4lch4/Ansel-API/issues/267
[10]: https://github.com/4lch4/Ansel-API/issues/268
[11]: https://github.com/4lch4/Ansel-API/issues/269
[12]: https://github.com/4lch4/Ansel-API/issues/270
[13]: https://github.com/4lch4/Ansel-API/issues/271
[14]: https://github.com/4lch4/Ansel-API/issues/272
[15]: https://github.com/4lch4/Ansel-API/issues/273
