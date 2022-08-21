# Builder
FROM node:16-alpine as builder

# Copy client and domain + lib packages
WORKDIR /usr/src/nest-react/
COPY .eslintrc .
COPY .eslintignore .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .
COPY scripts/fix-common-package-exports.sh scripts/fix-common-package-exports.sh
COPY VERSION .

COPY packages/client packages/client
COPY packages/domain packages/domain
COPY packages/lib packages/lib

# Install domain + lib + client dependencies
RUN yarn install --pure-lockfile --non-interactive

# Build common packages
RUN yarn build:common

# Build client then
WORKDIR /usr/src/nest-react/packages/client
RUN yarn build

# Runner
FROM nginx:alpine as runner

# Copy the nginx configuration
COPY packages/client/nginx.conf /etc/nginx/nginx.conf

# Copy the built static files to nginx + dictionaries
COPY --from=builder /usr/src/nest-react/packages/client/dist /usr/share/nginx/html
