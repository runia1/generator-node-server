const Generator = require('yeoman-generator');

module.exports = class NodeServer extends Generator {
    constructor(args, opts) {
        super(args, opts);
        
        this.answers = {};
    }

    prompting() {
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname // Default to current folder name
            },
            {
                type: 'input',
                name: 'desc',
                message: 'Description of project',
                default: this.appname // Default to current folder name
            },
            {
                type: 'input',
                name: 'mongo_pwd',
                message: 'What will your mongo password be?',
                default: this.appname // Default to current folder name
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',
                default: ''
            },
            {
                type: 'input',
                name: 'email_pwd',
                message: 'What is your email password?',
                default: ''
            },
            {
                type: 'confirm',
                name: 'nvmrc',
                message: 'Would you like to add a .nvmrc file?'
            }
        ]).then((answers) => {
            this.log(`project name: ${answers.name}`);
            
            this.answers = answers;
        });
    }
    
    configuring() {
        
    }

    writing() {

        // add .nvmrc
        if (this.answers.nvmrc) {
            this.fs.copyTpl(
                this.templatePath('.nvmrc'),
                this.destinationPath('.nvmrc'),
                { 
                    node_version: process.version
                }
            );
        }
        
        // add .gitignore
        this.fs.copyTpl(
            this.templatePath('.gitignore'),
            this.destinationPath('.gitignore'),
            {}
        );
        
        // add package.json
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { 
                name: this.answers.name,
                desc: this.answers.desc
            }
        );
        
        // add keys/mongo.json
        this.fs.copyTpl(
            this.templatePath('keys/mongo.json'),
            this.destinationPath('keys/mongo.json'),
            {
                name: this.answers.name,
                mongo_pwd: this.answers.mongo_pwd
            }
        );

        // add keys/gmail.json
        this.fs.copyTpl(
            this.templatePath('keys/gmail.json'),
            this.destinationPath('keys/gmail.json'),
            {
                email: this.answers.email,
                email_pwd: this.answers.email_pwd
            }
        );
        
        // add src/utils
        this.fs.copyTpl(
            this.templatePath('src/utils.js'),
            this.destinationPath('src/utils.js'),
            {}
        );
        
        // add mongo_install
        this.fs.copyTpl(
            this.templatePath('mongo_install.txt'),
            this.destinationPath('mongo_install.txt'),
            this.answers
        );
    }
    
    install() {
        this.npmInstall();
    }

    end() {
        
    }
};