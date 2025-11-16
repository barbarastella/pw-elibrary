import { useState } from 'react'
import { Button, Modal, Form, Container, Row } from 'react-bootstrap';

function Dialogo(props) {
    const {
        show,
        onHide,
        titulo,
        onSubmit,
        children,
        id,
        size = 'lg',
        validacaoInterna = true,
        textoBotaoSalvar = 'Salvar',
        textoBotaoCancelar = 'Fechar',
        loading = false,
        iconeTitulo = null
    } = props;

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        if (validacaoInterna) {
            const form = event.currentTarget;

            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }

            setValidated(true);
            if (form.checkValidity() === true && onSubmit) onSubmit(event);

        } else if (onSubmit) onSubmit(event);

    };

    return (
        <Modal show={show} onHide={onHide} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{iconeTitulo && <i className={iconeTitulo + ' me-2'}></i>}{titulo}</Modal.Title>
            </Modal.Header>

            <Form id={id} onSubmit={handleSubmit} noValidate validated={validated}>
                <Modal.Body>
                    <Container><Row>{children}</Row> </Container>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}> <i className="bi bi-x-circle me-2"></i>{textoBotaoCancelar}</Button>
                    <Button variant="success" type="submit" disabled={loading}> <i className="bi bi-save me-2"></i>{textoBotaoSalvar}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
};

export default Dialogo;