# Windows PowerShell Database Backup Script
param(
  [string]$BackupDir = ".\backups"
)

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
if (!(Test-Path $BackupDir)) {
  New-Item -ItemType Directory -Path $BackupDir | Out-Null
}

$backupFile = Join-Path $BackupDir "school_erp_backup_$timestamp.sql"
Write-Host "📦 Starting database backup to $backupFile..."

if (Get-Command pg_dump -ErrorAction SilentlyContinue) {
  pg_dump -U postgres -d school_erp -f $backupFile
  Write-Host "✅ Backup completed: $backupFile"
} else {
  Write-Warning "pg_dump binary not found in PATH. In production Docker environment, use backup.sh."
}
