'use client'
import instance from "@/src/services/api";
import React, { useState } from "react";
import Link from "next/link"

export default function CreateUser() {
    
    //Estado para o campo email
    const [email, setEmail] = useState<string>("");
    
    //Estado para o campo nome
    const [name, setName] = useState<string>("");
    
    //Estado para controle de erros
    const [error, setError] = useState<string | null>(null);

    //Estado para controle de sucesso
    const [sucess, setSucess] = useState<string | null>(null);

    //Função para enviar os dados para API
    const handleSubmit = async (event: React.FormEvent) => {

        //Evitar o reacarregamento da página ao enviar o formulário
        event.preventDefault();
        console.log("Cadastrar");

        //Limpa o erro e o sucesso anterior
        setError(null);
        setSucess(null);

        try{

            //Fazer a requisição à API e enviar os dados
            const response = await instance.post("/users", {
                name,
                email,
            });
            //Exibir a mensagem de sucesso
            setSucess(response.data.message);

            //Limpar o formulário
            setName("");
            setEmail("");

        } catch(error: any) {
            //Exibir a mensagem de erro
            setError(error.response.data.message);
        }
    }

    return(
        <div>
            <h1>Cadastrar Usuário</h1>
            <Link href={'/users/list'}>Listar</Link>

            {/*Exibe mensagem de erro*/}
            {error && <p style={{color: "#f00"}}>{error}</p>}

            {/*Exibe mensagem de sucesso*/}
            {sucess && <p style={{color: "#086"}}>{sucess}</p>} <br/>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome: </label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        placeholder="Nome completo do Usuário" 
                        onChange={(e) => setName(e.target.value)}
                        className="border p-1"/>
                </div>
                <div>
                    <label htmlFor="email">E-mail: </label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        placeholder="E-mail do Usuário" 
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-1"/>
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}