import { MdAdd } from "react-icons/md"
import Modal from "react-modal"
import Note from "../../components/Note/Note"
import AddEditNotes from "../../components/AddEditNotes/AddEditNotes"
import { useEffect, useState } from "react"
import axios from "axios"
import { message } from "antd"
import Empty from "../../components/Empty/Empty"

export const Home = () => {
    const [allNotes, setAllNotes] = useState([])
    const [openModal, setOpenModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    })

    const handleEdit = (noteDetails) => {
        setOpenModal({ isShown: true, type: "edit", data: noteDetails })
    }

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this image?"
        )

        if (isConfirmed) {
            try {
                const res = await axios.delete(
                    `${import.meta.env.VITE_SERVER_URL}/api/v1/notes/${id}`,
                    {
                        withCredentials: true,
                    }
                )

                if (res?.data?.success) {
                    message.success(res?.data?.message)
                    getAllNotes()
                }
            } catch (error) {
                message.error("something went wrong")
            }
        }
    }

    const handlePinNote = async (id, value) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/notes/${id}`,
                {
                    isPinned: !value,
                },
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                message.success(res?.data?.message)
                getAllNotes()
            }
        } catch (error) {
            message.error("something went wrong")
        }
    }

    const getAllNotes = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/notes`,
                {
                    withCredentials: true,
                }
            )

            if (res?.data?.success) {
                setAllNotes(res?.data?.payload?.notes)
            }
        } catch (error) {
            message.error("check your internet connection.")
        }
    }

    useEffect(() => {
        getAllNotes()
        return () => {}
    }, [])

    return (
        <>
            <div className='container mx-auto'>
                {allNotes.length > 0 ? (
                    <div className='grid grid-cols-3 gap-4 mt-8'>
                        {allNotes.map((note) => (
                            // eslint-disable-next-line react/jsx-key
                            <Note
                                key={note._id}
                                title={note.title}
                                date={note.createdAt}
                                content={note.content}
                                tags={note.tags}
                                isPinned={note.isPinned}
                                onEdit={() => handleEdit(note)}
                                onDelete={() => handleDelete(note._id)}
                                onPinNote={() =>
                                    handlePinNote(note._id, note.isPinned)
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <Empty
                        message={
                            "no notes to display. click + icon to add a new note"
                        }
                    />
                )}
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
                    data={openModal.data}
                    type={openModal.type}
                    getAllNotes={getAllNotes}
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
