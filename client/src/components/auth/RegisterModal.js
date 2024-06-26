import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR_REQUEST, REGISTER_REQUEST } from "../../redux/types";
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink } from "reactstrap";

const RegisterModal = () => {
    const [modal, setModal] = useState(false)
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [localMsg, setLocalMsg] = useState('')
    const { errorMsg } = useSelector((state)=>state.auth)

    const dispatch = useDispatch()
    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST,
        })
        setModal(!modal)
    }

    useEffect(()=>{
        try {
            setLocalMsg(errorMsg)
        } catch (e) {
            console.error(e)
        }
    },[errorMsg])

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password } = form;
        const newUser = { name, email, password }
        console.log(newUser, "newUser")
        dispatch({
            type: REGISTER_REQUEST,
            payload: newUser
        })
    }

    // Presenter : 데이터를 받아서 UI를 렌더링하는 역할
    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Register
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Register</ModalHeader>
                <ModalBody>
                    {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Name"
                                onChange={onChange}
                            />
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                onChange={onChange}
                            />
                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                onChange={onChange}
                            />
                            <Button color="dark" className="mt-2">
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default RegisterModal