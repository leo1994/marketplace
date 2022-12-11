FROM node:18-alpine AS dependencies
ARG BUILD_CONTEXT
WORKDIR /base
COPY package.json package-lock.json tsconfig.base.json ./
COPY ./services/${BUILD_CONTEXT}/package.json ./services/${BUILD_CONTEXT}/tsconfig.json ./services/${BUILD_CONTEXT}/
RUN npm ci

FROM node:18-alpine AS build
ENV NODE_ENV production
ARG BUILD_CONTEXT
WORKDIR /base
COPY --from=dependencies /base/node_modules node_modules/
COPY package.json package-lock.json tsconfig.base.json lerna.json ./
COPY ./services/${BUILD_CONTEXT} ./services/${BUILD_CONTEXT}/
RUN npm run build

FROM node:18-alpine AS prodDependencies
ARG BUILD_CONTEXT
WORKDIR /base
COPY package.json package-lock.json ./
COPY ./services/${BUILD_CONTEXT}/package.json ./services/${BUILD_CONTEXT}/
RUN npm ci --production

FROM node:18-alpine AS runtime
ARG BUILD_CONTEXT
ENV NODE_ENV production
WORKDIR /base
USER node
COPY --chown=node:node --from=prodDependencies /base/services/${BUILD_CONTEXT}/package.json ./package.json
COPY --chown=node:node --from=prodDependencies /base/node_modules ./node_modules/
COPY --chown=node:node --from=build /base/services/${BUILD_CONTEXT}/dist ./dist/
COPY --chown=node:node --from=build /base/services/${BUILD_CONTEXT}/tsconfig.json ./tsconfig.json

CMD ["npm", "run", "start"]
