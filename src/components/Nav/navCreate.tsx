/* istanbul ignore file */
"use client"
import { useState, useRef, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { usePathname } from "next/navigation";
import { useSession } from 'next-auth/react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Select,
    Option
} from "@material-tailwind/react";
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import * as z from 'zod';
import { getUsers } from "@/app/actions/users";
import { User } from "@prisma/client";
import { createTicket } from "@/app/actions/board";

interface CreateTicketFields {
    title: string,
    assignee: string,
    description: string,
    points: number
}

const schema = z.object({
    title: z.string().min(5),
    assignee: z.string(),
    description: z.string().optional(),
    points: z.number().optional(),
});

const NavCreate = ({ isTest }: { isTest: boolean }) => {
    const [open, setOpen] = useState(false);
    const [users, setUsers] = useState<User[]>([])
    const handleOpen = () => setOpen(!open);
    const modalRef = useRef(null)
    const editorRef = useRef(null);
    const path = usePathname()
    const { data: session } = useSession()
    const boardId = path?.split('/')[2]
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<CreateTicketFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            points: 0
        }
    })
    {/* istanbul ignore next */ }
    const onSubmit: SubmitHandler<CreateTicketFields> = async (data) => {
        /* istanbul ignore next */
        await createTicket({ title: data.title, description: data.description, boardId, storyPoints: data.points, assignedTo: data.assignee, reportedBy: session?.user.id || '' })
        setOpen(false)
    }

    useEffect(() => {
        /* istanbul ignore next */
        const fetchUsers = async () => {
            const usersRes = await getUsers()
            console.log(usersRes)
            setUsers(usersRes)
        }
        if (!isTest) fetchUsers()
    }, [isTest])
    return (
        <>
            <button className="button-create text-black p-2 border rounded font-semibold border-none" onClick={handleOpen}>
                Create
            </button>
            <Dialog open={open} handler={handleOpen} placeholder="Create ticket" ref={modalRef} dismiss={{ enabled: false }}>
                <DialogHeader placeholder="Create ticket">Create a ticket</DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogBody placeholder="Create ticket">
                        <Typography variant="h4" color="blue-gray" placeholder={undefined}>
                            Enter ticket title
                        </Typography>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <Input placeholder="Enter ticket title" crossOrigin={undefined} {...field} />
                            )} />
                        <Typography variant="h6" placeholder={undefined} className="mt-3 text-red-600">
                            {errors.title?.message}
                        </Typography>
                        <Typography variant="h4" color="blue-gray" placeholder={undefined}>
                            Assignee
                        </Typography>
                        <Controller
                            name="assignee"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    placeholder="USA"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    menuProps={{ className: "h-48" }}
                                    {...field}
                                >

                                    {users.map((user, index) => (
                                        <Option key={index} value={user.id}>
                                            <div className="flex items-center gap-x-2">
                                                {user.name}
                                            </div>
                                        </Option>
                                    ))}
                                </Select>
                            )} />
                        <Typography variant="h6" placeholder={undefined} className="mt-3 text-red-600">
                            {errors.assignee?.message}
                        </Typography>
                        <Typography variant="h4" color="blue-gray" placeholder={undefined} className="mt-3">
                            Enter ticket description
                        </Typography>
                        <input
                            id="description"
                            name="description"
                            style={{ display: "none" }}
                        />
                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINY_KEY}
                            // @ts-ignore
                            onInit={(evt, editor) => editorRef.current = editor}
                            onEditorChange={(newValue, editor) =>
                                setValue("description", newValue)
                            }
                            initialValue=""
                            init={{
                                height: 400,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "codesample",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar: "undo redo | styles | bold italic underline strikethrough codesample | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        <Typography variant="h6" placeholder={undefined} className="mt-3 text-red-600">
                            {errors.description?.message}
                        </Typography>
                        <Typography variant="h4" color="blue-gray" className="mt-3" placeholder={undefined}>
                            Story Points
                        </Typography>
                        <Input placeholder="Story Point" crossOrigin={undefined} type="number" {...register('points', { valueAsNumber: true })} />
                        <Typography variant="h6" placeholder={undefined} className="mt-3 text-red-600">
                            {errors.points?.message}
                        </Typography>
                    </DialogBody>
                    <DialogFooter placeholder="Create ticket">
                        <Button
                            placeholder="Create ticket"
                            variant="text"
                            color="red"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button type="submit" placeholder="Create ticket" variant="gradient" color="green">
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    )
}

export { NavCreate }