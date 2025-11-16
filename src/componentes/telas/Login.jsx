import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { login, getToken } from '../../seguranca/Auth';
import { Form, Button, Alert } from 'react-bootstrap';
import FormularioUsuario from '../comuns/FormularioUsuario.jsx';

function Login() {
    const [form, setForm] = useState({ username: "", senha: "" });
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const body = { username: form.username, senha: form.senha };
            setCarregando(true);
            setAlerta({ status: "", message: "" });

            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (data.auth === false) {
                setAlerta({ status: "danger", message: data.message });
                return;
            }

            login(data);
            setAutenticado(true);
        } catch (err) {
            setAlerta({ status: "danger", message: err.message });
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        try {
            const token = getToken();
            if (token != null) setAutenticado(true);
        } catch (err) {
            setAlerta({ status: "danger", message: err != null ? err.message : "" });
        }
    }, []);

    if (autenticado === true) return <Navigate to="/admin" />

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    {alerta.status && <Alert variant={alerta.status}>{alerta.message}</Alert>}
                    <Form onSubmit={handleLogin}>
                        <h1 className="h3 my-3 fw-normal">Login de usuário</h1>

                        <FormularioUsuario
                            form={form}
                            setForm={setForm}
                            modo="login"
                        />

                        <Button className="w-100 btn btn-lg btn-primary mt-3" type="submit" disabled={carregando}>
                            {carregando ? 'Entrando...' : 'Efetuar login'}
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )

}

export default Login;