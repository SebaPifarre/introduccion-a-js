function testValidateMembersAmount(){
    console.assert(validateMemberAmount(5) === undefined,
    "El test validar cantidad de miembros fallo con un valor valido")

    console.assert(validateMemberAmount(5.2) === "El numero de integrantes no puede ser un numero decimal",
    "El test validar cantidad de miembros fallo con un numero decimal")
    
    console.assert(validateMemberAmount(-4) === "Ingrese un numero positivo",
    "El test validar cantidad de miembros fallo con un valor negativo")
}
function testValidateMembersAges(){
    console.assert(validateMembersAges([1,2,3]) === undefined,
    "El test validar edades fallo con un array de edades validas")

    console.assert(validateMembersAges([]) === undefined,
    "El test validar edades de los miembros fallo con un array de edades vacio")

    console.assert(validateMembersAges([1.2,2,3.4]) === "Las edades no pueden ser numeros decimales ni negativos",
    "El test validar edades de los miembros no valido correctamente")

    console.assert(validateMembersAges([-1,2,-6]) === "Las edades no pueden ser numeros decimales ni negativos",
    "El test validar edades fallo con valores negativos")
}

testValidateMembersAmount();
testValidateMembersAges();