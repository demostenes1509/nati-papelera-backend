import { HttpStatus } from '@nestjs/common';
import * as expect from 'expect';
import { Test, TestSuite } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';

@TestSuite('Configuration Test')
export class ConfigurationTest extends AbstractTestSuite {
    @Test('Configuration get-all')
    public async ConfigurationTestGetAll() {
        const { body } = await this.httpAdminGet('/configuration/get-all').expect(HttpStatus.OK);
        expect(body.configuration.length).toBeGreaterThan(0);    
    }
}