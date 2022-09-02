
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layuot/AuthLayout";
import { useForm } from "../../hooks";
import { startCreatingUserWithEmailPassword } from "../../store/auth";


const formData ={
  email:'',
    password:'',
    displayName: ''
}

const formValidations={
  email: [(value)=>value.includes('@'), 'El correo debe de tener un @.'],
  password: [(value)=>value.length >=6  , 'El password debe de tener mas de 6 letras.'],
  displayName: [(value)=>value.length >=1  , 'El nombre es obligatorio.'],
}
export const RegisterPage = () => {
  const dispatch = useDispatch()
  const [formSubmitted, setformSubmitted] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth);
  const isCheckingAuthetication = useMemo(() =>status === 'checking',[status])
  
  const{displayName, email, password, onInputChange, formState,
  isFormValid, displayNameValid,emailValid,passwordValid} = useForm(formData,formValidations)

   
  const onSubmit= (event) => {
    event.preventDefault();
    setformSubmitted(true);

    if(!isFormValid) return;

    dispatch(startCreatingUserWithEmailPassword(formState));

  }
  return (
<AuthLayout title="Crear un cuenta">
  <h1>FormValid{isFormValid ? ' Valido' : ' Incorrecto'}</h1>
    <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
      <Grid container>
        <Grid item xs={12} sx={{mt:2}}>
          <TextField 
          label="Nombre Completo"
          type="text" 
          placeholder="Tu Nombre" 
          fullWidth
          name="displayName"
          value={displayName}
          onChange={onInputChange}
          error= {!!displayNameValid && formSubmitted}
          helperText={displayNameValid}/>

        </Grid>
        <Grid item xs={12} sx={{mt:2}}>
          <TextField 
          label="Correo"
          type="email" 
          placeholder="correo@google.com" 
          fullWidth
          name="email"
          value={email}
          onChange={onInputChange}
          error= {!!emailValid && formSubmitted}
          helperText={emailValid}/>

        </Grid>
        <Grid item xs={12} sx={{mt:2}}>
          <TextField 
          label="Contraseña"
          type="password" 
          placeholder="Contraseña" 
          fullWidth
          name="password"
          value={password}
          onChange={onInputChange}
          error= {!!passwordValid && formSubmitted}
          helperText={passwordValid}/>

        </Grid>
        <Grid container spacing={2} sx={{mb:2, mt:1}}>
        <Grid item xs={12} display={!!errorMessage ? '' : 'none'}> 
            <Alert severity="error">{errorMessage }</Alert>
          </Grid>
          <Grid item xs={12}> 
            <Button disabled={isCheckingAuthetication}
            type="submit" variant='contained' fullWidth>
              Crear cuenta
            </Button>
          </Grid>

        </Grid>
          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr:1}}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
           ingresar
            </Link>
          </Grid>

      </Grid>
    </form>
</AuthLayout>)}



