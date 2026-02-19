FROM node:20-alpine
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ENV NODE_ENV=production
ARG NPM_BUILD="pnpm install --prod"
EXPOSE 8080/tcp

LABEL maintainer="Alex Scott and the BrowserVM Project"
LABEL summary="LoveHeart2 Official Image"
LABEL description="The official image for LoveHeart2, a powerful web proxy powered by Scramjet."

WORKDIR /app

COPY ["package.json", "pnpm-lock.yaml", "./"]
RUN apk add --upgrade --no-cache python3 make g++
RUN $NPM_BUILD

COPY . .

ENTRYPOINT [ "node" ]
CMD ["src/index.js"]
