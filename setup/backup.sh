# Perform Gitea data backup
backup_file="/backup/gitea_backup_$(date +%Y%m%d%H%M%S).tar.gz"
tar -zcvf "$backup_file" -C /data .

# Clean up old backups (optional)
find /backup -type f -mtime +7 -exec rm {} \;