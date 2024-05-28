import styled from "styled-components";
import Header from "../../components/Header";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import {useRef, useState} from "react";
import { InputText } from 'primereact/inputtext'; 
import { InputTextarea } from 'primereact/inputtextarea'; 
import { useForm } from "react-hook-form";
import { useBuscarCategorias, useBuscarTarefas, useCriarTarefa, useDeletarTarefa } from "../../hooks/hookTarefas";
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'; 
import { Toast } from "primereact/toast";
        
        

const HomeContainer = styled.section``;

const Home = () => {

    const [visibleDialog, setVisibleDialog] = useState(false);
    const [categoria, setCategoria] = useState();
    const { register, handleSubmit, reset, formState:{ errors }, setValue } = useForm();

    const toast = useRef()

    const { data: categorias } = useBuscarCategorias();
    const { data: tarefas, isFetched } = useBuscarTarefas();
    const { mutateAsync: handleCriar } = useCriarTarefa(); 
    const { mutateAsync: handleDeletar } = useDeletarTarefa();

    const criarTarefa = (dados) => {
       handleCriar(dados, {
        onSuccess: () => {
            setVisibleDialog(false);
        },
        onError: (erro) => {
            alert(erro.message)
        }
       });
    }

    const deletarTarefa = (id) => {
        confirmDialog({
            header: "Alerta",
            message: "Deseja realmente apagar estes dados?",
            acceptLabel: "Sim",
            rejectLabel: "Não",
            accept: () => {
                handleDeletar(id, {
                    onSuccess: () => {
                        toast.current.show({
                            summary: "Aviso:",
                            detail: "Dados deletados com sucesso",
                            severity: "sucess"

                        })
                    }
                });
            }
        })
    }



    return ( 
        <HomeContainer>
             <Header />  
             <div className="p-6">
                <h1 className="flex justify-content-between align-items-center">
                    Minhas Tarefas
                    <Button
                        label='Nova tarefa'
                        icon="pi pi-plus"
                        onClick={() => setVisibleDialog(true)}
                    />
                </h1>
                <div className="grid">
                    {isFetched && tarefas.map((tarefa, index) => (
                        <div className="col-4 surface-0 border-rounded-md p-3" key={index}>
                            <h3 className="flex justify-content-between">
                                { tarefa.titulo }
                                <i 
                                    className="pi pi-trash" 
                                    onClick={() => deletarTarefa(tarefa.id)}>    
                                </i>
                            </h3>
                            <h6>{ tarefa.categoria }</h6>
                            <p>{ tarefa.descricao }</p>
                        </div>
                    ))}
                </div>
            </div>  
            <Dialog
                visible={visibleDialog}
                onHide={() => setVisibleDialog(false)}
                header="Criar tarefa"
            >
              <form
              onSubmit={handleSubmit(criarTarefa)}
              className="flex flex-column gap-3">
                <InputText
                     placeholder="Título"
                     {...register("titulo", { required: true })}
                />
                <InputTextarea
                    placeholder="Descreva a tarefa"
                    {...register("descricao")}
                />
                <Dropdown 
                value={categoria}
                options={categorias}
                optionLabel="nome"
                optionValue="id"
                placeholder="Escolha uma categoria"
                onChange={(e) => {
                    setValue("categoria", e.value);
                    setCategoria(e.value);
                }}
                />
                <Button type="submit" label="Enviar"/>
                </form>

            </Dialog>  
            <ConfirmDialog />  
            <Toast ref={toast} position="bottom-right" />   
        </HomeContainer>        
     );
}
export default Home;