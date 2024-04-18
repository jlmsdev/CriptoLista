import styles from './detalhe.module.css';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CoinProps } from '../home';

interface ResponseData {
    data: CoinProps;
}

interface ErrorData {
    error: string;
}

type DataProps = ResponseData | ErrorData;

export function Detalhe() {
    const { cripto } = useParams();
    const navigate = useNavigate();

    const endpointCoin = `https://api.coincap.io/v2/assets/${cripto}`;
    const [detalheCoin, setDetalheCoin] = useState<CoinProps>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function detalheMoeda() {
            try {
                fetch(endpointCoin)
                .then(response => response.json())
                .then((data: DataProps) => {
                    
                    if("error" in data) {
                        navigate('/');
                        return;
                    }

                    const price = Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD'
                    });
        
                    const priceCompact = Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact'
                    });

                    const resultadoDetalhe = {
                        ...data.data,
                        precoFormatado: price.format(Number(data.data.priceUsd)),
                        precoMercadoFormatado: priceCompact.format(Number(data.data.marketCapUsd)),
                        volumeFormatado: priceCompact.format(Number(data.data.volumeUsd24Hr))
                    }

                    setDetalheCoin((resultadoDetalhe));
                    setLoading(false);
                })

            } catch (error) {
                console.log(error);
                navigate('/');
            }
        }

        detalheMoeda();

    }, [cripto])

    if(loading || !detalheCoin) {
        return (
            <div className={styles.containerLoading}>
                <h3>Carregando detalhes da moeda....</h3>
            </div>
        )
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.center}>{detalheCoin?.name}</h1>
            <h1 className={styles.center}>{detalheCoin?.symbol}</h1>

            <section className={styles.conteudo}>
                <img src={`https://assets.coincap.io/assets/icons/${detalheCoin?.symbol.toLocaleLowerCase()}@2x.png`} alt="Logo moeda" />

                <h1>{detalheCoin?.name} | {detalheCoin?.symbol}</h1>
                <p><strong>Preço: </strong> {detalheCoin?.precoFormatado}</p>
                <p><strong>Mercado: </strong> {detalheCoin?.precoMercadoFormatado}</p>
                <p><strong>Volume: </strong> {detalheCoin?.volumeFormatado}</p>
                <p><strong>Mudança 24hr:</strong> <span className={ Number(detalheCoin?.changePercent24Hr) > 0 ? styles.profit : styles.loss }>{Number(detalheCoin?.changePercent24Hr).toFixed(2)}</span> </p>
            </section>
        </div>
    )
}