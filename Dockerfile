FROM node:16
ENV PORT=5000
ENV TOKEN_SECRET=secret
ENV DB_URL=mongodb+srv://HoardQ:HoardQ@sih.hrrxr.mongodb.net/SIH?authSource=admin&replicaSet=atlas-c8ijva-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
COPY . /app
WORKDIR /app
EXPOSE 5000
CMD ["node", "index.js"]
