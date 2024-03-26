"use client"
import { useState, useRef } from "react";
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

import { Editor } from '@tinymce/tinymce-react';

const NavCreate = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const modalRef = useRef(null)
    const editorRef = useRef(null);
    return (
        <>
            <button className="button-create text-black p-2 border rounded font-semibold border-none" onClick={handleOpen}>
                Create
            </button>
            <Dialog open={open} handler={handleOpen} placeholder="Create ticket" ref={modalRef} dismiss={{ enabled: false }}>
                <DialogHeader placeholder="Create ticket">Create a ticket</DialogHeader>
                <DialogBody placeholder="Create ticket">
                    <form>
                        <Typography variant="h4" color="blue-gray" placeholder={undefined}>
                            Enter ticket title
                        </Typography>
                        <Input name="title" placeholder="Enter ticket title" crossOrigin={undefined} />
                        <Typography variant="h4" color="blue-gray" placeholder={undefined}>
                            Assignee
                        </Typography>
                        <Select
                            placeholder="USA"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            menuProps={{ className: "h-48" }}
                        >
                            {["John", "Kane"].map((user, index) => (
                                <Option key={index} value={user}>
                                    <div className="flex items-center gap-x-2">
                                        {user}
                                    </div>
                                </Option>
                            ))}
                        </Select>
                        <Typography variant="h4" color="blue-gray" placeholder={undefined} className="mt-3">
                            Enter ticket description
                        </Typography>
                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINY_KEY}
                            // @ts-ignore
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue="<p>This is the initial content of the editor.</p>"
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
                        <Typography variant="h4" color="blue-gray" className="mt-3" placeholder={undefined}>
                            Story Points
                        </Typography>
                        <Input name="points" placeholder="Story Point" type="number" crossOrigin={undefined} />

                    </form>
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
                    <Button placeholder="Create ticket" variant="gradient" color="green" onClick={handleOpen}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export { NavCreate }