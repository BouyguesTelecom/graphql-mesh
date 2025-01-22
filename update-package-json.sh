#!/bin/bash

set -e

PACKAGE_JSON_PATH="packages/loaders/openapi/package.json"
NEW_NAME="@bouygues-telecom/omnigraph-openapi"
NEW_VERSION=$1

jq --arg name "$NEW_NAME" --arg ver "$NEW_VERSION" \
  '.name = $name | .version = $ver | .repository.url = "https://github.com/BouyguesTelecom/graphql-mesh.git"' \
  $PACKAGE_JSON_PATH > tmp.json && mv tmp.json $PACKAGE_JSON_PATH

cat $PACKAGE_JSON_PATH
