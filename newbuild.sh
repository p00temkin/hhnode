#!/bin/sh
docker build -t hhnode .
docker run -d -p 8545:8545 hhnode
