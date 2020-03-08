docker build -t zeferinix/faker-graphql:latest .
docker push zeferinix/faker-graphql:latest
ssh root@66.42.56.111 "docker pull zeferinix/faker-graphql:latest && docker tag zeferinix/faker-graphql:latest dokku/faker-graphql.zeferinix.com:latest && dokku tags:deploy faker-graphql.zeferinix.com latest"
