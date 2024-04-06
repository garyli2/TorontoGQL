FROM denoland/deno:latest
# The port that your application listens to.
EXPOSE 4000

RUN apt update && apt install -y git

WORKDIR /app
USER root

ADD . .
RUN rm -r node_modules
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "--allow-run", "src/index.ts"]