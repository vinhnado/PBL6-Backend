build:
	docker-compose build
exec-sudo:
	sudo docker-compose exec app bash
exec:
	docker-compose exec app bash
up:
	docker-compose up -d
up-sudo:
	sudo docker-compose up -d
down:
	docker-compose down
down-sudo:
	sudo docker-compose down
seeder:
	sudo docker-compose exec app sh -c "cd src && npx sequelize-cli db:seed:all"
refresh:
	down up
refresh-sudo:
	down-sudo up-sudo
log:
	docker-compose logs -f
log-sudo:
	sudo docker-compose logs -f
seeder2:
	sudo docker compose exec app sh -c "cd src && npx sequelize-cli db:seed:all"