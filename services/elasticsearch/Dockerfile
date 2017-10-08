FROM docker.elastic.co/elasticsearch/elasticsearch:5.6.0

USER root
COPY docker-healthcheck /usr/local/bin/
RUN ["chmod", "+x", "/usr/local/bin/docker-healthcheck"]
USER elasticsearch

HEALTHCHECK CMD ["docker-healthcheck"]