import { MdAdd } from "react-icons/md"
import Modal from "react-modal"
import Note from "../../components/Note/Note"
import AddEditNotes from "../../components/AddEditNotes/AddEditNotes"
import { useState } from "react"

export const Home = () => {
    const [openModal, setOpenModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    })
    return (
        <>
            <div className='container mx-auto'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    <Note
                        title='meeting on 7th june'
                        date='29th may, 2024'
                        content='Et et gubergren erat no amet justo ipsum et dolore, dolores et dolore eirmod voluptua magna. Gubergren duo voluptua gubergren diam diam eos consetetur erat, erat ea aliquyam lorem vero, et et no et dolor no et sed. Invidunt dolor aliquyam amet invidunt eirmod takimata sit. Dolor sea sed eos diam voluptua. Eirmod dolores dolor tempor sadipscing. Vero voluptua elitr nonumy at. Diam est dolores accusam invidunt, sit dolor takimata.'
                        tags='#Meeting'
                        isPinned={true}
                        onEdit={() => {}}
                        onDelete={() => {}}
                        onPinNote={() => {}}
                    />
                </div>
            </div>

            <button
                className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
                onClick={() => {
                    setOpenModal({ isShown: true, type: "add", data: null })
                }}
            >
                <MdAdd className='text-[32px] text-white' />
            </button>

            <Modal
                isOpen={openModal.isShown}
                onRequestClose={() => {}}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel=''
                className='w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll'
            >
                <AddEditNotes
                    onClose={() => {
                        setOpenModal({
                            isShown: false,
                            type: "add",
                            data: null,
                        })
                    }}
                />
            </Modal>
        </>
    )
}
