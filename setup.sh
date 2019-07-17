#!/bin/bash

./node_modules/.bin/webpack
./flask/data/static/js
tsc main.ts
