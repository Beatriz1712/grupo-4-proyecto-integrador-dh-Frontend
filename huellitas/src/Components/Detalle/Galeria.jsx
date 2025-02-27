import { useState} from 'react'
import { Button } from "react-bootstrap";
import Foto from './Foto';
import '../../Styles/Galeria.css'
import GaleriaModal from './GaleriaModal';

function Galeria({ imagenes = [] }) {
  const [show, setShow] = useState(false);
   
  return (
      <div className='grid_layout_galeria'>
        {imagenes.slice(0, 5).map((imagen,index)=> (
          <Foto
            key={index}
            tipoFoto={index === 0 ? "imagen_principal" : "imagen_secundaria"}
            imagen={imagen} 
          />
        ))} 
        {!show && ( <Button className="boton_vermas_galeria" variant="primary"
           onClick={() => setShow(true)}>Ver más</Button>)}   
       {show && <GaleriaModal show={show} setShow = {setShow} foto={imagenes}  dialogClassName="custom-modal" />}     
      </div>
      
      
    
  );
}
export default Galeria


