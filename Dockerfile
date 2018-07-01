FROM flurdy/activator

COPY . /app

WORKDIR /app/src
RUN activator run
CMD activator run
