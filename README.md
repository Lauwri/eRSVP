# eRSVP

A microservice for running online RSVP system. Includes webhook for google forms, admin panel for managing attendees, telegrambot and admin management through telegram.

## Development

eRSVP utilizes npm workspaces. To install all dependencies, run `npm install` in root.
To install dependencies for individual workspace, run `npm install --workspace=id`. Options for workspaces are `rsvp-api`, `rsvp-db` and `rsvp-tg`.  
Fill `.env` with development environment values.  
API server and telegram bot can be started from root or package level with scripts found in `package.json`

## Production

Fill `.env` with production environment values.  
Build production environment with  
 `docker-compose up --build`

Production environment can be controlled with docker-compose  
 `docker-compose down`  
 `docker-compose up`

## logs

Tailing for all logs:  
 `docker-compose logs -f`

Individual containers can be tailed with

```
docker ps
# Get container id from ps
docker logs -f <id>
```

### Backup and Restore

Backups can be taken from db instance with command:  
`docker exec containerId pg_dump -U db_username db_name > backup`

Backups can be restored to running db instance with command:  
`docker exec -i containerId psql -U db_username -d db_name < backup`

## TODOS

- telegram bot user states are monolith, separate em
- api routes are monolith
- static could be shared volume? Its a hack now to copy em
- tests ???
