'use client'
import instance from "@/src/services/api";
import React, { useState } from "react";
import Link from "next/link"
import Menu from "../../components/Menu";

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
            <Menu />
            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Cadastrar Usuário</h1>
                    <Link href={'/users/list'} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Lista de Usuários</Link>
                </div>

                
                {/*Exibe mensagem de erro*/}
                {error && <p className="text-red-500 mt-4">{error}</p>}

                {/*Exibe mensagem de sucesso*/}
                {sucess && <p className="text-green-500 mt-4">{sucess}</p>}

                
            <form onSubmit={handleSubmit} className="mt-6 bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold">Nome: </label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        placeholder="Nome completo do Usuário" 
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full mt-1 rounded-md border-blue-100 shadow-sm focus:border-blue-300 focus:ring-blue-200 focus:outline-none"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email">E-mail: </label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        placeholder="E-mail do Usuário" 
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full mt-1 rounded-md border-blue-100 shadow-sm focus:border-blue-300 focus:ring-blue-200 focus:outline-none"/>
                </div>
                <div className="text-center">
                    <button type="submit" className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer">Cadastrar</button>
                </div>
            </form>
            </div>
        </div>
    )
}