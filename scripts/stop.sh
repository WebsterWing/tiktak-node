#!/bin/bash
rm -rf /var/www/TikTak

systemctl-exists() {
  [ $(systemctl list-unit-files "${1}*" | wc -l) -gt 3 ]
}

systemctl-exists TikTak && systemctl stop TikTak
