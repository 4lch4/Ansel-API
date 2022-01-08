#!/bin/bash

LOCAL_SETTINGS=$(cat local.settings.json)
PACKAGE_JSON=$(cat package.json)

SPACES_ENDPOINT=$(echo $LOCAL_SETTINGS | jq -r .spacesEndpoint)
APP_NAME=$(echo $PACKAGE_JSON | jq -r .displayName)
DOCKER_APP_NAME=$(echo $PACKAGE_JSON | jq -r .name)
VERSION=$(echo $PACKAGE_JSON | jq -r .version)
PORT=$(echo $LOCAL_SETTINGS | jq -r .port)
API_PREFIX=$(echo $LOCAL_SETTINGS | jq -r .apiPrefix)
BUCKET_NAME=$(echo $LOCAL_SETTINGS | jq -r .bucketName)
IMG_BASE_URL=$(echo $LOCAL_SETTINGS | jq -r .imgBaseUrl)
SPACES_ACCESS_KEY_ID=$(echo $LOCAL_SETTINGS | jq -r .spacesAccessKeyId)
SPACES_SECRET_ACCESS_KEY=$(echo $LOCAL_SETTINGS | jq -r .spacesSecretAccessKey)
LOGROCKET_ID=$(echo $LOCAL_SETTINGS | jq -r .logRocketId)

docker run -p $PORT:$PORT -d \
  -e SPACES_ENDPOINT=$SPACES_ENDPOINT \
  -e SPACES_ACCESS_KEY_ID=$SPACES_ACCESS_KEY_ID \
  -e SPACES_SECRET_ACCESS_KEY=$SPACES_SECRET_ACCESS_KEY \
  -e APP_NAME=$APP_NAME \
  -e VERSION=$VERSION \
  -e PORT=$PORT \
  -e API_PREFIX=$API_PREFIX \
  -e BUCKET_NAME=$BUCKET_NAME \
  -e IMG_BASE_URL=$IMG_BASE_URL \
  -e LOGROCKET_ID=$LOGROCKET_ID \
  --name $DOCKER_APP_NAME 4lch4/ansel:latest

docker logs $DOCKER_APP_NAME --follow
