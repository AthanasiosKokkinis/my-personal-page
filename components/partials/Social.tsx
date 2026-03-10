'use server';
import {ReactNode} from 'react';
import Link from "next/link";

export const Social = async ({title, link, iconSVG, extraClasses = ""}:{title:string, link:string, iconSVG: ReactNode, extraClasses?: string}) =>
{
    return(
        <Link href={link} target={"_blank"} rel={'noopener noreferrer'} className={`${extraClasses} flex flex-col items-center justify-center`}>
            {
                iconSVG
            }
            <span>{title}</span>
        </Link>
    );
}