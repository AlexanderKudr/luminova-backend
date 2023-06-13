docker run -it -p 8080:8080 <account/image:tag> alexdevops111/unsplash:backend
docker pull <account/image:tag> alexdevops111/unsplash:backend
docker ps -a
docker rmi <id-image>
docker images
docker build -t <account/image:tag> kotatsu111/my-bot:discord_bot .
docker login -u ${{ secrets.DOCKER_LOGIN }} -p ${{ secrets.DOCKER_PASSWORD }}
docker push <account/image:tag> (Example: kotatsu111/my-bot:discord_bot)
docker rm <container-name> 