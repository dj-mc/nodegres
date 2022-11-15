# nodegres (server)

Install postgres with docker compose (optional):

```bash
docker compose up -d
```

Or if postgres is already installed and running without docker compose:

```bash
# docker compose down
# docker rm -fv $(docker ps -aq)

netstat | grep 5432
sudo lsof -i -P -n | grep 5432

systemctl stop postgresql
sudo systemctl disable postgresql
systemctl status postgresql

docker compose up -d
```

Execute `db.sql`:

```bash
psql -d "dbname='todo_list_db' user='postgres' password='postgres' host='localhost'" -f db.sql
```

Access with:

```bash
psql -h localhost -p 5432 -U postgres -d todo_list_db
```

Start the server:

```bash
npm run dev
```

Make a request:

```bash
pipx install httpie
# Or use curl/postman/etc.

http POST localhost:5000/todo_list \
  description="Go back to sleep" important=TRUE

http GET localhost:5000/1
http GET localhost:5000/all
http GET localhost:5000/descriptions

http PUT http://localhost:5000/todo_item/1 \
  description="Workout at gym for 45 min" \
  tags:='["gym", "health"]'

http DELETE localhost:5000/todo_item/1
```

---

## problems

### "peer authentication failed"

You may get this error if using a custom role.  
You should not get this error while using postgres with docker compose.

```bash
psql -U postgres
# psql: error: connection to server on socket "/var/run/postgresql/.s.PGSQL.5432"
# failed: FATAL:  Peer authentication failed for user "postgres"
```

Fix:

Easy way without using `trust`:

```bash
sudo -i -u postgres psql
```

```sql
CREATE ROLE dan LOGIN password '<password>';
CREATE DATABASE `<database>` ENCODING 'UTF8' OWNER dan;
\du
```

The hard, but customizable, way:

Check system-username: `whoami`

```bash
sudoedit /etc/postgresql/14/main/pg_ident.conf
```

`MAPNAME`: dan (role)  
`SYSTEM-USERNAME`: dan (whoami)  
`PG-USERNAME`: postgres

Map role `dan` to `postgres`:

```conf
# MAPNAME       SYSTEM-USERNAME         PG-USERNAME
dan             dan                     postgres
```

Then:

```bash
sudoedit /etc/postgresql/14/main/pg_hba.conf
```

```conf
# Database administrative login by Unix domain socket
# trust here means no pw is needed to `psql -U postgres`
local all postgres <empty> trust

# Cannot connect to local database unless I change IP
# connection methods from scram-sha-256 to trust?

# IPv4 local connections
host all all 127.0.0.1/32 trust
# IPv6 local connections
host all all ::1/128      trust
```
