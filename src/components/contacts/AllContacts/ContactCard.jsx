import Image from "next/image";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl, token } from "@/constants/constants";

const ContactCard = ({ contact, refetch }) => {

    const { NAME, phone, id, profile_picture_url } = contact;

    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure? Want to delete this contact?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#114084",
            cancelButtonColor: "#CE0000",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // Delete the contact
                axios.delete(`${baseUrl}/contacts/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (response?.data?.message) {
                            
                            refetch(true);

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your contact has been deleted.",
                                icon: "success"
                            });
                        }
                    })

                    .catch((error) => {
                        console.error("Error deleting contact:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Error deleting contact.",
                            icon: "error"
                        });
                    });
            } else {
                Swal.fire({
                    title: "Cancelled!",
                    text: "Your contact is safe.",
                    icon: "info"
                });
            }
        });
    };

    return (
        <div className="border-primary border mb-2 rounded-md px-2 py-1 flex justify-between items-center">
            <Link href={`/contacts/${id}`} className="flex flex-1 gap-2 items-center">
                <div className="user border border-primary w-10 h-10 aspect-square rounded-full flex justify-center items-center">
                    {
                        profile_picture_url ? <Image src={profile_picture_url} width={40} height={40} alt={NAME} className="w-full h-full rounded-full object-cover" />
                            : <span className="text-primary text-2xl font-bold">{NAME[0]}</span>
                    }
                </div>

                <div className="details">
                    <div className="name font-bold text-primary">{NAME}</div>
                    <div className="number font-medium text-gray-700">{phone}</div>
                </div>
            </Link>

            <div className="buttons flex">
                <Link href={`/contacts/update/${id}`} className="hover:bg-primary text-primary hover:text-white p-1 rounded-md flex justify-center items-center">
                    <FaRegEdit />
                </Link>

                <button onClick={handleDelete} className="hover:bg-warning text-warning hover:text-white p-1 rounded-md flex justify-center items-center">
                    <AiOutlineDelete />
                </button>
            </div>
        </div>
    );
};

export default ContactCard;