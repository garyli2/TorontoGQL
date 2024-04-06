FROM denoland/deno:latest
# The port that your application listens to.
EXPOSE 4000

RUN apt update && apt install -y git

WORKDIR /app
USER root

ADD . .
RUN rm -r node_modules
ENV SEQUELIZE_URL=postgres://postgres:abc123@db-prod:5432/postgres
CMD ["run", "--allow-net", "--allow-read", "--allow-env", "--allow-run", "src/index.ts"]