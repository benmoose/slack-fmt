#!/usr/bin/env bash

docker-compose run -d server npm run tsc:watch \
    && docker-compose run server npm run test:watch
