# Builder
FROM node:12-alpine as builder

# Copy frontend and domain + lib packages
WORKDIR /usr/src/nest-react/
COPY .eslintrc .
COPY .eslintignore .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY packages/frontend packages/frontend
COPY packages/domain packages/domain
COPY packages/lib packages/lib

# Install domain + lib + frontend dependencies
RUN yarn install --pure-lockfile --non-interactive
RUN yarn compile

# Build frontend then
WORKDIR /usr/src/nest-react/packages/frontend
RUN yarn build

# Runner
FROM nginx:alpine as runner

# Copy the nginx configuration
COPY packages/frontend/nginx.conf /etc/nginx/nginx.conf

# Copy the built static files to nginx + dictionaries
COPY --from=builder /usr/src/nest-react/packages/frontend/dist /usr/share/nginx/html
