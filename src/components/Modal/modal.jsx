import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useAPI} from "../../context/apiContext";

export const FormModal = ({id}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const {userEdit , updateUser} = useAPI()
    useEffect(()=>{
        if(userEdit.isEdit){
            setName(userEdit.user.name);
            setEmail(userEdit.user.email);
            setUsername(userEdit.user.username)
        }
    },[userEdit])
    const SaveEditeDataHandler = (e) => {
        e.preventDefault()
        const user = {name , email , username};
        if (userEdit.isEdit){
            updateUser(userEdit.user.id , user)
        }
    }
   
    return (
        <div className="form">
            <Modal.Header >
                <Modal.Title>ویرایش کاربری</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={SaveEditeDataHandler}>
                    <div className="row mb-4">
                        <div className="col">
                            <input id={id}  className="form-control" type='text' value={name} onChange={e => setName(e.target.value)} placeholder="نام"/>
                        </div>
                        <div className="col">
                            <input className="form-control" type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="ایمیل"/>
                        </div>
                        <div className="col">
                            <input className="form-control" type='text' value={username} onChange={e => setUsername(e.target.value)} placeholder="نام کاربری"/>
                        </div>
                    </div>

                    <Button type="submit">ثبت</Button>

                </form>
            </Modal.Body>

        </div>
    );
}
