import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { routes, appModules } from './routes';

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    //   TypeOrmModule.forRoot(rdbmsParams(true, false, 'Common API')),
    //   RollbarLoggerModule.register(rollbarParams('Common API')),
    //   TypeOrmModule.forFeature([SuperUser, User]),
    //   AuditModule,
    //   JwtModule,
    //   ModelsModule,
    //   PermissionsModule,
    //   SessionsModule,
    //   TokenModule,
    //   UserPermissionsServiceModule,
    //   WSNotificationsModule,
    //   HttpModule,
    ...appModules,
    //   ...testOnlyModules,
  ],
  // providers: [LoggingInterceptor, AllExceptionsFilter, ValidationPipe, ResponseInterceptor, TokenGuard],
})
export class AppModule {}

/*
import { Module, ValidationPipe, HttpModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  TokenModule,
  PermissionsModule,
  JwtModule,
  SessionsModule,
  UserPermissionsServiceModule,
  AuditModule,
  LoggingInterceptor,
  ResponseInterceptor,
  AllExceptionsFilter,
  rdbmsParams,
  TokenGuard,
  AuditedModule,
  isRunningTest,
  rollbarParams,
  RollbarLoggerModule,
  SuperUser,
} from 'libs-be'
import { ModelsModule, User } from 'libs-be'
import { RouterModule } from 'nest-router'
import { SearchEngineCommandsModule } from './search-engine-commands/search-engine-commands.module'
import { routes, appModules } from './routes'
import { WSNotificationsModule } from './ws-notifications/ws-notifications.module'
import { TestPermissionsModule } from './test-permissions/test-permissions.module'

const testOnlyModules = []
if (isRunningTest()) {
  testOnlyModules.push(SearchEngineCommandsModule)
  testOnlyModules.push(TestPermissionsModule)
}

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    TypeOrmModule.forRoot(rdbmsParams(true, false, 'Common API')),
    RollbarLoggerModule.register(rollbarParams('Common API')),
    TypeOrmModule.forFeature([SuperUser, User]),
    AuditModule,
    JwtModule,
    ModelsModule,
    PermissionsModule,
    SessionsModule,
    TokenModule,
    UserPermissionsServiceModule,
    WSNotificationsModule,
    HttpModule,
    ...appModules,
    ...testOnlyModules,
  ],
  providers: [LoggingInterceptor, AllExceptionsFilter, ValidationPipe, ResponseInterceptor, TokenGuard],
  controllers: [],
})
export class AppModule extends AuditedModule {}
*/
