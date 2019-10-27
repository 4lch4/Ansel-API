# Stop currently running container.
docker stop ansel

# Deleting existing container.
docker rm ansel

# Pull latest version of image.
docker pull 4lch4/ansel:latest

# Start up container.
docker run -d -p 4242:4242 --name=ansel 4lch4/ansel:latest