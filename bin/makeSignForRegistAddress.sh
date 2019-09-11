#!/bin/bash
# 파일 위치
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
node ${DIR}/../lib/makeSignForRegistAddress.js -K $2 -O $3 