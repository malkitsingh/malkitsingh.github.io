# Understanding Docker Restart Policies

Docker containers are ephemeral by nature—they can be started, stopped, created, and destroyed at any time. However, many production applications require containers to stay running with minimal downtime. This is where Docker's **restart policies** come into play.

## What Are Restart Policies?

Restart policies determine how Docker should handle container restarts when containers exit or when Docker itself restarts. These policies give you control over the reliability and availability of your containerized applications.

## Available Restart Policies

Docker provides four restart policy options:

| Policy | Flag | Description |
|--------|------|-------------|
| No restart | `--restart=no` | Never automatically restart the container (default) |
| Always restart | `--restart=always` | Always restart the container regardless of exit status |
| On-failure restart | `--restart=on-failure[:max-retries]` | Restart only if the container exits with a non-zero exit code |
| Unless-stopped | `--restart=unless-stopped` | Similar to `always`, but won't restart if the container was explicitly stopped |

Let's explore each of these policies in detail.

## Detailed Explanations and Use Cases

### 1. No Restart (`--restart=no`)

This is the default restart policy. When set to `no`, Docker will never automatically restart the container when it exits or when Docker restarts.

**Example:**
```bash
docker run --restart=no nginx
```

**Use Cases:**
- Short-lived containers that perform a specific task and then exit
- Debugging or testing containers that should exit cleanly
- Batch processing jobs where retries should be handled at a higher level
- CI/CD pipelines where failed jobs should stay failed

**Real-World Example:**
A data migration script that should run once and report success or failure:
```bash
docker run --name=migration-job --restart=no my-data-migration-image
```

### 2. Always Restart (`--restart=always`)

With this policy, Docker will always restart the container regardless of the exit status code. If the container is manually stopped, it will be restarted when the Docker daemon restarts.

**Example:**
```bash
docker run --restart=always postgres
```

**Use Cases:**
- Critical infrastructure services that must always be running
- Database containers that should survive Docker daemon restarts
- Web servers and API services that need maximum uptime
- Monitoring services that must always be available

**Real-World Example:**
Running a production web application that should always be available:
```bash
docker run -d --name=web-app --restart=always -p 80:80 my-web-app
```

This container will restart:
- If the application crashes
- If the host system reboots
- If Docker daemon restarts
- Even if the container exited with a success code (0)

### 3. On-Failure Restart (`--restart=on-failure[:max-retries]`)

This policy will restart the container only if it exits with a non-zero status code, indicating failure. You can optionally specify a maximum number of retry attempts.

**Example:**
```bash
docker run --restart=on-failure:5 my-app
```

**Use Cases:**
- Containers that should only restart if they actually fail
- Applications where repeated failures indicate a problem that should not be masked
- Services that need resilience but shouldn't restart if they exit cleanly
- Background tasks that should retry on failure but give up after a certain number of attempts

**Real-World Example:**
A health check service that should retry up to 3 times if it fails:
```bash
docker run --name=health-monitor --restart=on-failure:3 health-check-service
```

Exit codes matter here:
- If the container exits with code 0 (success), it won't restart
- If it exits with code 1 or any other non-zero code, it will restart up to 3 times

### 4. Unless-Stopped (`--restart=unless-stopped`)

This policy is similar to `always`, but with one key difference: if the container was manually stopped, it won't be restarted when the Docker daemon restarts.

**Example:**
```bash
docker run --restart=unless-stopped redis
```

**Use Cases:**
- Services where manual intervention should be respected across daemon restarts
- Containers that should normally always restart, but occasionally need maintenance windows
- Development environments where containers should persist but respect manual stops
- Applications where operators need the ability to stop services when needed

**Real-World Example:**
A production cache service that should generally be always available, but respect manual stops for maintenance:
```bash
docker run -d --name=redis-cache --restart=unless-stopped -p 6379:6379 redis
```

When using this policy:
- If the container crashes, it will restart
- If the host reboots, it will restart
- If you manually run `docker stop redis-cache` and then the Docker daemon restarts, it will **not** restart

## Setting Restart Policies

### At Container Creation

```bash
docker run --restart=POLICY_NAME your-image
```

### For Existing Containers

```bash
docker update --restart=POLICY_NAME container-name-or-id
```

### In Docker Compose

```yaml
version: '3'
services:
  webapp:
    image: nginx
    restart: always
  
  database:
    image: postgres
    restart: unless-stopped
  
  batch-job:
    image: data-processor
    restart: no
```

## Practical Comparison: When Each Policy Restarts

| Event | no | always | on-failure | unless-stopped |
|-------|----|---------|--------------|--------------------|
| Container exits with code 0 | ❌ | ✅ | ❌ | ✅ |
| Container exits with non-zero code | ❌ | ✅ | ✅ | ✅ |
| Docker daemon restarts | ❌ | ✅ | ✅ (if failed) | ✅ (if not manually stopped) |
| After manual `docker stop` | ❌ | ✅ | ❌ | ❌ |

## Best Practices

1. **Match Policy to Service Type**:
   - Use `always` or `unless-stopped` for long-running services (web servers, databases)
   - Use `on-failure` for critical scripts that should retry but not loop infinitely
   - Use `no` for one-time tasks or jobs

2. **Consider Resource Implications**:
   - Be careful with `always` as it may mask underlying issues by continuously restarting failing containers
   - For `on-failure`, set reasonable max retry limits to prevent resource exhaustion

3. **Use Health Checks with Restart Policies**:
   ```yaml
   version: '3'
   services:
     webapp:
       image: my-web-app
       restart: unless-stopped
       healthcheck:
         test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
         interval: 30s
         timeout: 10s
         retries: 3
         start_period: 40s
   ```

4. **Log and Monitor Restarts**:
   - Set up monitoring to alert on containers that restart frequently
   - Investigate containers that restart repeatedly as this may indicate underlying issues

## Real-World Scenarios

### Critical Production Services

```yaml
version: '3'
services:
  api:
    image: my-api-service
    restart: always
    ports:
      - "8080:8080"
  
  database:
    image: postgres
    restart: always
    volumes:
      - db-data:/var/lib/postgresql/data
```

### Maintenance-Aware Services

```yaml
version: '3'
services:
  cache:
    image: redis
    restart: unless-stopped
    ports:
      - "6379:6379"
  
  message-queue:
    image: rabbitmq
    restart: unless-stopped
    ports:
      - "5672:5672"
```

### Batch Processing

```yaml
version: '3'
services:
  daily-report:
    image: report-generator
    restart: on-failure:3
    volumes:
      - ./reports:/reports
```

## Conclusion

Docker's restart policies provide flexible options for maintaining container availability according to your application's specific needs. By understanding the differences between each policy and their appropriate use cases, you can design more resilient containerized applications that handle failures gracefully.

Remember that while restart policies are powerful, they should be used thoughtfully as part of a broader container orchestration and monitoring strategy. In more complex environments, consider using orchestration tools like Docker Swarm or Kubernetes, which offer additional features for service resilience and high availability.