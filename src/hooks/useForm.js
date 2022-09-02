import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {},formValidations ={} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formValidation, setformValidation] = useState({})

    useEffect(() => {
      createValidators();
    }, [formState])
    useEffect(() => {
      setFormState(initialForm)
    
     
    }, [initialForm])
    
    const isFormValid = useMemo(() =>{
        for (const formvalue of Object.keys(formValidation)) {
            if(formValidation[formvalue]!==null)return false;
        }
        return true
    },[formValidation])
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }
    const createValidators= () => {
        const formCheckedValues ={};
       for (const formFiled of Object.keys(formValidations)) {
        const [fn, errorMessage= 'Este campo es requerido.']= formValidations[formFiled]
        formCheckedValues[`${formFiled}Valid`]=fn(formState[formFiled])? null: errorMessage
       }
       setformValidation(formCheckedValues)
       
      
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    }
}