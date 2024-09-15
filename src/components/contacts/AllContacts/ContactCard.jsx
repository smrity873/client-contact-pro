import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

const ContactCard = ({ contact }) => {

    const { NAME, phone, id, profile_picture_url } = contact;

    const handleDelete = () => {
        console.log("Delete contact with id:", id);
    };

    return (
        <div className="border-primary border mb-2 rounded-md px-4 py-1 flex justify-between items-center">
            <Link href={`/contacts/${id}`} className="flex gap-4 items-center">
                <div className="user border border-primary w-10 h-10 aspect-square rounded-full flex justify-center items-center">
                    {
                        profile_picture_url ? <Image src={profile_picture_url} alt={NAME} className="w-full h-full rounded-full object-cover" />
                            : <span className="text-primary text-2xl font-bold">{NAME[0]}</span>
                    }

                </div>

                <div className="details">
                    <div className="name font-bold text-primary">{NAME}</div>
                    <div className="number font-medium text-gray-700">{phone}</div>
                </div>
            </Link>

            <div className="buttons flex">
                <Link href={`/contacts/update/${id}`} className="hover:bg-primary text-primary hover:text-white p-2 rounded-md flex justify-center items-center">
                    <FaRegEdit />
                </Link>

                <button onClick={handleDelete} className="hover:bg-warning text-warning hover:text-white p-2 rounded-md flex justify-center items-center">
                    <AiOutlineDelete />
                </button>
            </div>
        </div>
    );
};

export default ContactCard;