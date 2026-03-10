'use client';
import {useState} from "react";

export const Form = () =>
{
    const [name, setName] = useState<string|null>(null);
    const [email, setEmail] = useState<string|null>(null);
    const [subject, setSubject] = useState<string|null>(null);
    const [message, setMessage] = useState<string|null>(null);

    // const validateForm = (): boolean =>
    // {
    //
    // }

    return(
        <section className="bg-white rounded-2xl w-full">
            <form>

            </form>
        </section>
    );
}