'use client'
import instance from "@/src/services/api";
//Importar componente para criar Link
import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "../../components/Menu";

interface User{
    id: number,
    name: string,
    email: string,
}

export default function Users(){
    //Estado para controle de erros
    const [error, setError] = useState<string | null>(null);


    //Estado para armazenar os usuários
    const [users, setUsers] = useState<User[]>([]);


    //Função para buscar os usuários da API
    const fetchUsers = async () => {
        try{

            //Fazer requisição à API
            const response = await instance.get("/users");
            console.log(response.data);

            //Atualizar o estado com os dados da API
            setUsers(response.data);
        }catch(error){

            //Criar mensagem de ERRO
            setError("Erro ao carregar os usuários");
        }
    }

    //Hook para buscar os dados na primeira redenrização
    useEffect(() => {

        //Busca os dados ao carregar a página
        fetchUsers();
    }, []);

    return(
        <div className="flex flex-col h-screen bg-gray-100">
            <Menu />

            <div className="flex-1 px-2 py-6 max-w-6xl mx-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Lista de Usuários</h1>
                    <Link href={'/users/create'} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Cadastrar</Link>
                </div>

                
                {/*Exibe mensagem de erro*/}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                <div className="mt-6 bg-white shadow-md rounded-lg p-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Nome</th>
                                <th className="p-3 text-left">E-mail</th>
                                <th className="p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100">
                                    <td className="border border-gray-200 p-3">{user.id}</td>
                                    <td className="border border-gray-200 p-3">{user.name}</td>
                                    <td className="border border-gray-200 p-3">{user.email}</td>
                                    <td className="border border-gray-200 p-3">Vizualizar Editar Apagar</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}