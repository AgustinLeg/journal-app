import { Routes, Route, Navigate, NavLink } from 'react-router-dom'

import LoginScreen from '../components/auth/LoginScreen'
import RegisterScreen from '../components/auth/RegisterScreen'

import astronautStudy from '../assets/astronaut-study.png'
import Spinner from '../components/Stateless/Spinner'
import { useSelector } from 'react-redux'

const AuthRouter = () => {
    const {loading} = useSelector(state => state.ui)
    
    return (
        <div className="auth__main">
            {loading && <Spinner />}
            <div className="auth__box-features">
                <h1 className="auth__features-title">Bienvenid@</h1>
                <p>Inicia sesión o crea una cuenta para poder ingresar</p>
                <img src={astronautStudy} alt="astronaut illustration" />
            </div>
                <div className="auth__box-container">
                    <div className="auth__box-content">
                        <h1 className="auth__title mb-5">Journal App</h1>
                        <div className="auth__box-actions">
                            <NavLink to="/auth/login" className="">Iniciar Sesión</NavLink>
                            <NavLink to="/auth/register" className="">Crear Cuenta</NavLink>
                        </div>
                    </div>
                    <Routes>
                        <Route path="/login" element={<LoginScreen />}/>
                        <Route path="/register" element={<RegisterScreen />}/>
                        <Route path="/*" element={<Navigate replace to="/auth/login" />} />
                    </Routes>
                </div>
        </div>
    )
}

export default AuthRouter
