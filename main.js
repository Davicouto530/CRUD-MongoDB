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
        //Tratamento personalizado aos erros(exeções)
        if(error.code = 11000){
            console.log(`Erro no CPF ${cpfCli} já está cadastrado`)
        }else {
            console.log(error)
        }
    }
}

//===============================================================
//Função listar todos os clientes
const listarClientes = async () => {
    try{
        const clientes = await clienteModel.find().sort({
            nomeCliente: 1
        })
        console.log(clientes)
    }catch(error){
        console.log(error)
    }
}

//Função para buscar um cliente pelo nome
//find({nomeCliente: new RegExp(nome, i)}) = Ignorar na bucas letras maiúsculas ou minúsculas
//(i = casy insentive)
const buscarClienteNome = async (nome) => {
    try{
        const clienteNome = await clienteModel.find({
            nomeCliente: new RegExp(nome, 'i')
        })
        console.log(clienteNome)
    }catch(error){
        console.log(error)
    }
}

//Função para buscar o cpf do cliente
//find({nomeCliente: new RegExp(nome, i)}) = Ignorar na bucas letras maiúsculas ou minúsculas
//(i = casy insentive)
const buscarClienteCpf = async (cpf) => {
    try{
        const clienteCpf = await clienteModel.find({
            cpf: new RegExp(cpf)
        })
        console.log(clienteCpf)
    }catch(error){
        console.log(error)
    }
}

//Função para editar os dados do cliente
//ATENÇÃO: usar o id do cliente

//===============================================================
const iniciarSistema = async () => {
    console.clear()
    console.log("Estudo do MongoDB")
    console.log("-------------------------------------")
    await conectar()
    //CRUD create(inscerção do banco de dados)
    //await salvarCliente("Fábio Alberto Lopes", "963903225", "26787813338")
    
    //CRUD read(listar todos os clientes)
    //await listarClientes()

    //CRUD read (buscar pelo nome do cliente)
    //await buscarClienteNome("Jeferson")

    //CRUD read (buscar pelo cpf do cliente)
    await buscarClienteCpf(23466773338)
    await desconectar()
}

iniciarSistema()

