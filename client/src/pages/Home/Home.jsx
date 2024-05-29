import { MdAdd } from "react-icons/md"
import Note from "../../components/Note/Note"

export const Home = () => {
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

            <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'>
                <MdAdd className='text-[32px] text-white' />
            </button>
        </>
    )
}
