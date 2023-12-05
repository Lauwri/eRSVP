# Dev

docker-compose up
docker-compose down
docker-compose up --build

# Production

Copy `docker-compose.yml` to `docker-compose.prod.yml` file for running in production and set production env there

docker-compose -f docker-compose.prod.yml up
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --build

## logs

docker-compose -f docker-compose.yml logs -f
docker ps
docker logs -f <id>

### backup

docker exec containerId pg_dump -U db_username db_name > backup

### restore

docker exec -i containerId psql -U db_username -d db_name < backup

## TODOS

- telegram bot user states are monolith, separate em
- api routes are monolith
- rsvp-admin build and serve
- scripts and static could be shared volume? Its a hack now to copy em
- tests ???
