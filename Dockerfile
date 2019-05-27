FROM python:3.7

RUN pip install aiohttp motor

COPY ./app.py .

EXPOSE 19191

CMD python app.py

