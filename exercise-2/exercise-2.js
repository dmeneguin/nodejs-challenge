function calculateVerificationDigitOfASector(validationSector,verificationCoefficients){
    let counter = 0;
    let sumResult = 0;
    validationSector.map((element) => sumResult+=verificationCoefficients[counter++]*Number(element));
    const resultMod = sumResult%11;
    calculatedVerificationDigit = resultMod<2 ? 0 : 11-resultMod;
    return calculatedVerificationDigit;
}

function validateCnpjNumber(cnpj) {
    const onlyNumbersCnpj = cnpj.replace(/[\.\/\-]/g,'').split('');
    const firstValidationSector = onlyNumbersCnpj.slice(0,12);
    const secondValidationSector = onlyNumbersCnpj.slice(0,13);
    const firstVerificationDigit = Number(onlyNumbersCnpj[12]);
    const secondVerificationDigit = Number(onlyNumbersCnpj[13]);
    const verificationCoefficientsFirstSector = [5,4,3,2,9,8,7,6,5,4,3,2];
    const verificationCoefficientsSecondSector = [6,5,4,3,2,9,8,7,6,5,4,3,2];
    const calculatedFirstVerificationDigit = calculateVerificationDigitOfASector(firstValidationSector,verificationCoefficientsFirstSector);
    const calculatedSecondVerificationDigit = calculateVerificationDigitOfASector(secondValidationSector,verificationCoefficientsSecondSector);
    return (calculatedFirstVerificationDigit===firstVerificationDigit && calculatedSecondVerificationDigit===secondVerificationDigit);
}

function validateCnpj(cnpj) {
    const format1 = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/;
    const format2 = /^[0-9]{14}$/;
    let isValid= false;
    if (format1.test(cnpj) || format2.test(cnpj)){
        isValid=validateCnpjNumber(cnpj);
    }
    return isValid;
}

console.log(validateCnpj("11.444.777/0001-61"));
console.log(validateCnpj("99.999.999/9999-99"));
console.log(validateCnpj("000000000000000"));