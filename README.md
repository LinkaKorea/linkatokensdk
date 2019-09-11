
# Linka Token SDK.

## NodeJS
curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install nodejs -y
nodejs -v

sudo apt-get install -y build-essential

## Directory
    linkaokensdk - SDK for using linkatoken. Provides functions provided by web3js.
    > bin ----- makeSignForTokenInit.sh   Signature feature for token init
            L-- makeSignForTransfer.sh    Provide signature function for token transfer
            L-- makeSignForRegistAddress.sh    Provide signature function for address registration
    > lib ----- library to provide the above Tree functions
    > sample -- sample data
