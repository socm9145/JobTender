#!/bin/sh
current_date=$(date)
echo " "
echo "--------------"
echo $current_date
echo "shell start"
docker-compose -f /home/ubuntu/S08P22A203/python/docker-compose.yml up -d
echo "shell end"
echo "--------------"
