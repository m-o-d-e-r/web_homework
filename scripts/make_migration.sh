#!/bin/bash

ResetColor='\033[0m'       # Text Reset

Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Blue='\033[0;34m'         # Blue
Cyan='\033[0;36m'         # Cyan

echo -ne "${Blue}Enter revision message > ${ResetColor}"
read message

if [ ! "$message" ];
then
    echo -e "\n\t${Red}Revision message is not provided${ResetColor}"
    exit
fi

echo -e $Green
flask --app api.__main__ db migrate -m "$message"
