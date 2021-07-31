module.exports = {
  peticion: {
    url: "http://10.53.67.42:80/",
    metodo: "GET",
    recurso: "/productos",
    //origen: "http://16.74.34.67/",
    //destino: null,
    headers: {
      "Content-Type": "application/json",
      token: null,
    },
    data: {
      email: "daniel@example.site",
      password: "qwerty",
    },
  },

  respuesta: {
    code: null,
    error: null,
    source: null,
    body: null,
  },

  hacerPeticion: async function(token) {
    //Import proxy:
    const ProxyInverso = require("./ProxyInverso.js");

    //Agregamos el token en la peticion.
    this.peticion.headers.token = token;
    console.log("\n")
    console.log("-----------------------------------------------------------------------");
    console.log("\tObjeto: mediante el cual se hizo la peticion al proxy inverso.)")
    console.log("-----------------------------------------------------------------------");
    console.log("Objeto de tipo: peticion");
    console.log(this.peticion);

    console.log("-----------------------------------------------------------");
    console.log("\n")

    console.log("\n")
    console.log("-----------------------------------------------------------");
    console.log("\tHaciendo peticion numero: 1. (Mediante un cliente - HAPPY PATH)")
    console.log("-----------------------------------------------------------");
    //Interactuamos con el servidor a traves del proxy.
    let client = new ProxyInverso(this.peticion, this.respuesta);
    console.log(await client);
    console.log("\n\n\n\n");



		/*******************************************************************
		 *               Peticion alterando el token
		 *******************************************************************/
    console.log("\n")
    console.log("-----------------------------------------------------------");
    console.log("\tHaciendo peticion numero: 2. (Mediante un cliente)")
    console.log("-----------------------------------------------------------");
    //Alterarmos el token
    console.log("\nAlterando token...");
    this.peticion.headers.token += "d";

    let client2 = new ProxyInverso(this.peticion, this.respuesta);
    console.log(await client2);
    console.log("\n\n\n\n");

    /*******************************************************************
		 *               Peticion alterando la contrasena
		 *******************************************************************/
    console.log("-----------------------------------------------------------");
    console.log("\tHaciendo peticion numero: 3. (Mediante un cliente)")
    console.log("-----------------------------------------------------------");
    console.log("\nRestaurando el token original...\n");
    //Reestablecemos el token original
    this.peticion.headers.token = token;
    console.log("\nModificando las credenciales...");
    //Alteramos la contrasena
    this.peticion.data.password = "dd";
    console.log(this.peticion.data);
    console.log("\n");

    let client3 = new ProxyInverso(this.peticion, this.respuesta);
    console.log(await client3);

    console.log("\n\n\n\n");
  },
};
