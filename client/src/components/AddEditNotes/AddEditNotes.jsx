import { useState } from "react"
import Tag from "../Tag/Tag"
import { MdClose } from "react-icons/md"

const AddEditNotes = ({ data, type, onClose }) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [tags, setTags] = useState([])
    const [error, setError] = useState(null)

    const handleAddNewNote = async () => {}
    const handleEditNote = async () => {}

    const removeError = () => {
        setTimeout(() => {
            setError("")
        }, 1000)
    }

    const handleAddNote = () => {
        if (!title && !content) {
            setError("please enter all the fields.")
            removeError()
            return
        }

        if (!title) {
            setError("please enter title.")
            removeError()
            return
        }
        if (!content) {
            setError("please enter content.")
            removeError()
            return
        }

        if (type === "add") {
            handleAddNewNote()
        } else {
            handleEditNote()
        }
    }

    return (
        <div className='relative'>
            <button
                className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
                onClick={onClose}
            >
                <MdClose className='text-xl text-slate-400' />
            </button>
            <div className='flex flex-col gap-2'>
                <label className='input-label'>TITLE</label>
                <input
                    type='text'
                    className='text-2xl text-slate-950 outline-none'
                    placeholder='go to gym at 5'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='flex flex-col gap-2 mt-4'>
                <label className='input-label'>CONTENT</label>
                <textarea
                    type='text'
                    placeholder='Content'
                    rows={10}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className='text-slate-950 text-sm outline-none bg-slate-50 p-2 rounded'
                />
            </div>

            <div className='mt-3'>
                <label className='input-label'>TAGS</label>
                <Tag tags={tags} setTags={setTags} />
            </div>

            {error ? (
                <p className='text-red-500 text-xs pt-4'>{error}</p>
            ) : null}

            <button
                className='btn-primary font-medium mt-5 p-3'
                onClick={() => handleAddNote}
            >
                ADD
            </button>
        </div>
    )
}

export default AddEditNotes
