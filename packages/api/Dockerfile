# Builder
FROM node:12-alpine as builder

# Copy API and domain + lib packages
WORKDIR /usr/src/nest-react/
COPY .eslintrc .
COPY .eslintignore .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY packages/api packages/api
COPY packages/domain packages/domain
COPY packages/lib packages/lib

# Install domain + lib + API dependencies
RUN yarn install --pure-lockfile --non-interactive
RUN yarn build:common

# Build API then
WORKDIR /usr/src/nest-react/packages/api
RUN yarn build

# Runner
FROM node:12-alpine AS runner

# Copy the dist builds from builder
WORKDIR /usr/src/nest-react
COPY --from=builder /usr/src/nest-react/package.json .
COPY --from=builder /usr/src/nest-react/yarn.lock .
COPY --from=builder /usr/src/nest-react/tsconfig.json .

COPY --from=builder /usr/src/nest-react/packages/domain/package.json packages/domain/package.json
COPY --from=builder /usr/src/nest-react/packages/domain/dist packages/domain/dist

COPY --from=builder /usr/src/nest-react/packages/lib/package.json packages/lib/package.json
COPY --from=builder /usr/src/nest-react/packages/lib/dist packages/lib/dist

COPY --from=builder /usr/src/nest-react/packages/api/package.json packages/api/package.json
COPY --from=builder /usr/src/nest-react/packages/api/dist packages/api/dist

# Install production dependencies
RUN yarn install --pure-lockfile --non-interactive --production

# Move to the API app
WORKDIR /usr/src/nest-react/packages/api

# Set the correct ownership for the app folder
RUN chown -R node:node /usr/src/nest-react/packages/api/

# Launch the API with container
ARG NODE_ENV=production
CMD ["yarn", "start:prod"]
