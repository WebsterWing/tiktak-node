#!/bin/bash
pm2 start ~/tiktak-node/index.js
pm2 unstartup
pm2 startup
pm2 save