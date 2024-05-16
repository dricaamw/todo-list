import styled from "styled-components";
import Header from "../../components/Header";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import {useState} from "react";
import { InputText } from 'primereact/inputtext'; 
import { InputTextarea } from 'primereact/inputtextarea'; 
        

const HomeContainer = styled.section``;

const Home = () => {

    const [visibleDialog, setVisibleDialog] = useState(false);

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
            </div>  
            <Dialog
                visible={visibleDialog}
                onHide={() => setVisibleDialog(false)}
                header="Criar tarefa"
            >
              <form className="flex flex-column gap-3">
                <InputText
                     placeholder="Título"
                />
                <InputTextarea
                    placeholder="Descreva a tarefa"
                />
                <Button type="submit" />
                </form>

            </Dialog>       
        </HomeContainer>
        
     );
}
export default Home;