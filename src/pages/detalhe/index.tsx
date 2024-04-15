import style from './detalhe.module.css';

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
                })

            } catch (error) {
                console.log(error);
                navigate('/');
            }
        }

        detalheMoeda();

    }, [cripto])

    return(
        <div>
            {cripto}
        </div>
    )
}