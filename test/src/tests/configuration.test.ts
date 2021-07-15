import { HttpStatus } from '@nestjs/common';
import * as expect from 'expect';
import { Test, TestSuite } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';
import { v4 as uuidv4 } from 'uuid';
@TestSuite('Configuration Test')
export class ConfigurationTest extends AbstractTestSuite {
  @Test('Configuration get')
  public async testConfigurationGet() {
    const { body: configuration } = await this.httpAdminGet('/configuration/get').expect(HttpStatus.OK);
    expect(configuration.configuration.id.length).toBeGreaterThan(0);
  }

  @Test('Configuration update')
  public async testConfigurationUpdate() {
    const { body: dtoGet } = await this.httpAdminGet('/configuration/get').expect(HttpStatus.OK);
    expect(dtoGet.configuration.id.length).toBeGreaterThan(0);

    const dtoToUpdate = {
      id: dtoGet.configuration.id,
      mlCommissionPercentage: Math.random() * (200 - 1) + 1,
      mlGainPercentage: Math.random() * (200 - 1) + 1,
    };
    await this.httpAdminPut('/configuration/update').send(dtoToUpdate).expect(HttpStatus.OK);
  }

  @Test('Configuration invalid id')
  public async testConfigurationInvalidId() {
    const dtoToUpdate = {
      id: uuidv4(),
      mlCommissionPercentage: Math.random() * (200 - 1) + 1,
      mlGainPercentage: Math.random() * (200 - 1) + 1,
    };
    await this.httpAdminPut('/configuration/update').send(dtoToUpdate).expect(HttpStatus.NOT_FOUND);
  }

  @Test('Configuration invalid commission percentage')
  public async testInvalidCommissionPercentage() {
    const dto = { id: uuidv4(), mlCommissionPercentage: 300, mlGainPercentage: 100 };
    const { body: messages } = await this.httpAdminPut('/configuration/update')
      .send(dto)
      .expect(HttpStatus.BAD_REQUEST);
    expect(messages.length).toBe(1);
    expect(messages[0]).toBe('mlCommissionPercentage must not be greater than 200');
  }

  @Test('Configuration invalid gain percentage')
  public async testInvalidGainPercentage() {
    const dto = { id: uuidv4(), mlCommissionPercentage: 100, mlGainPercentage: 300 };
    const { body: messages } = await this.httpAdminPut('/configuration/update')
      .send(dto)
      .expect(HttpStatus.BAD_REQUEST);
    expect(messages.length).toBe(1);
    expect(messages[0]).toBe('mlGainPercentage must not be greater than 200');
  }
}