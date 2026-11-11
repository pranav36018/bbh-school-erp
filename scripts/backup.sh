#!/usr/bin/env bash
# Automated PostgreSQL Backup Script for India Unified School ERP
set -e

BACKUP_DIR="${BACKUP_DIR:-/backups}"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/school_erp_backup_${TIMESTAMP}.sql.gz"

mkdir -p "$BACKUP_DIR"

echo "📦 [$(date)] Initiating full database backup..."
pg_dump "$DATABASE_URL" | gzip > "$BACKUP_FILE"

echo "✅ Backup generated successfully: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"

# Retention: Delete backups older than 30 days
find "$BACKUP_DIR" -type f -name "school_erp_backup_*.sql.gz" -mtime +30 -delete
echo "🧹 Old backups pruned (retention: 30 days)."
