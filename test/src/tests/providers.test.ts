import { HttpStatus } from '@nestjs/common';
import * as expect from 'expect';
import * as faker from 'faker';
import { v4 as uuidv4 } from 'uuid';
import { ProviderDto } from '../../../src/modules/providers/dto/providers-get-all-response.dto';
import { ManapelParser } from '../../../src/modules/providers/parsers/manapel/manapel-parser';
import { Test, TestSuite } from '../../helpers/decorators';
import { AbstractTestSuite } from '../abstract-test-suite';

@TestSuite('Providers Suite')
export class ProvidersTest extends AbstractTestSuite {
  @Test('Upload and process Manapel file')
  public async uploadManapelFile() {
    const {
      body: { insertedRecords, updatedRecords },
    } = await this.httpAdminPost('/providers/upload-new-file')
      .query({ url: 'manapel' })
      .attach('file', './test/src/tests/resources/minimanapel.xlsx')
      .expect(HttpStatus.CREATED);

    expect(insertedRecords).toBeDefined();
    expect(updatedRecords).toBeDefined();
  }

  @Test('Manapel Parser')
  public async parser() {
    const parser = new ManapelParser();

    const res1 = parser.parseProduct('Cristal Mesa 10X20/20');
    this.parserExpect(res1, 'Cristal Mesa', '10X20/20');

    const res2 = parser.parseProduct('Cristal 45x70/100 P/escombros');
    this.parserExpect(res2, 'Cristal', '45x70/100 P/escombros');

    const res3 = parser.parseProduct('Bolsa 45x70/100 Escombros Negra');
    this.parserExpect(res3, 'Bolsa', '45x70/100 Escombros Negra');

    const res4 = parser.parseProduct('Cristal 4.5x30 Para Juguito');
    this.parserExpect(res4, 'Cristal', '4.5x30 Para Juguito');

    const res5 = parser.parseProduct('Residuo 45x60 (x10) Bio Bag');
    this.parserExpect(res5, 'Residuo', '45x60 (x10) Bio Bag');

    const res6 = parser.parseProduct('Consorcio 60x90 Eco.(sobre X 10)');
    this.parserExpect(res6, 'Consorcio', '60x90 Eco.(sobre X 10)');

    const res7 = parser.parseProduct('Consorcio 60 X 90 Economico');
    this.parserExpect(res7, 'Consorcio', '60 X 90 Economico');

    const res8 = parser.parseProduct('Arranque A/d X 500 Bolsas 15x20');
    this.parserExpect(res8, 'Arranque A/d', 'X 500 Bolsas 15x20');

    const res9 = parser.parseProduct('Residuo Ad Rollo 45x60 (x 30)');
    this.parserExpect(res9, 'Residuo Ad Rollo', '45x60 (x 30)');

    const res10 = parser.parseProduct('Bolsa Kraft C/cordon N*0 (10X15)');
    this.parserExpect(res10, 'Bolsa Kraft C/cordon', 'N*0 (10X15)');

    const res11 = parser.parseProduct('Rollo Maquina 57 X 30 (paq. X 10)');
    this.parserExpect(res11, 'Rollo Maquina', '57 X 30 (paq. X 10)');

    const res12 = parser.parseProduct('Caja Cupcakes X 6 Blanco (26X17X9)');
    this.parserExpect(res12, 'Caja Cupcakes', 'X 6 Blanco (26X17X9)');

    const res13 = parser.parseProduct('Tortera 41a ( Rectang. 38x28 )');
    this.parserExpect(res13, 'Tortera', '41a ( Rectang. 38x28 )');

    const res14 = parser.parseProduct('Cartelitos N*0 (3X3 Cm) X 20 Unid.');
    this.parserExpect(res14, 'Cartelitos', 'N*0 (3X3 Cm) X 20 Unid.');

    const res15 = parser.parseProduct('Individuales 25x40 ( X 200 )');
    this.parserExpect(res15, 'Individuales', '25x40 ( X 200 )');

    const res16 = parser.parseProduct('Aluminio R 8 ( = Ab 60)');
    this.parserExpect(res16, 'Aluminio R', '8 ( = Ab 60)');

    const res17 = parser.parseProduct('Caja 2 Medio Huevo 15 Cm. (26X17X9)');
    this.parserExpect(res17, 'Caja', '2 Medio Huevo 15 Cm. (26X17X9)');

    const res18 = parser.parseProduct('Bolsa Disney (paquete X 10)');
    this.parserExpect(res18, 'Bolsa Disney', '(paquete X 10)');

    const res19 = parser.parseProduct('Residuo 45x60/20 (sobre X 30)');
    this.parserExpect(res19, 'Residuo', '45x60/20 (sobre X 30)');

    const res20 = parser.parseProduct('Rollo Maq.75x30 Termico (paq:x10)');
    this.parserExpect(res20, 'Rollo Maq.75x30 Termico', '(paq:x10)');

    const res21 = parser.parseProduct('Moño Magico Metal. Chico X 100');
    this.parserExpect(res21, 'Moño Magico Metal. Chico', 'X 100');
  }

  parserExpect(result: Array<string>, product: string, packaging: string) {
    expect(result.length).toBe(2);
    expect(result[0]).toBe(product);
    expect(result[1]).toBe(packaging);
  }

  @Test('Provider get-all')
  public async testProviderGetAll() {
    const { body } = await this.httpAdminGet('/providers/get-all').expect(HttpStatus.OK);
    expect(body.providers.length).toBeGreaterThan(0);
  }

  @Test('Provider update')
  public async testProviderUpdate() {
    const { body: dtoProvider } = await this.httpAdminGet('/providers/get-all').expect(HttpStatus.OK);
    expect(dtoProvider.providers.length).toBeGreaterThan(0);

    const providerToUpdate: ProviderDto = dtoProvider.providers[Object.keys(dtoProvider.providers)[0]];

    const dto = { id: providerToUpdate.id, name: providerToUpdate.name, url: providerToUpdate.url, percentage: 20 };
    await this.httpAdminPut('/providers/provider-update/').send(dto).expect(HttpStatus.OK);
  }

  @Test('Provider id')
  public async testProviderIncorrectId() {
    const myRandomId = uuidv4();
    const dtoToUpdate = {
      id: myRandomId,
      name: faker.company.companyName(),
      url: faker.internet.url(),
      percentage: 30,
    };

    await this.httpAdminPut('/providers/provider-update/').send(dtoToUpdate).expect(HttpStatus.NOT_FOUND);
  }

  @Test('Provider Percentage')
  public async ProviderRangePercentage() {
    const dto = { id: uuidv4(), name: faker.company.companyName(), url: faker.internet.url(), percentage: 300 };
    expect(HttpStatus.BAD_REQUEST);
  }
}
