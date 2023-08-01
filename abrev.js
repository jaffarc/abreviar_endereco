function Endereco (texto, tamanho) {

    this.textoOriginal = texto;
    this.texto = texto;
    this.tamanho = Number(tamanho);
    this.tentativas = 0;
};

Endereco.prototype.lista = {
    'professora': 'Profa.',
    'professor': 'Prof.',
    'rua': 'R.',
    'avenida': 'AV.',
    'alameda': 'AL',
    'avenida': 'AV',
    'estrada': 'ESTR',
    'jardim': 'JD',
    'loteamento': 'LOT',
    'parque': 'PQ',
    'transversal': 'TRANSV',
    'habitação': 'HAB',
    'alferes': 'ALF',
    'almirante': 'ALM',
    'arquiteto': 'ARQ',
    'brigadeiro': 'BRIG',
    'capitão': 'CAP',
    'comandante': 'CMDT',
    'comendador': 'COMEND',
    'conselheiro': 'CONS',
    'coronel': 'CEL',
    'coutor': 'DR',
    'coutora': 'DRA',
    'embaixador': 'EMB',
    'engenheira': 'ENG',
    'engenheiro': 'ENG',
    'desembargador': 'DES',
    'desembargadora': 'DESA',
    'general': 'GEN',
    'infante': 'INF',
    'presidente': 'PRES',
    'professor': 'PROF',
    'professora': 'PROFA',
    'sargento': 'SARG',
    'tenente': 'TEN',
    'visconde': 'VISC',
    'instituto': 'INST',
    'ministério': 'MIN',
    'sociedade': 'SOC',
    'universidade': 'UNIV',
    'viaduto': 'VD',
    'travessa': 'TV',
    'condomínio': 'COND',
    'núcleo': 'NUC',
    'ponte': 'PTE',
    'quadra': 'Q',
    'residencial': 'R',
    'trevo': 'TRV',
    'mestre': 'Mte',
    'mestra': 'Mta'
};

Endereco.prototype.abreviacoes = function (palavra) {

    return this.lista[ palavra.trim().toLowerCase() ] || ''
}

Endereco.prototype.abreviar = function () {

    this.tentativas += 1;

    if (this.texto.length >= this.tamanho && this.tentativas < 10) {

        let listaDePalavras = this.texto.split(' ');
        let temAbreviacao = false;

        listaDePalavras = listaDePalavras.map((palavra) => {

            let resposta = palavra;
            const abreviacao = this.abreviacoes(palavra);
            
            if (abreviacao.length) {

                temAbreviacao = true;

                resposta = abreviacao
            }

            return resposta;
        });

        this.texto = listaDePalavras.join(' ').trim();

        if (this.texto.length >= this.tamanho) {

            let quebre = false

            listaDePalavras = listaDePalavras.reverse().map((palavra, index) => {

                if (index > 0 && palavra.length > 2) {

                    if (!Object.values(this.lista).includes(palavra) && !Object.values(this.lista).includes(listaDePalavras[index + 1])) {

                        if (!quebre) {

                            quebre = true;
    
                            return `${palavra.slice(0, 1)}.`;
                        }
                    }
                };

                return palavra
            }).reverse();
        }

        this.texto = listaDePalavras.join(' ').trim();

        return this.abreviar(this.texto);
    }

    return this.texto;
};

Endereco.prototype.reverter = function () {

    return this.textoOriginal;
};

 const texto = new Endereco('Rua Desembargador Juarez Mattos Barreto Bezerra de Menezes', 15);
// const texto = new Endereco('Rua Armando Ramos', 22);

console.log(texto.abreviar())
console.log(texto.reverter())
