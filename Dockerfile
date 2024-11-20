FROM node:18.20-bookworm
WORKDIR /
COPY . .
EXPOSE 8080
RUN npm install
CMD ["npm", "start"]
