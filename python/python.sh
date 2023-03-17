#!/bin/sh
a = date
echo a
echo "shell start"
docker-compose -f /home/ubuntu/S08P22A203/python/docker-compose.yml up -d
echo "shell end"
