import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import Api from './Api'
import ListaFuncionarios from './ListaFuncionarios'

const Funcionario = (props) => {

    let [id, setId] = useState(null);
    let [nome, setNome] = useState('');
    let [sobrenome, setSobrenome] = useState('');
    let [email, setEmail] = useState('');
    let [numeroNIS, setNumeroNIS] = useState(0);
    let operacaoTela = props.id ? "Edição" : "Inclusão";
    
    const getFuncionario = function() {
        return {
            id: id,
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            numeroNIS: numeroNIS
        };
    }

    const setFuncionario = function(obj) {
        setId(obj.id);
        setNome(obj.nome);
        setSobrenome(obj.sobrenome);
        setEmail(obj.email);
        setNumeroNIS(obj.numeroNIS);
    }

    const salvaFuncionario = function() {
        if (validaFormulario()) {
            let funcionario = getFuncionario();
            let method = funcionario.id ? "PUT" : "POST";
            Api.call(Api.baseUrl+"/funcionario/"+(method === "POST" ? "insert" : "update"), method, funcionario, () => {
                ReactDOM.render(<ListaFuncionarios />, document.getElementById('content'));
            });
        }
    }

    const validaFormulario = () => {
        let valido = false;
        let erro = nome.length < 2 ? '\n* Nome Inválido' : '';
        erro += sobrenome.length < 2 ? '\n* Sobrenome Inválido' : '';
        erro += validaEmail(email) ? '' :  '\n* E-mail inválido'
        if (erro === '') {
            valido = true;
        } else {
            alert(erro);
        }
        return valido;
    }

    const validaEmail = (email) => {
        let regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
        return regexEmail.test(email);
    }

    const fechaCadastro = function() {
        ReactDOM.render(<ListaFuncionarios />, document.getElementById('content'));
    }

    useEffect(() => {
        if (props.id) {
            Api.call(Api.baseUrl+"/funcionario/"+props.id, "GET", null,  (data) => {
                if (data) {
                    setFuncionario(data);
                }
            })
        }
    }, [])

    return (
        <div>
            <div>
                <div>
                    <h1>{operacaoTela} de Funcionário {props.id ? '('+props.id+')' : ''}</h1>
                </div>
                <div className="form">
                    <input type='text' placeholder='Nome' name='nome' value={nome} minLength='2' maxLength='30' onChange={(e) => {setNome(e.target.value)}}/>
                    
                    <input type='text' placeholder='Sobrenome' name='sobrenome' minLength='2' maxLength='50' value={sobrenome}  onChange={(e) => {setSobrenome(e.target.value)}} />
                    
                    <input type='email' placeholder='E-mail' name='email' value={email} onChange={(e) => {setEmail(e.target.value)}} />

                    <input type='number' placeholder='Número NIS' name='numeroNIS' value={numeroNIS} onChange={(e) => {setNumeroNIS(e.target.value)}} />
                    
                    <input type='button' value='Confirma' className='form-btn' onClick={salvaFuncionario} />
                    
                    <input type='button' value='Fechar' className='form-btn' onClick={fechaCadastro} />
                </div>
            </div>
        </div>
    )
}
export default Funcionario;