#! /bin/bash
cp /var/www/TikTak/TikTak.service /etc/systemd/system
##add exceutable permissions to express app
sudo chmod +x /var/www/TikTak/index.js
##Allows any users to write the app folder. Useful if using fs within the app
sudo chmod go+w /var/www/TikTak
##Launches the express app
sudo systemctl daemon-reload
sudo systemctl start TikTak
sudo systemctl enable TikTak