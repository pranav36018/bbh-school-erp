# PRODUCTION DEPLOYMENT & DEVOPS GUIDE
## India Unified School ERP Platform

This guide outlines deployment options for staging and production environments across Docker, Docker Compose, Managed Cloud Providers (Render, Railway, AWS, Azure, GCP), and self-hosted VPS servers.

---

### 1. Zero-Friction One-Command Docker Compose Deployment

The simplest production-grade deployment runs via Docker Compose with dedicated PostgreSQL and container restart policies:

```bash
# 1. Clone or navigate to the repository
cd "c:\BBH SCHOOL"

# 2. Configure environment variables
cp .env.example .env
# Edit .env with your production secrets (JWT_SECRET, DATABASE_URL)

# 3. Spin up PostgreSQL and the Unified School ERP container
docker compose up -d --build

# 4. Run automated database migrations and seed demo data
docker compose exec app npx prisma migrate deploy
docker compose exec app npm run db:seed
```

Your platform is now live at `http://localhost:3000` with high-availability health checks (`/api/health`) and persistent PostgreSQL storage (`postgres_data` volume).

---

### 2. Cloud Provider Deployments

#### Option A: Railway / Render
1. Connect your GitHub repository to Railway or Render.
2. Provision a **Managed PostgreSQL** database addon.
3. In your Web Service settings, configure the following environment variables:
   - `DATABASE_URL`: `${{Postgres.DATABASE_URL}}`
   - `JWT_SECRET`: Generate a 64-character random string.
   - `COOKIE_SECRET`: Generate a 32-character random string.
   - `NODE_ENV`: `production`
4. Set the build command to:
   ```bash
   npx prisma generate && npm run build
   ```
5. Set the start command to:
   ```bash
   npx prisma migrate deploy && npm start
   ```

#### Option B: AWS ECS / Fargate or DigitalOcean App Platform
1. Build the production Docker image:
   ```bash
   docker build -t india-unified-school-erp:latest .
   ```
2. Push the image to AWS ECR or Docker Hub.
3. Attach an AWS RDS PostgreSQL instance in private VPC subnets.
4. Mount an EFS volume to `/app/public/uploads` for student document storage, or configure S3 environment variables (`STORAGE_TYPE=s3`, `S3_BUCKET_NAME=...`).

---

### 3. Automated Database Backups & Disaster Recovery

#### Scheduled Automated Backup (Linux Cron / Bash):
Add a daily cron job executing `scripts/backup.sh`:
```bash
# Backup everyday at 02:00 AM IST
0 2 * * * /bin/bash /app/scripts/backup.sh >> /var/log/erp_backup.log 2>&1
```

#### Manual Backup Execution:
- **Windows (PowerShell):**
  ```powershell
  .\scripts\backup.ps1
  ```
- **Linux / Docker:**
  ```bash
  chmod +x ./scripts/backup.sh
  ./scripts/backup.sh
  ```

#### Database Restoration:
```bash
./scripts/restore.sh /path/to/backup_timestamp.sql.gz
```

---

### 4. Health Checks & Uptime Monitoring

Probe the native health endpoint configured in the Dockerfile:
- **URL**: `GET /api/health`
- **Response Format**:
  ```json
  {
    "status": "UP",
    "application": "India Unified School ERP Platform",
    "version": "1.0.0",
    "timestamp": "2026-11-11T14:40:00.000Z",
    "uptimeSeconds": 1420,
    "database": {
      "status": "healthy",
      "provider": "PostgreSQL / Prisma ORM"
    },
    "system": {
      "nodeVersion": "v20.x",
      "platform": "linux",
      "memoryUsageMB": { "rss": 84, "heapUsed": 46, "heapTotal": 62 }
    },
    "latencyMs": 4
  }
  ```
