/**
 * Porecsso principal
 * Estudo do banco de dados MongoDB (CRUD)
 * @author Davi do couto
 */

//Importação do módulo de conexão
const {conectar, desconectar} = require("./database.js")

//Importação do modelo de dados do cliente
const clienteModel = require("./src/models/Clientes.js")

//Função para cadastrar um novo cliente
//ATENÇÂO: Para trabalhar com banco de dados usar sempre
//async - await e try-catch
const salvarCliente = async (nomeCli, foneCli, cpfCli) => {
    try { 
        //setar a estrutura de dados com os valores
        //obs: usar os mesmo nomes da estrutura
        const novoCliente = new clienteModel({
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli
        })
        //A linha abaixo salva os dados no banco de dados
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso")
    } catch (error) {
        console.log(error)
    }
}

//===============================================================
const iniciarSistema = async () => {
    console.clear()
    console.log("Estudo do MongoDB")
    console.log("-------------------------------------")
    await conectar()
    //CRUD create(inscerção do banco de dados)
    await salvarCliente("Miguel Lopes", "964563225", "23555573338")
    await desconectar()
}

iniciarSistema()

