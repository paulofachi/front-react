import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Funcionario from './Funcionario'
import Api from './Api'

const ListaFuncionarios = () => {
    
    let [listFuncionario, setListFuncionario] = useState([]);
    
    useEffect(() => {
        loadListaFuncionarios();
    }, [])

    const loadListaFuncionarios = () => {
        Api.call(Api.baseUrl+"/funcionario/list", "GET", null, (data) => {
            if (data) {
                setListFuncionario(data);
            }
        });
    }

    const deletaFuncionario = (id) => {
        if (id) {
            Api.call(Api.baseUrl+"/funcionario/delete/"+id, "DELETE", null, (res) => {
                alert("Funcionário deletado com sucesso!");
                loadListaFuncionarios();
            });
        }
    }

    const novoFuncionario = (evt) => {
        ReactDOM.render(<Funcionario id={null} />, document.getElementById('content'));
    }

    const editaFuncionario = (id) => {
        ReactDOM.render(<Funcionario id={id} />, document.getElementById('content'));
    }

    const getLinhasFuncionarios = () => {

        return listFuncionario.map( funcionario => {
            return <tr key={funcionario.id} id={funcionario.id}>
                <td><input id={funcionario.id} type="button" className='grid-btn' value="Editar" onClick={(e) => {editaFuncionario(e.target.id)}} /></td>
                <td>{funcionario.id}</td>
                <td>{funcionario.nome}</td>
                <td>{funcionario.sobrenome}</td>
                <td><input id={funcionario.id} type="button" className='grid-btn' value="Excluir" onClick={(e) => {deletaFuncionario(e.target.id)}} /></td>
            </tr>
        })
    }

    return (
        <>
            <div>
                <h1>Listagem de Funcionários</h1>
                <input type="button" className="grid-btn" value="Novo" onClick={novoFuncionario} />
                <table className='table'>
                    <thead>
                        <tr>
                            <th width="5%">#</th>
                            <th width="10%">ID</th>
                            <th width="40%">Nome</th>
                            <th width="40%">Sobrenome</th>
                            <th width="5%">#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getLinhasFuncionarios()}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default ListaFuncionarios;