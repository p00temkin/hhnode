FROM node:16.17.0-alpine3.15
COPY . .
RUN yarn install --non-interactive
EXPOSE 8545
ENTRYPOINT ["npx", "hardhat"]
CMD ["node"]
