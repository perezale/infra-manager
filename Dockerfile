FROM node:12

COPY . .

ARG AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY

RUN mkdir ~/.aws/
RUN echo '[default]' > ~/.aws/credentials
RUN echo  "aws_access_key_id = ${AWS_ACCESS_KEY_ID}" >> ~/.aws/credentials
RUN echo  "aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}" >> ~/.aws/credentials
RUN npm install && npm run build

ENTRYPOINT ["npm", "run", "start:prod" ]

