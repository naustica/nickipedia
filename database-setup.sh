#!/bin/bash

readonly BASENAME=$PWD

python ./flask/dbconfig.py
cd ~
cd "$BASENAME"
