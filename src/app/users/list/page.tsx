'use client'
import instance from "@/src/services/api";
import { useEffect, useState } from "react";

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
        <div>

            <h1>Listar Usuários</h1>
            {/*Exibe mensagem de erro*/}
            {error && <p style={{color: "#f00"}}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}