'use server';

import Link from "next/link";

export const InsideLink = async ({title, idToJumpTo}:{title:string, idToJumpTo: string}) =>
{
    return(
        <Link href={idToJumpTo.startsWith('#') ? idToJumpTo : '#' + idToJumpTo} target={'_self'} rel={'noopener noreferrer'}>
        </Link>
    );
}