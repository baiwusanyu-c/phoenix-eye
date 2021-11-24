/*
* @testReg.spec.js
* @deprecated 
* @author czh
* @update (czh 2021/11/24)
*/

const reg1 = /^(?![;；])[\u4e00-\u9fa5a-zA-Z0-9；;]+$/

describe('test-reg', () => {
    test('test-ABC;asd；强无敌无群多', () => {
        expect(reg1.test('ABC;asd；强无敌无群多')).toBeTruthy()
    })
    test('test-ABC;asd;强无敌无群多', () => {
        expect(reg1.test('ABC;asd;强无敌无群多')).toBeTruthy()
    })
    test('test-ABC;', () => {
        expect(reg1.test('ABC;')).toBeTruthy()
    })
    test('test-!@', () => {
        expect(!reg1.test('ABC;asd!@强无敌无群多')).toBeTruthy()
    })
    test('test-；', () => {
        expect(!reg1.test('；ABC')).toBeTruthy()
    })
    test('test-;', () => {
        expect(!reg1.test(';成爲去')).toBeTruthy()
    })
    test('test-;；', () => {
        expect(!reg1.test(';；成爲去')).toBeTruthy()
    })
    test('test-；;', () => {
        expect(!reg1.test('；;成爲去')).toBeTruthy()
    })
    test('test-；；', () => {
        expect(!reg1.test('；；成爲去')).toBeTruthy()
    })
    test('test-;：', () => {
        expect(!reg1.test(';：成爲去')).toBeTruthy()
    })
    test('test-：;', () => {
        expect(!reg1.test('：;成爲去')).toBeTruthy()
    })
    test('test-；：', () => {
        expect(!reg1.test('；：成爲去')).toBeTruthy()
    })
    test('test-：；', () => {
        expect(!reg1.test('：；成爲去')).toBeTruthy()
    })
    test('test-：：', () => {
        expect(!reg1.test('：：成爲去')).toBeTruthy()
    })
    test('test-:;', () => {
        expect(!reg1.test(':;成爲去')).toBeTruthy()
    })
    test('test-;:', () => {
        expect(!reg1.test(';:成爲去')).toBeTruthy()
    })
    test('test-::', () => {
        expect(!reg1.test('::成爲去')).toBeTruthy()
    })
    test('test-；:', () => {
        expect(!reg1.test('；:成爲去')).toBeTruthy()
    })
    test('test-:；', () => {
        expect(!reg1.test(':；成爲去')).toBeTruthy()
    })
})