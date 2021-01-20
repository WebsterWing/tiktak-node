#!/bin/bash
cd /home/ec2
pm2 start tiktak-node
pm2 startup
pm2 save