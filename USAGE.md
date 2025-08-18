
- every user has a default 100,000 balcne in theor wallet, that they can use th=i make trancations
- send funds to beneficiary by email
- auto reverse fund s is built in in create Donation endpoint, so if any of the process fials or something goes wrong, fnds are automtivally reveresed
pagination is included,
to use this prohject simole follow these steps
git  clone
yarn install
cp env.example env
go to any postgres database provvider and creatd a database publicily accessible, you should have a result like "postgresqk://...", set that valie as uout
DATABASE_URL, also fill in all the necessary things in thre .env/.env.exmaple file like node_env, jwt_secret, etc

then run yarn dev.
check the console for logs and sintructions in where to access the docs and the now deployed sercie, you shuld see these logs

```bash
[nodemon] starting `ts-node -r tsconfig-paths/register src/server.ts`
Application started with config Loaded up✅
Server running on port [PORT]
API documentation available at 📝📚 http://localhost:[port]/api-docs
```

that measn everuthing is working, you are good to go, to the docusmtation endpoint and test it out

howeverm yo test a dpeloyed verison of this serive out, visit -> but this mght break from septoemner ot mught be slow, this is becuae both the database probvider and hosting serie are free plans, and might shi=ut down anytme from now
- the database linked to this project will expire on September 13, 2025. 
