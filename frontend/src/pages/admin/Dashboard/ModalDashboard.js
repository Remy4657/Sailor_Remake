import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { fetchAllGroup, createNewUser, updateUser } from '../../services/userService';
import _ from 'lodash'
import { toast } from "react-toastify";

import { fetchAllOrder } from '../../../service/admin/adminService';
import { createNewOrder } from '../../../service/admin/adminService';
import { updateOrder } from '../../../service/admin/adminService';

const ModalProduct = (props) => {
    const defaultUserData = {
        infoOrder: '',
        totalMoney: '',
        phone: '',
        email: '',
        address: '',
    }
    const defaultValidUser = {
        infoOrder: true,
        totalMoney: true,
        phone: true,
        email: true,
        address: true,
    }
    const [userData, setUserData] = useState(defaultUserData)
    const [validInput, setValidInput] = useState(defaultValidUser)

    const funcFetchAllOrder = async () => {
        let response = await fetchAllOrder()
        if (response && response.data.EC === 0) {
            //     setDataGroups(response.data.DT)
            //     // gan gia tri cho group khi khong chon group mà bam submit (neu khong gan thì gia tri group trong database la null)
            //     if (response.data.DT && response.data.DT.length > 0) {
            //         let groups = response.data.DT
            //         setUserData({ ...userData, group: groups[0].id })
            console.log(response)
        }
        // }
    }

    useEffect(() => {
        funcFetchAllOrder()
    }, [])

    useEffect(() => {

        if (props.action === 'Update') {

            setUserData({ ...props.dataEdit })
            // khi huy hanh dong edit thi dataEdit = {} khi do phai set lai gia tri mac dinh cua group ( truong hop nay group = 3)
            if (_.isEmpty(props.dataEdit)) {
                setUserData({ ...props.dataEdit })
            }
            else {

            }
        }
        // trương hop nay de xoa thong tin form khi nguoi dung nhan "add new user" sau khi da them moi nguoi dung lien truoc do
        // else xay ra khi nhan "save" de them moi nguoi dung
        else {

            setUserData({ ...props.dataEdit })
        }
    }, [props.dataEdit])



    const handleChangeInput = (valueInput, nameInput) => {
        let _userData = _.cloneDeep(userData)
        _userData[nameInput] = valueInput
        setUserData(_userData)

    }
    const handleValidateInput = () => {
        if (props.action === 'Update') {
            return true
        }
        let check = true
        setValidInput(defaultValidUser)
        let properties = ['infoOrder', 'totalMoney', 'phone', 'email', 'address']
        for (let i = 0; i < properties.length; i++) {
            // kiem tra cac gia tri input tren neu ko có gia tri thì bao loi
            if (!userData[properties[i]]) {
                let _defaultValidUser = _.cloneDeep(defaultValidUser)
                _defaultValidUser[properties[i]] = false
                setValidInput(_defaultValidUser)
                toast.error(`empty ${properties[i]}`)
                check = false
                break;
            }
        }
        return check
    }
    const handleSave = async (userData) => {
        let check = handleValidateInput()
        if (check === true) {

            //     // them thuoc tinh group id bang group de them groupID trong database
            let res = props.action === 'Create' ? await createNewOrder({ ...userData })
                : await updateOrder({ ...userData })
            if (res.data.EC === 0) {
                let _defaultValidUser = _.cloneDeep(userData)
                _defaultValidUser[res.data.DT] = false
                setValidInput(_defaultValidUser)
                toast.error(res.data.EM)
            }
            else {
                toast.success(res.data.EM)
                props.handleCloseModalCreate()
                props.fetchOrder()
            }
        }
    }
    return (

        <>
            <Modal
                show={props.isShowModalCreate}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            //onClick={props.handleCloseModalCreate}
            >
                <Modal.Header closeButton onClick={props.handleCloseModalCreate}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.action === 'Create' ? 'Create New Product' : "Edit Curent Product"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Thông tin đơn hàng: </label>
                            <input
                                className={validInput.infoOrder ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'infoOrder')}
                                value={userData.infoOrder}

                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Tổng tiền: </label>
                            <input className={validInput.totalMoney ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'totalMoney')}
                                value={userData.totalMoney}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone: </label>
                            <input className={validInput.phone ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'phone')}
                                value={userData.phone}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email: </label>
                            <input className={validInput.email ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'email')}
                                value={userData.email}
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label>Địa chỉ: </label>
                            <input className={validInput.address ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'address')}
                                value={userData.address}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleCloseModalCreate}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        handleValidateInput()
                        handleSave(userData)
                        //props.handleCloseModalCreate()

                    }}>
                        {props.action === 'Create' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalProduct