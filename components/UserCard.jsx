'use client'

// shadcn card:
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UpdateUserDialog from '../components/updateUserDialog'

const UserCard = ({user}) => {
    const {_id}= user
    // todo: use router , for refress the page:
    const router = useRouter()

    // DELETE handle: 
    const handleDeleteUser = async()=>{
        console.log('delete user', _id)
        const res =  await fetch (`http://localhost:5000/users/${_id}`,{
            method: "DELETE"
        });
        const afterDelete = await res.json()
        console.log('after delete', afterDelete)
        if(afterDelete.deletedCount >0){
            alert('User delete Successfully')
        }
        router.refresh()

    }
    return (
        <div>

            <Card className="relative mx-auto w-full max-w-sm pt-0">
               
               
                <CardHeader>
                    <CardAction>
                        <h2>NO Action</h2>
                    </CardAction>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>
                       Email:  {user.email}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                   <Link href={`users/${user._id}`}>
                    <Button className="w-full">View details</Button>
                   </Link>
                   <UpdateUserDialog user={user}></UpdateUserDialog>
                   <Button 
                   onClick={()=> handleDeleteUser(_id)}
                   variant='destructive'>Delete</Button>
                </CardFooter>
            </Card>

        </div>
    );
};

export default UserCard;