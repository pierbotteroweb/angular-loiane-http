// VERSÃO EM JAVASCRIPT DA CONFIGURAÇÃO DE PROXY
const PROXY_CONFIG = [
    {
        // AQUI DEFINIMOS O CONTEXT QUE O FRONT USARÁ
        // PARA CHAMADAS PARA O BACK END (/api)
        context:['/api'],
        target: 'http://localhost:8000',
        secure: false, //USAR true QDO FOR USAR HTTPS
        logLevel: 'debug',
        pathRewrite: {'^/api':''} // EXISTEM CASOS ONDE ESTAMOS TRABALHANDO COM UMA API LEGADA, COM
                                  // DEFINIÇÕES IMUTAVEIS (COMO POR EXEMPLO, JÁ EXISTIR UM .API NAS REQUESTS)
                                  // EM CASOS ASSIM PODEMOS USAR O pathRewrite
        
    }
]

module.exports = PROXY_CONFIG