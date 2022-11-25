import { expect } from 'chai';

import Parser from '../src/Parser';

describe(`main parser`, () => {
    it(`should have a proper constructor`, () => {
        expect(new Parser('1234567261011')).to.deep.include({
            raw: {
                birthdate: '234567',
                checksum: '1',
                cnp: '1234567261011',
                county: '26',
                serial: '101',
                sex: '1',
            }
        })
    });

    it(`should have getters`, () => {
        const instance = new Parser('2121212261011');

        expect(instance.sex).to.be.equal('female');
        expect(instance.birthdate).to.equalDate(new Date(1912, 11, 12));
        expect(instance.day).to.be.equal(12);
        expect(instance.month).to.be.equal(12);
        expect(instance.year).to.be.equal(1912);
        expect(instance.county).to.include({ code: '26', name: 'Mureș', ISO: 'MS' });
        expect(instance.serial).to.be.equal('101');
        expect(instance.checksum).to.be.equal('1');
        expect(instance.isValid).to.be.false;
    });

    it(`should have methods`, () => {
        const instance = new Parser('2121212261011');

        expect(instance.toString()).to.equal('2121212261011');
        expect(instance.toJSON()).to.deep.equal('{"birthdate":"1912-12-11T22:15:36.000Z","checksum":"1","county":{"code":"26","name":"Mureș","ISO":"MS"},"serial":"101","sex":"female"}');
    });
});
