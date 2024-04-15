import styles from './home.module.css';
import { useState, FormEvent, useEffect } from 'react';

import { BsSearch } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';



export interface CoinProps {
    changePercent24Hr: string;
    explorer: string;
    id: string;
    marketCapUsd: string;
    maxSupply: string;
    name: string;
    priceUsd: string;
    rank: string;
    supply: string;
    symbol: string;
    volumeUsd24Hr: string;
    vwap24Hr: string;
    precoFormatado?: string;
    precoMercadoFormatado?: string;
    volumeFormatado?: string;
}

interface DataProp {
    data: CoinProps[];
}

export function Home() {
    const [input, setInput] = useState('');
    const [coins, setCoins] = useState<CoinProps[]>([]);
    const [offset, setOffset] = useState(0);

    const endpoint = `https://api.coincap.io/v2/assets?limit=10&offset=${offset}`;
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [offset]);

    

    async function getData() {
        fetch(endpoint)
        .then(response => response.json())
        .then((data: DataProp) => {
            const coinsData = data.data;
           
            /**
             * Funcao para Formatar Moeda
             */
            const price = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            });

            const priceCompact = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                notation: 'compact'
            });

            /**
             * Criando um Novo Objeto com propriedades formatadas
             */
            const resultadoFormatado = coinsData.map((item) => {
                const formatado = {
                    ...item,
                    precoFormatado: price.format(Number(item.priceUsd)),
                    precoMercadoFormatado: priceCompact.format(Number(item.marketCapUsd)),
                    volumeFormatado: priceCompact.format(Number(item.volumeUsd24Hr))
                }

                return formatado;
            })
            
            const listCoin = [...coins, ...resultadoFormatado];
            setCoins(listCoin);
        })

    }

    function buscarMoeda(e: FormEvent) {
        e.preventDefault();

        if(input === '') return;

        navigate(`/detalhe/${input}`)
    }

    function carregaListaMoeda() {
        if(offset === 0) {
            setOffset(10);
            return;
        }

        setOffset(offset + 10);
    }


    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={buscarMoeda}>
                <input type="text"
                    placeholder='Digite o nome da moeda... EX: Bitcoin'
                    value={input}
                    onChange={ (e)=> setInput(e.target.value) }
                />
                <button type='submit'>
                    <BsSearch size={30} color='#FFF' />
                </button>
            </form>


            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                        <th scope='col'>Mudança 24h</th>
                    </tr>
                </thead>

                <tbody id='tbody'>

                    {coins.length > 0 && coins.map((item) => (
                        <tr className={styles.tr} key={item.id}>

                            <td className={styles.tdLabel} data-label="Moeda">
                                <div className={styles.name}>
                                    <img className={styles.logoCripto} 
                                    src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`} 
                                    alt="Logo Cripto" />

                                    <Link to={`/detalhe/${item.id}`}>
                                        <span>{item.name} | {item.symbol}</span>
                                    </Link>
                                </div>
                            </td>

                            <td className={styles.tdLabel} data-label="Valor Mercado">
                                {item.precoMercadoFormatado}
                            </td>

                            <td className={styles.tdLabel} data-label="Preço">
                                {item.precoFormatado}
                            </td>

                            <td className={styles.tdLabel} data-label="Volume">
                                {item.volumeFormatado}
                            </td>

                            <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label="Mudança 24h">
                                <span>{ Number(item.changePercent24Hr).toFixed(2) }</span>
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

            <button className={styles.carregaLista} onClick={carregaListaMoeda}>
                Carregar Mais
            </button>


        </main>
    )
}