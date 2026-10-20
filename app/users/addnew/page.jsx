'use client'
// from shadcn input :
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { redirect } from "next/navigation";



const NewUserPage = () => {

    // on submitHandle 
    const handleAddNewUser = async(e) =>{
        e.preventDefault();
        // convert form data to plain object
        const formData = new FormData(e.target);
        const newUser = Object.fromEntries(formData.entries());
        console.log('form er data', newUser)

        // Todo: send data backend:
        const res = await fetch('http://localhost:5000/users',{
            method: 'post',
            headers:{
                'Content-Type':'Application/json'
            },
            body: JSON.stringify(newUser)
        })
        console.log('response from server', res)
        
        //for Confirm data added 
        const afterSubmit = await res.json();
        console.log('after submit', afterSubmit)

        if(afterSubmit.insertedId){
            console.log('User Added Successfully');
            redirect('/users')

        }
        

    }
    
    return (
        <div>
            {/* from shadcn.com */}

            <form onSubmit={handleAddNewUser}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
                        <Input id="fieldgroup-name" name= 'name' placeholder="Jordan Lee" />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
                        <Input
                            id="fieldgroup-email"
                            type="email"
                            name= "email"
                            placeholder="name@example.com"
                        />
                        <FieldDescription>
                            We&apos;ll send updates to this address.
                        </FieldDescription>
                    </Field>
                    <Field orientation="horizontal">
                        <Button type="reset" variant="outline">
                            Reset
                        </Button>
                        <Button type="submit">Add User</Button>
                    </Field>
                </FieldGroup>
            </form>

        </div>
    );
};

export default NewUserPage;