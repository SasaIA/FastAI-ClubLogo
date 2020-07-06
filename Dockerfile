FROM python:3.7
WORKDIR /deployment
COPY . .
RUN pip install --upgrade -r requirements.txt
EXPOSE 8000
CMD ["python", "app.py"]

