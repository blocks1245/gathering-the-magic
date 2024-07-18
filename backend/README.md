1. to run add the default card list of today from scryfall (this is in json format)
2. add this file to the docker folder

change in the dockerfile the following line:
``` Dockerfile
COPY ./default-cards-20240712210955.json ./data.json
```
to:
``` Dockerfile
COPY ./<your-file>.json ./data.json
```

3. If you dont need to update the whole database skip to step 4, otherwise if this is the first time running the backend run the following command:
``` bash
docker-compose up
```
If you are running this for the first time, it will take a while to download the images and build the containers and initialise the database.

If this is not the first time running the backend run the following command:
``` bash
docker-compose up --build
```

4. To run the backend run the following command:
``` bash
docker-compose up db
```