#!/bin/bash

LOCAL_SETTINGS=$(cat local.settings.json)
PACKAGE_JSON=$(cat package.json)

APP_NAME=$(echo $PACKAGE_JSON | jq -r .displayName)
DOCKER_APP_NAME=$(echo $PACKAGE_JSON | jq -r .name)
VERSION=$(echo $PACKAGE_JSON | jq -r .version)
PORT=$(echo $LOCAL_SETTINGS | jq -r .port)
API_PREFIX=$(echo $LOCAL_SETTINGS | jq -r .apiPrefix)
BUCKET_NAME=$(echo $LOCAL_SETTINGS | jq -r .bucketName)
IMG_BASE_URL=$(echo $LOCAL_SETTINGS | jq -r .imgBaseUrl)
BUCKET_ENDPOINT=$(echo $LOCAL_SETTINGS | jq -r .bucketEndpoint)
BUCKET_ACCESS_KEY_ID=$(echo $LOCAL_SETTINGS | jq -r .bucketAccessKeyId)
BUCKET_SECRET_ACCESS_KEY=$(echo $LOCAL_SETTINGS | jq -r .bucketSecretAccessKey)

docker run -p $PORT:$PORT -d \
  -e BUCKET_ENDPOINT=$BUCKET_ENDPOINT \
  -e BUCKET_ACCESS_KEY_ID=$BUCKET_ACCESS_KEY_ID \
  -e BUCKET_SECRET_ACCESS_KEY=$BUCKET_SECRET_ACCESS_KEY \
  -e APP_NAME=$APP_NAME \
  -e VERSION=$VERSION \
  -e PORT=$PORT \
  -e API_PREFIX=$API_PREFIX \
  -e BUCKET_NAME=$BUCKET_NAME \
  -e IMG_BASE_URL=$IMG_BASE_URL \
  -e LOGROCKET_ID=$LOGROCKET_ID \
  --name ansel 4lch4/ansel:latest

docker logs ansel --follow
