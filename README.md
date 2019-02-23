# buddies
simple web app to add friends

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Be sure to have node setup on your computer before running this


### Installing

Clone the repository to your computer

```
git clone git@github.com:nia-mugo/buddies.git
```

rename `.env_example` to `.env`

```
mv .env_example .env
```

update all parameters in `.env` to actual db connection details

run the migration scripts for the specific environments

```
npm run migrate-development
npm run migrate-staging
npm run migrate-prod
```

once migrations have ran, run the app

```
rpm run dev
```


## Running the tests

```
npm run test
```

## Built With

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
