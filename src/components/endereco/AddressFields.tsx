import React, { useState, useEffect } from 'react';
import { formatCEP } from '../../utils/utils'; // Supondo que você tenha uma função para formatar o CEP

interface AddressFieldsProps {
  addressStreet: string;
  addressNumber: string;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  setAddressStreet: React.Dispatch<React.SetStateAction<string>>;
  setAddressNumber: React.Dispatch<React.SetStateAction<string>>;
  setAddressNeighborhood: React.Dispatch<React.SetStateAction<string>>;
  setAddressCity: React.Dispatch<React.SetStateAction<string>>;
  setAddressState: React.Dispatch<React.SetStateAction<string>>;
  setAddressZipCode: React.Dispatch<React.SetStateAction<string>>;
}

export default function AddressFields({
  addressStreet,
  addressNumber,
  addressNeighborhood,
  addressCity,
  addressState,
  addressZipCode,
  setAddressStreet,
  setAddressNumber,
  setAddressNeighborhood,
  setAddressCity,
  setAddressState,
  setAddressZipCode
}: AddressFieldsProps) {
  const [loading, setLoading] = useState(false);
  const [debouncedZipCode, setDebouncedZipCode] = useState(addressZipCode);

  // Função debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedZipCode(addressZipCode);
    }, 500); // 500ms de delay após o usuário parar de digitar

    // Limpar o timeout se o valor do CEP mudar antes do tempo de debounce
    return () => clearTimeout(timer);
  }, [addressZipCode]);

  useEffect(() => {
    // Sempre que o CEP debounced mudar, limpa os campos de endereço
    const cleanCEP = debouncedZipCode.replace("-", ""); // Remove o hífen do CEP

    // Verifica se o CEP é válido antes de fazer a requisição
    if (cleanCEP.length === 8 && /^\d{8}$/.test(cleanCEP)) {
      setLoading(true);
      setAddressStreet('');
      setAddressNeighborhood('');
      setAddressCity('');
      setAddressState('');

      fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            setAddressStreet(data.logradouro);
            setAddressNeighborhood(data.bairro);
            setAddressCity(data.localidade);
            setAddressState(data.uf);
          } else {
            alert('CEP não encontrado');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar o CEP:', error);
          setLoading(false);
        });
    } else {
      setLoading(false); // Se o CEP for inválido, termina o loading sem fazer requisição
    }
  }, [debouncedZipCode, setAddressStreet, setAddressNeighborhood, setAddressCity, setAddressState]);

  return (
    <>
      <div className="campo-projeto">
        <label htmlFor="addressZipCode">CEP:</label>
        <input
          type="text"
          id="addressZipCode"
          maxLength={9}
          value={formatCEP(addressZipCode)}
          onChange={(e) => setAddressZipCode(e.target.value)}
        />
      </div>
      
      <div className="campo-projeto">
        <label htmlFor="addressStreet">Rua:</label>
        <input
          type="text"
          id="addressStreet"
          value={addressStreet}
          onChange={(e) => setAddressStreet(e.target.value)}
        />
      </div>

      <div className="campo-projeto">
        <label htmlFor="addressNumber">Número:</label>
        <input
          type="text"
          id="addressNumber"
          value={addressNumber}
          onChange={(e) => setAddressNumber(e.target.value)}
        />
      </div>

      <div className="campo-projeto">
        <label htmlFor="addressNeighborhood">Bairro:</label>
        <input
          type="text"
          id="addressNeighborhood"
          value={addressNeighborhood}
          onChange={(e) => setAddressNeighborhood(e.target.value)}
        />
      </div>

      <div className="campo-projeto">
        <label htmlFor="addressCity">Cidade:</label>
        <input
          type="text"
          id="addressCity"
          value={addressCity}
          onChange={(e) => setAddressCity(e.target.value)}
        />
      </div>

      <div className="campo-projeto">
        <label htmlFor="addressState">Estado:</label>
        <input
          type="text"
          id="addressState"
          value={addressState}
          onChange={(e) => setAddressState(e.target.value)}
        />
      </div>

      {loading && <div>Carregando endereço...</div>}
    </>
  );
}
