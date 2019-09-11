#!/bin/bash
# 파일 위치
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
node ${DIR}/../lib/makeSignForTokenInit.js -S $1 -N $2 -K $3 -O $4 