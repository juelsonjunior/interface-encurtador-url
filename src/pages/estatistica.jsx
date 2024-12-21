import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../service/api';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function EstatisticaURL() {
    const [urlShort, setUrlShort] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [acessCount, setAcessCount] = useState();
    const [progressbar, setProgressbar] = useState(0);

    const searchUrlShort = async () => {
        try {
            setIsloading(true);

            const response = await api.post('/estatistic-url', {
                url: urlShort,
            });

            if (response.status != 200) {
                return toast.error(response.data.message);
            }

            setAcessCount(response.data.message);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Erro ao encurtar a url');
            }
        } finally {
            setIsloading(false);
            setProgressbar(0);
        }
    };

    useEffect(() => {
        if (progressbar < 100 && isLoading) {
            setTimeout(() => setProgressbar((prevState) => prevState + 1), 20);
        }
    }, [progressbar, isLoading]);

    return (
        <div className="w-full flex items-center  flex-col gap-3">
            <h1 className="text-center text-3xl mt-5">Estatistica de URL</h1>
            <p className="w-2/4 text-center">
                Verique a quantidade de acesso do seu link encurtado.
            </p>
            <div className="shadow-lg flex flex-col justify-center p-5 rounded-lg mt-3 w-1/2">
                <div
                    className={`bg-green-500 mb-2 rounded-full ${
                        isLoading ? 'flex' : 'hidden'
                    } h-2 justify-end px-3`}
                    style={{
                        width: `${progressbar}%`,
                    }}
                ></div>
                <div className="flex items-center justify-between w-full h-10">
                    <input
                        type="text"
                        placeholder="Cole o link encurtado aqui"
                        className="w-full outline-none px-1 h-6"
                        value={urlShort}
                        onChange={(e) => setUrlShort(e.target.value)}
                    />
                    <button
                        className="bg-slate-800 px-3 py-3 rounded-md flex items-center justify-center cursor-pointer disabled:animate-pulse"
                        disabled={isLoading}
                        onClick={searchUrlShort}
                    >
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="text-green-600"
                        />
                    </button>
                </div>

                <hr className="mt-4" />

                <div className="mt-5 mb-5">
                    <p className="text-lg">
                        Quantidade de acessos:
                        <span className="text-green-600 font-bold">
                            {acessCount ? ` ${acessCount}` : ' --'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
export default EstatisticaURL;
