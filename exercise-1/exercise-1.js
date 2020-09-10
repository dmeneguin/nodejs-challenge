function validateCnpjFormat(cnpj) {
    const format1 = /^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}$/;
    const format2 = /^[0-9]{14}$/;
    return (format1.test(cnpj) || format2.test(cnpj));
}

console.log(validateCnpjFormat("00.000.000/0000-00"));
console.log(validateCnpjFormat("99.999.999/9999-99"));
console.log(validateCnpjFormat("999.999.999/9999-99"));
console.log(validateCnpjFormat("aa.aaa.aaa/aaaa-aa"));

console.log(validateCnpjFormat("00000000000000"));
console.log(validateCnpjFormat("000000000000000"));