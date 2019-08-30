FROM python:3.6-alpine3.6

RUN apk update
RUN apk upgrade
RUN apk add bash

ENV PYTHONPATH=/app/missal1962
WORKDIR /app

COPY Pipfile* ./
RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile

RUN mkdir -pv \
             divinum-officium/web/www/missa/Portugues \
             divinum-officium/web/www/missa/Latin
COPY divinum-officium/web/www/missa/Portugues ./divinum-officium/web/www/missa/Portugues
COPY divinum-officium/web/www/missa/Latin ./divinum-officium/web/www/missa/Latin
COPY divinum-officium-custom ./divinum-officium-custom
COPY missal1962 ./missal1962

CMD [ "gunicorn", "--bind", "0.0.0.0:8000", "-w", "4", "wsgi"]