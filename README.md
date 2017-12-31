**Generator Node Server**

Generates a boilerplate node server.

It has the following characteristics:

1. Option to have a .nvmrc file
2. Mongo DB
3. Nodemailer to send emails 
4. Utils file for doing basic things like getting a mongodb connection and logging
5. Mongo_install file with command to set up your mongodb users

**How to use**

```
git clone https://github.com/runia1/generator-node-server.git
npm -i
npm link

cd my_project_dir
yo node-server
```