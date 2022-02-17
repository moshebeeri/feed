
# Getting started

go to <https://hub.docker.com/_/neo4j/>

```bash
docker run \
    --publish=7474:7474 --publish=7687:7687 \
    --volume=$HOME/neo4j/data:/data \
    neo4j
```

## Change password

Set the password to neo or change at the code in app.module.ts
As the scope of this code base is not supporting 12 factor

## run

```bash
npm run start:dev
```
