[![Build Status](https://dev.azure.com/4lch4/Ansel/_apis/build/status/Ansel-CI?branchName=master)](https://dev.azure.com/4lch4/Ansel/_build/latest?definitionId=6&branchName=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a58e2f46380c4910808923b059914752)](https://www.codacy.com/manual/4lch4/Ansel?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=4lch4/Ansel&amp;utm_campaign=Badge_Grade)
[![dependencies Status](https://img.shields.io/david/HF-Solutions/Tron.svg?style=flat-square)](https://david-dm.org/4lch4/Ansel)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
[![forthebadge](https://forthebadge.com/images/badges/fuck-it-ship-it.svg)](https://forthebadge.com)

# Ansel

Ansel is an API written in TypeScript using the Koa framework, providing endpoints to retrieve images/data from S3 buckets. It was written to be used by my Discord bot, Tron, for commands that are image based such as `+wink` which would return a wink gif/image.

## Name

Ansel is named after [Ansel][1] [Adams][0].

## Setup

To use the application you must provide a few environment variables to the Docker image. The `start.sh` script shows exactly what parameters are needed, but we'll go over them here:

- APP_NAME
  - The display name of the application. Ansel by default.
- VERSION
  - The version of the application.
- PORT
  - The port to listen on, defaults to 8080.
- API_PREFIX
  - The prefix of all endpoints, defaults to `/api/v1`.
- IMG_BASE_URL
  - The URL to append to the beginning of each image URL.
- BUCKET_NAME
  - The name of the bucket containing your images.
- BUCKET_ENDPOINT
  - The url/endpoint for accessing the s3 API of the given bucket.
- BUCKET_ACCESS_KEY_ID
  - The access key id for the s3 bucket that contains your images.
- BUCKET_SECRET_ACCESS_KEY
  - The secret access key for the s3 bucket that contains your images.

[0]: https://en.wikipedia.org/wiki/Ansel_Adams
[1]: http://anseladams.com/
