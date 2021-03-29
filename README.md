# nati-papelera-backend
## Configuration
### Environment files
This project requires two .env files.

- Development mode .env file ( .env.dev )
- Test mode .env file ( .env.test )

### Compilation
It is strongly recommended that, to check project is following typescript rules defined on _.eslint.rc_, you run this command:
`npm run lint`
If you try to use any **any** type variable, linter will throw an error message.

### Start app
To start app, you must run:
`npm start`

If you want to develop with the app running, and let the app to take your changes ( which is a *bad practice*, because you should use tests instead), just run:
`npm run start:debug`

## Tests
To run test suite, you must run:
`npm test`

And, to generate **code coverage** on _coverage_ folder on your project directory, you must run:
`npm run test:cov`
To see coverage report, just execute index.html file on _coverage/lcov-report_ directory

To create a new test, all you have to do is:
- Register your new test on <nati-papelera-backend>/test/src/tests/index.ts file
- Decorate test class with **@TestSuite** decorator and test method with **@Test** decorator
Example:

```
@TestSuite('Categories Suite')
export class CategoriesTest extends AbstractTestSuite {
  @Test('Get All')
  public async getAll() {
    const { body: categories } = await this.httpGet('/categories/get-all').expect(HttpStatus.OK);
    expect(categories.length).toBeGreaterThan(0);
  }
}
```

## Swagger
Swagger is a nice tool to generate API's documentation. There are several decorators you need to add on every DTO and API. Examples:

- DTO
```
export class CategoryCreateDto {
  @ApiProperty()    // Swagger decorator
  name: string;

  @ApiProperty()    // Swagger decorator
  url: string;
}
```
- API
```
  @ApiResponse({ status: HttpStatus.CREATED })      // Swagger decorator
  create(@Body() dto: CategoryCreateDto): Promise<Category> {
    return this.categoryService.create(dto);
  }
```  

You can see Swagger documentation starting the app and executing in your browser: 
`http://localhost:3000/docs`

## Migrations
`knex` is the library on this project to run and create migration and seeds files. Of course, migrations and seeds must be executed on **dev** and **test** database.

- To run migrations: `npm run db:migrate` and `npm run db:migrate:test` 
- To run seeds: `npm run db:seed` and `npm run db:seed:test` 
- To rollback migrations: `npm run db:rollback` and `npm run db:rollback:test` 
- To create a migration: `npm run make:migration`

## Transactions
Every request that changes database state **MUST** be wrapped in a database transaction. In order to do that, you must use **@Transactional()** decorator. Example:
```
@Transactional()
create(@Body() dto: CategoryCreateDto): Promise<Category> {
    return this.categoryService.create(dto);
}
```

## Logger
Fine library called `winston` its been used to log app messages. `winston` supports several core transports. In order to configure your app log level, just control it via **LOG_LEVEL** var on .env files

To use logger in a class, just declare your logger:
```
export class CategoriesService {
  private readonly logger = new Logger(CategoriesService.name);
  ...
}
```

And log:
```
this.logger.log('Getting Categories');
```
**DONT BE SHY ADDING LOG MESSAGES**

## Authentication/Authorization
Passport library with its integration with nest.js its been used to authenticate/authorize http requests. This app is using username/password to login and JWT token to verify identify. And also redis to verify jwt token expiration. In the future, Facebook and Google login will be added
To manage session expiration, set `SESSION_TIMEOUT` parameter as 1800 in **dev** and 30 on **test** 

## TODO

- Pick Suite and Test to run
