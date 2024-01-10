import {axios} from '../../../utils/axios';
import {isAxiosError} from 'axios';
import {toast} from 'react-toastify';
import {toastOptions} from '../../../config/toast';

export const getPermisos = async(permisos, setPermisos, listado, setListado)=>{
    setPermisos({...permisos, loading:true})
    const response = await axios().get('/permisos');
    if(!isAxiosError(response)){
        const {data, error} = response.data;
        if(data && !error){
            setPermisos({...permisos, loading:false, data:data});
            toast.success('Permisos cargados', toastOptions);
            setListado({...listado, permisos_select:[], permisos:data})
        }

        if(!data && error){
            setPermisos({...permisos, loading:false, error:error});
            toast.error(error, toastOptions);
        }
    }else{
        setPermisos({...permisos, loading:false, error:'Hubo un error durante la consulta'});
    }
}

export const consultar_persona = async(e, persona, setPersona, setListado, listado)=>{
    e.preventDefault();
    setListado({...listado, permisos_asign:[], permisos_no_asign:[], permisos_select:[]});
    setPersona({...persona, loading:true, data:null})
    const response = await axios().post('/buscar_persona', {data:persona.values.data});
    if(!isAxiosError(response)){
        const {data, error} = response.data;
        if(data && !error){
            setPersona({...persona, loading:false, data:data});
            console.log(data);
        }

        if(!data && error){
            setPersona({...persona, loading:false, error:error});
            if(error.general){
              toast.error(error.general, toastOptions);
            }else{
              toast.error(error, toastOptions);
            }
        }
    }else{
        setPersona({...persona, loading:false, error:'Hubo un error durante la consulta'});
    }

}

const seleccionar = (e, listado, setListado)=>{
   
}

export const dataTablePermisos = (data, listado, setListado) => {
    const columns = [
      { field: "id", headerName: "Identificador", width: 10, flex: 0.5, hide:true},
      {
        field: "accion",
        headerName: "Acción",
        width: 50,
        flex: 0.2,
        sorteable: false,
        renderCell: (p) => {
            return <div className='d-flex justify-content-evenly w-100'>
                <input type='checkbox' key={p.id} onChange={(e, listado, setListado)=>seleccionar(e)}></input>
            </div>
          },
      },
      {
        field: "name",
        headerName: "Nombre",
        width: 60,
        flex: 1,
        sorteable: true,
      },
      {
        field: "description",
        headerName: "Descripción",
        width: 150,
        flex: 1.3,
        sorteable: true,
      }
    ];
  
    const rows = data.map((d) => {
      return {
        id: d.id,
        name: d.name,
        description: d.description,
        accion: d.id
      };
    });
  
    const filter = (d, value) => {
      value = value.toLowerCase();
      return (
        d.id?.toString().toLowerCase().includes(value) ||
        d.name?.toLowerCase().includes(value) ||
        d.descripcion?.toLowerCase().includes(value)
      );
    };
  
    return { columns, rows, filter };
  };