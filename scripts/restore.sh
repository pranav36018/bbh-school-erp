#!/usr/bin/env bash
# Database Restore Script for India Unified School ERP
set -e

BACKUP_FILE="$1"

if [ -z "$BACKUP_FILE" ] || [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ Error: Please provide a valid backup file path (.sql or .sql.gz)"
  echo "Usage: $0 /path/to/backup.sql.gz"
  exit 1
fi

echo "⚠️ WARNING: This will overwrite the current database!"
read -p "Are you sure you want to proceed? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Restore aborted."
  exit 0
fi

echo "🔄 Restoring database from $BACKUP_FILE..."

if [[ "$BACKUP_FILE" == *.gz ]]; then
  gunzip -c "$BACKUP_FILE" | psql "$DATABASE_URL"
else
  psql "$DATABASE_URL" < "$BACKUP_FILE"
fi

echo "✅ Database restored successfully!"
