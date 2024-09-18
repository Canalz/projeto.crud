import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [viagens, setViagens] = useState([]);
  const [novaViagem, setNovaViagem] = useState({
    nome: '',
    dataSaida: '',
    dataChegada: '',
    valor: '',
    destinos: [],
  });

  useEffect(() => {
    carregarViagens();
  }, []);

  const carregarViagens = async () => {
    const response = await axios.get('http://localhost:5000/api/viagens');
    setViagens(response.data);
  };

  const criarViagem = async () => {
    const response = await axios.post('http://localhost:5000/api/viagens', novaViagem);
    setViagens([...viagens, response.data]);
    setNovaViagem({
      nome: '',
      dataSaida: '',
      dataChegada: '',
      valor: '',
      destinos: [],
    });
  };

  const deletarViagem = async (id) => {
    await axios.delete(`http://localhost:5000/api/viagens/${id}`);
    setViagens(viagens.filter((viagem) => viagem._id !== id));
  };

  return (
    <div>
      <h1>Gerenciar Viagens</h1>

      <h2>Criar Nova Viagem</h2>
      <input
        type="text"
        placeholder="Nome"
        value={novaViagem.nome}
        onChange={(e) => setNovaViagem({ ...novaViagem, nome: e.target.value })}
      />
      <input
        type="date"
        value={novaViagem.dataSaida}
        onChange={(e) => setNovaViagem({ ...novaViagem, dataSaida: e.target.value })}
      />
      <input
        type="date"
        value={novaViagem.dataChegada}
        onChange={(e) => setNovaViagem({ ...novaViagem, dataChegada: e.target.value })}
      />
      <input
        type="number"
        placeholder="Valor"
        value={novaViagem.valor}
        onChange={(e) => setNovaViagem({ ...novaViagem, valor: e.target.value })}
      />
      <button onClick={criarViagem}>Criar Viagem</button>

      <h2>Lista de Viagens</h2>
      <ul>
        {viagens.map((viagem) => (
          <li key={viagem._id}>
            {viagem.nome} - {viagem.dataSaida} até {viagem.dataChegada} - Valor: R$ {viagem.valor}
            <button onClick={() => deletarViagem(viagem._id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};



export default App;
