#!/usr/bin/env bash

# Constants
VERSION_FILENAME="$(pwd)/VERSION"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Git info
GIT_SHORT_HASH=$(git rev-parse --short HEAD)
GIT_BRANCH=$(git branch --show-current)

# Packages info
REPO_VERSION=$(node $DIR/getPackageVersion.js)
CLIENT_VERSION=$(node $DIR/getPackageVersion.js client)
DOMAIN_VERSION=$(node $DIR/getPackageVersion.js domain)
LIB_VERSION=$(node $DIR/getPackageVersion.js lib)
SERVER_VERSION=$(node $DIR/getPackageVersion.js server)

cat > $VERSION_FILENAME <<- EOF
GIT_SHORT_HASH=$GIT_SHORT_HASH
GIT_BRANCH=$GIT_BRANCH
REPO_VERSION=$REPO_VERSION
CLIENT_VERSION=$CLIENT_VERSION
DOMAIN_VERSION=$DOMAIN_VERSION
LIB_VERSION=$LIB_VERSION
SERVER_VERSION=$SERVER_VERSION
EOF

echo "> $VERSION_FILENAME file generated"
