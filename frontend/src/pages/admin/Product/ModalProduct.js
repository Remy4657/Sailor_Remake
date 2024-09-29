import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { fetchAllGroup, createNewUser, updateUser } from '../../services/userService';
import _ from 'lodash'
import { toast } from "react-toastify";

import { fetchAllProduct } from '../../../service/admin/productService';
import { createNewProduct } from '../../../service/admin/adminService';
import { updateProduct } from '../../../service/admin/adminService';

const ModalProduct = (props) => {
    const defaultUserData = {
        name: '',
        image: '',
        price: '',
        priceOld: '',
        status: '',
        categoryId: ''
    }
    const defaultValidUser = {
        name: true,
        image: true,
        price: true,
        priceOld: true,
        status: true,
        categoryId: true
    }
    const [userData, setUserData] = useState(defaultUserData)
    const [validInput, setValidInput] = useState(defaultValidUser)
    const [categoryList, setCategoryList] = useState([])
    const [categorySelected, setCategorySelected] = useState("")
    const fetchGroup = async () => {
        let response = await fetchAllProduct()
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
    const fetchCategory = async () => {
        const res = await props.fetchAllCategory()
        setCategoryList(res.data.DT)
    }
    useEffect(() => {
        fetchGroup()
        fetchCategory()

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

    const onSelectCategory = (e) => {
        setCategorySelected(e.target.value)
    }

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
        let properties = ['name', 'image', 'price', 'priceOld', 'status', 'categoryId']
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
        userData["categoryId"] ? userData["categoryId"] = userData["categoryId"] : userData["categoryId"] = 1
        alert(userData["categoryId"])

        let check = handleValidateInput()
        if (check === true) {

            //     // them thuoc tinh group id bang group de them groupID trong database
            let res = props.action === 'Create' ? await createNewProduct({ ...userData })
                : await updateProduct({ ...userData })
            if (res.data.EC === 0) {
                let _defaultValidUser = _.cloneDeep(userData)
                _defaultValidUser[res.data.DT] = false
                setValidInput(_defaultValidUser)
                toast.error(res.data.EM)
            }
            else {
                toast.success(res.data.EM)
                props.handleCloseModalCreate()
                props.fetchProducts()
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
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Name: </label>
                            <input
                                className={validInput.name ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'name')}
                                value={userData.name}

                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Image: </label>
                            <input className={validInput.image ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'image')}
                                value={userData.image}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Price: </label>
                            <input className={validInput.price ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'price')}
                                value={userData.price}
                            />
                        </div>
                        {props.action === 'Create' ? <div className='col-12 col-sm-6 form-group'>
                            <label>Price Old: </label>
                            <input className={validInput.priceOld ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'priceOld')}
                                value={userData.priceOld}
                            />
                        </div> : <div></div>}

                        <div className='col-12 col-sm-12 form-group'>
                            <label>Status: </label>
                            <input className={validInput.status ? 'form-control' : 'form-control is-invalid'}
                                type="text"
                                onChange={(e) => handleChangeInput(e.target.value, 'status')}
                                value={userData.status}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Category: </label>
                            <select onChange={(e) => handleChangeInput(e.target.value ? e.target.value : 1, 'categoryId')} aria-label="Default select example" className="form-select w-15">
                                {categoryList && categoryList.length > 0 ?
                                    categoryList.map(item =>
                                        <option
                                            selected={+userData["categoryId"] === item.id ? "selected" : ""}
                                            value={item.id}>{item.name}</option>
                                    )
                                    :
                                    <div></div>
                                }
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
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