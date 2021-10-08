# Recruitment Task

Recruitment task form SMARTBEES

## General

Task of creating a website view - online store module. The stage of placing order from existing cart. Made frontend site and backend server.

[DEMO](https://smartbees-task.netlify.app/)

![App Screenshot](https://i.ibb.co/x5ZBWPg/Bez-tytu-u.png)

## Technologies

**Frontend:** JavaScript (ECMAScript 6), React.js (with hooks), HTML 5 (newest and semantic tags), CSS3 (preprocessor Sass, .scss files). Used Create-React-App.

**Backend:** Node.js (with framework Express.js) and mongoDB (nosql db).

## Installation

You need installed **Node.js** - to download from [node.js](https://nodejs.dev/download/)

It's available on external hosting ([demo](https://smartbees-task.netlify.app/)).

If you want to test on local, you follow these instructions.

```bash
  git clone https://github.com/kwojtas172/smartbees-task.git
  cd /smartbees-task
  npm install
  npm run build
  npm start
```

## Info

### Form - data user

Fields of name / surname / city / address must be start a big letter (rest a small letter), email must be format xxx@xxx.xx ('@', '.' and letters/numbers), phone number must be format only digital and nine characters, postal code must be format xx-xxx (only digital).

### Form - methods

Must be checked one radio inputs of each group names (one of delivery name and one of payment name) - but required conditions: for delivery method inpost / courier is available only bank transfer (traditional or online), for courier cash on delivery is available only cash on delivery.

To validate used Regular Expression (RegExp).

To sending data of forms used fetch.

Login: johndoe99, password: 123


## Features

- Login optional,
- Automatic calculating of discount (if code added),
- Payments methods depends on delivery method.

## API

Created by Node.js (Express.js) is available on extend hosting ([demo](https://smartbees-api.herokuapp.com/)).

For test on local:
```bash
  git clone https://github.com/kwojtas172/smartbees-task-api
  cd /smartbees-task-api
  npm install
  npm run build
  npm start
```
#### Get item

```http
  GET /:id
```
Available id: 1-5 (if put only path '/', server redirect to path: '/1').

## Support

For support, email kwojtas172@gmail.com or message me on [Linkedin](https://www.linkedin.com/in/kamil-wojtas/).
## License

[MIT](https://choosealicense.com/licenses/mit/)