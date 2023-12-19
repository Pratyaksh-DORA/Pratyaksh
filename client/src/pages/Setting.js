import React, { useState } from 'react';
import Modal from 'react-modal';
import { fetchData, postData } from '../utilis/Api';

const Setting = () => {
    const [modalIsOpenSetting, setModalIsOpenSetting] = useState(false);

    const openModalSetting = () => {
        setModalIsOpenSetting(true);
    };

    const closeModalSetting = () => {
        setModalIsOpenSetting(false);
    };

    return (
        <div>
            <button onClick={openModalSetting}>Open Modal</button>
            <Modal
                isOpen={modalIsOpenSetting}
                onRequestClose={closeModalSetting}
                contentLabel="Hello World Modal"
            >
                <h2>Hello World</h2>
                <button onClick={closeModalSetting}>Close Modal</button>
            </Modal>
        </div>
    );
};

export default Setting;
