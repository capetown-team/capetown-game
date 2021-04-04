psql --variable=ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE ROLE admin WITH LOGIN PASSWORD admin;
    CREATE DATABASE "pacman" OWNER = admin;
    GRANT ALL PRIVILEGES ON DATABASE "pacman" TO admin;
EOSQL
