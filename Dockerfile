FROM mhart/alpine-node:12
LABEL description="This is a demo image"
ENV PORT 8080
EXPOSE ${PORT}
WORKDIR /app

#COPY package.json .
#COPY index.js .
COPY . .

RUN npm ci --prod

CMD ["node", "index.js"]
