import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

const UpdateUserDialog = ({ user }) => {
    const {_id}= user
    // for refress page
    const router = useRouter();

    // Update handeler : 
    const handleUpdateUser = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedUser = Object.fromEntries(formData.entries());

        console.log('updated user', updatedUser)

        // send data to backend
        const res = await fetch(`http://localhost:5000/users/${_id}`,{
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updatedUser)
        })
        const result = await res.json();
        console.log('result from server', result)
        if(result.modifiedCount>0){
            alert('User update Successfully')
            router.refresh();
        }

    }

    return (
        <div>
            {/* from shadcn "dialog form"*/}
            <Dialog>

                <DialogTrigger render={<Button className="mx-2" variant="outline">Edit</Button>} />
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={handleUpdateUser}>
                        <DialogHeader>
                            <DialogTitle>Edit profile</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Name</Label>
                                <Input id="name-1" name="name" defaultValue={user.name} />
                            </Field>
                            <Field>
                                <Label htmlFor="email-1">User Email</Label>
                                <Input id="email-1" name="email" defaultValue={user.email} />
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose render={<Button variant="outline">Cancel</Button>} />
                            <DialogClose render={<Button type="submit">Save changes</Button>} />
                            
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>

        </div>
    );
};

export default UpdateUserDialog;