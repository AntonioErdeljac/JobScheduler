# JobScheduler

Simple Agenda Job Scheduler app with Slack integration created using React.js, Node.js & Agenda.js

### Prerequisites

Make sure you have these installed on your machine

* [Node.js](https://nodejs.org/en/download/)
* [MongoDB](https://www.mongodb.com)
* **npm** This comes with Node.js, but make sure you check if you have it anyway

### Installing packages

Install backend packages

```
cd backend/
sudo npm install --save
```

Install frontend packages

```
cd frontend/
sudo npm install --save
```

### Running the app

To run the app (dev. mode)

```
cd backend
sudo SLACK_BOT_TOKEN=your_bot_token_here node app.js

cd frontend
sudo npm start
```

### Slack commands
**Make sure you have created a Slack Bot first & have added it to #general in your room**

#### Available commands:

Delete job

```
jobby izbriši job_slug
```

#### Other Slack functions:

Automatic message on **new job**

```
*Novi posao:* Posao #1, *Vrjieme*: in 30 seconds, *Autor*: erda *Slug*: Posao-1-a5xgq7
```

Automatic message on job **completion**:

```
*Posao dovršen:* Posao #1, *Vrjieme*: Sat Nov 04 2017 16:29:41 GMT+0100 (CET), *Autor*: erda *Slug*: Posao-1-a5xgq7
```

Automatic message on job **deletion**:
```
*Posao izbrisan:* Posao #1, *Vrjieme*: 4:37:37 PM, *Izbrisao*: erda *Slug*: Posao-1-a5xgq7
```



## Built With

* [Node.js](https://nodejs.org) - The backend framework used
* [Express.js](https://github.com/expressjs/express) - Node.js framework used
* [React.js](https://github.com/facebook/react) - The frontend framework used
* [node-slack-sdk](https://github.com/slackapi/node-slack-sdk) - Used to integrate Node.js with Slack
* [Agenda.js](https://github.com/rschmukler/agenda) - Used to create Jobs & Scheduling
* [MongoDB](https://www.mongodb.com/) - Database platform used


## Authors

* **Antonio Erdeljac** - *Initial work* - [JobScheduler](https://github.com/AntonioErdeljac/JobScheduler)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This was an assigment for a part time job offer

