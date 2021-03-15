#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Exit on fail or ctrl-c
set -e
trap "exit" INT

if [[ -z "${PACKAGE}" ]]; then
  echo "You must specify a PACKAGE name (server or client) as an environment, e.g.: PACKAGE=server"
  exit 1
fi

# Generate VERSION file
source $DIR/generate_version.sh

LOCAL_VERSION="${VERSION:-latest}"

DOCKER_IMAGE="docker.pkg.github.com/landazuripaul/nest-react/nest-react-$PACKAGE:$LOCAL_VERSION"

printf "> Building the Docker image: $DOCKER_IMAGE ...\n"

DOCKER_BUILDKIT=1 docker build -f ./packages/$PACKAGE/Dockerfile -t $DOCKER_IMAGE .

printf "\n\n> Sending built image to the registry...\n"

docker push $DOCKER_IMAGE
