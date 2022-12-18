#!/usr/bin/env bash

# if [ ! -f .env ]; then
#     export "$(cat server/.env | xargs)"
# fi

tmux \
    new-session  "cd server || exit; npm run dev:env"\; \
    split-window "cd server || exit; docker compose up --remove-orphans"\; \
    new-session  "cd client || exit; npm run start"\; \
    split-window "cd client || exit; npm run test"\; \
