import React, { useState } from "react"
import { ScreenContainer, InputContainer } from "./Styled"
import TextField from '@mui/material/TextField'
import useForm from '../../hooks/useForm'
import Button from '@mui/material/Button'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { useHistory } from 'react-router-dom'
import { signUp } from "../../services/User"
import CircularProgress from '@mui/material/CircularProgress'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

const SignUpForm = (setRightButtonText) => {
    const history = useHistory()
    const [form, onChange, clear] = useForm({ 
        name: "",
        email: "", 
        password: "" 
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const onClickShowPassword = () => {
        setShowPassword(!showPassword)
      }
    
      const onMouseDownPassword = () => {
        setShowPassword(!showPassword)
      }

    const onSubmitForm = (event) => {
        event.preventDefault()
        signUp(form, clear, history, setRightButtonText, setIsLoading)
    }

    return (
        <ScreenContainer>
            <form onSubmit={onSubmitForm}>
            <InputContainer>
                <TextField 
                required
                label={"Nome"}
                type={"text"}
                variant={"outlined"}
                name={"name"}
                value={form.name}
                onChange={onChange}
                fullWidth
                margin={"normal"}
                />

                <TextField 
                required
                label={"E-mail"}
                type={"email"}
                variant={"outlined"}
                name={"email"}
                value={form.email}
                onChange={onChange}
                fullWidth
                margin={"normal"}
                />

                <TextField
                required
                label="Senha" 
                variant="outlined"
                name={"password"}
                value={form.password}
                onChange={onChange}
                fullWidth
                margin={"normal"}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={onClickShowPassword}
                          onMouseDown={onMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  type={showPassword ? 'text' : 'password'}
                />

            <Button
                color="primary" 
                size="large"
                variant="contained"
                type="submit"
                margin={"normal"}
                endIcon={<SendRoundedIcon />}
                >
                    { isLoading ? <CircularProgress color={"inherit"} size={24}/> : <>Cadastre-se</> }

                </Button>
            </InputContainer>
            </form>
        </ScreenContainer>
    )
}

export default SignUpForm